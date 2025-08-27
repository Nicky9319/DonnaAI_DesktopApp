import React, { useState, useEffect  } from 'react';
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

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        // WebSocketManager.connect();
        
        // Set up MQTT event listeners
        const handleMobileConnectRequest = (event, data) => {
            console.log('[MQTT] Mobile connect request received:', data);
            // TODO: Handle mobile connection request
        };

        const handleMobileDisconnect = (event, data) => {
            console.log('[MQTT] Mobile disconnect received:', data);
            // TODO: Handle mobile disconnection
        };

        // Add event listeners
        if (window.electronAPI) {
            window.electronAPI.onDonnaMobileConnectRequest(handleMobileConnectRequest);
            window.electronAPI.onDonnaMobileDisconnect(handleMobileDisconnect);
        }

        // Cleanup function to remove listeners
        return () => {
            if (window.electronAPI) {
                window.electronAPI.removeAllListeners('donna-mobile-connect-request');
                window.electronAPI.removeAllListeners('donna-mobile-disconnect');
            }
        };
    }, []);
    
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