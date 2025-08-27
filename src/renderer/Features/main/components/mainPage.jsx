import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleMobileConnectRequest, handleMobileDisconnect } from '../../../store/slices/webSocketSlice';
import Titlebar from '../../common/components/Titlebar/Titlebar';
import Sidebar from '../../common/components/Sidebar/Sidebar';
import HomePage from '../../home/components/HomePage';
import ActiveTasksPage from '../../tasks/components/ActiveTasksPage';
import ComingSoonPage from '../../settings/components/ComingSoonPage';
import WebSocketManager from '../../../services/WebSocketManager';

// MainContent Component
const MainContent = ({ activeTab }) => (
    <div className="flex-1 overflow-auto h-full" style={{ backgroundColor: '#000000' }}>
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'activeTasks' && <ActiveTasksPage />}
        {activeTab === 'settings' && <ComingSoonPage />}
    </div>
);

function connectToServer(){
    WebSocketManager.connect();
}

// Function to handle messages from Donna Mobile
const handleMsgFromDonnaMobile = (data) => {
    console.log('[MainPage] Message from Donna Mobile received:', data);
    
    // Handle the message data here
    // You can add your custom logic to process the message
    // For example:
    // - Display notification
    // - Update UI state
    // - Forward to widget window
    // - Store in database
    
    try {
        // Example: Parse the message data
        const messageData = typeof data === 'string' ? JSON.parse(data) : data;
        
        console.log('[MainPage] Parsed message data:', messageData);
        sendEventToWidget('msgFromDonnaMobile', messageData);
        
        
        // You can also emit this to the widget window if needed
        // window.electronAPI.sendToWidget('msgFromDonnaMobile', messageData);
        
    } catch (error) {
        console.error('[MainPage] Error processing message from Donna Mobile:', error);
        console.log('[MainPage] Raw message data:', data);
    }
};

// Generic Event Router for handling events from Widget
const useEventRouter = () => {
    console.log('[MainPage] useEventRouter');
    const dispatch = useDispatch();

    // Event handlers for different event types
    const eventHandlers = {
        // Handle chat messages from widget
        'msgForDonnaMobile': (payload) => {
            console.log('[MainPage] msgForDonnaMobile received:', payload);
        }
    };

    // Generic event handler that routes to specific handlers
    const handleEventFromWidget = (eventData) => {
        const { eventName, payload } = eventData;
        console.log('[MainPage] Event from widget received:', { eventName, payload });

        // Route to specific handler based on event name
        const handler = eventHandlers[eventName] || eventHandlers.default;
        handler(payload);
    };

    return { handleEventFromWidget };
};

// Function to send events to widget
const sendEventToWidget = async (eventName, payload) => {
    try {
        if (window.electronAPI && window.electronAPI.sendToWidget) {
            const result = await window.electronAPI.sendToWidget(eventName, payload);
            console.log('[MainPage] Event sent to widget:', { eventName, payload, result });
            return result;
        } else {
            console.warn('[MainPage] sendToWidget method not available');
            return { success: false, error: 'sendToWidget method not available' };
        }
    } catch (error) {
        console.error('[MainPage] Error sending event to widget:', error);
        return { success: false, error: error.message };
    }
};

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const dispatch = useDispatch();
    const isConnectedToMobile = useSelector((state) => state.webSocket.isConnectedToMobile);
    const { handleEventFromWidget } = useEventRouter();

    useEffect(() => {
        // WebSocketManager.connect();
        
        // Set up MQTT event listeners
        const handleMobileConnectRequestEvent = (event, data) => {
            console.log('[MQTT] Mobile connect request received:', data);
            dispatch(handleMobileConnectRequest(data));
        };

        const handleMobileDisconnectEvent = (event, data) => {
            console.log('[MQTT] Mobile disconnect received:', data);
            dispatch(handleMobileDisconnect(data));
        };

        // Set up IPC event listener for events from widget
        const handleEventFromWidgetIPC = (event, eventData) => {
            console.log(eventData)
            handleEventFromWidget(eventData);
        };

        // Add event listeners
        if (window.electronAPI) {
            window.electronAPI.onDonnaMobileConnectRequest(handleMobileConnectRequestEvent);
            window.electronAPI.onDonnaMobileDisconnect(handleMobileDisconnectEvent);
            window.electronAPI.onEventFromWidget(handleEventFromWidgetIPC);
        }

        // Cleanup function to remove listeners
        return () => {
            if (window.electronAPI) {
                window.electronAPI.removeAllListeners('donna-mobile-connect-request');
                window.electronAPI.removeAllListeners('donna-mobile-disconnect');
                window.electronAPI.removeAllListeners('eventFromWidget');
            }
        };
    }, [dispatch, handleEventFromWidget]);

    // Monitor isConnectedToMobile value changes
    useEffect(() => {
        console.log('[MainPage] isConnectedToMobile value changed:', isConnectedToMobile);
        if (isConnectedToMobile) {
            connectToServer();
            
            // Set up WebSocket event listener for msgFromDonnaMobile
            WebSocketManager.on('msgFromDonnaMobile', handleMsgFromDonnaMobile);
            
            console.log('[MainPage] WebSocket event listener for msgFromDonnaMobile set up');
        }

        // Cleanup function to remove WebSocket event listener
        return () => {
            if (isConnectedToMobile) {
                WebSocketManager.off('msgFromDonnaMobile', handleMsgFromDonnaMobile);
                console.log('[MainPage] WebSocket event listener for msgFromDonnaMobile removed');
            }
        };
    }, [isConnectedToMobile]);

    // Test function to demonstrate sending events to widget
    const testSendEventToWidget = async () => {
        const testPayload = {
            message: "Hello from Main Window!",
            timestamp: new Date().toISOString(),
            type: "test"
        };
        
        const result = await sendEventToWidget('testEvent', testPayload);
        console.log('[MainPage] Test event result:', result);
    };

    return (
        <div className="flex flex-col h-screen" style={{ backgroundColor: '#000000' }}>
            <Titlebar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <MainContent activeTab={activeTab} />
            </div>
            
            {/* Test button for IPC pipeline */}
            <div style={{
                position: 'fixed',
                bottom: '10px',
                right: '10px',
                zIndex: 9999,
                backgroundColor: '#333',
                padding: '10px',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px'
            }}>
                <button 
                    onClick={testSendEventToWidget}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Test IPC to Widget
                </button>
            </div>
        </div>
    );
};

export default MainPage;