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

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const dispatch = useDispatch();
    const isConnectedToMobile = useSelector((state) => state.webSocket.isConnectedToMobile);



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

        // Add event listeners
        if (window.electronAPI) {
            window.electronAPI.onDonnaMobileConnectRequest(handleMobileConnectRequestEvent);
            window.electronAPI.onDonnaMobileDisconnect(handleMobileDisconnectEvent);
        }

        // Cleanup function to remove listeners
        return () => {
            if (window.electronAPI) {
                window.electronAPI.removeAllListeners('donna-mobile-connect-request');
                window.electronAPI.removeAllListeners('donna-mobile-disconnect');
            }
        };
    }, [dispatch]);

    // Monitor isConnectedToMobile value changes
    useEffect(() => {
        console.log('[MainPage] isConnectedToMobile value changed:', isConnectedToMobile);
        if (isConnectedToMobile) {
            connectToServer();
        }
    }, [isConnectedToMobile]);

    
    return (
        <div className="flex flex-col h-screen" style={{ backgroundColor: '#000000' }}>
            <Titlebar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <MainContent activeTab={activeTab} />
            </div>
        </div>
    );
};

export default MainPage;