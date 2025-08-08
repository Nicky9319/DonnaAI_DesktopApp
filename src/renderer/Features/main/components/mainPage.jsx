import React, { useState } from 'react';
import Titlebar from '../../common/components/Titlebar/Titlebar';
import Sidebar from '../../common/components/Sidebar/Sidebar';
import HomePage from '../../home/components/HomePage';
import ActiveTasksPage from '../../tasks/components/ActiveTasksPage';
import ComingSoonPage from '../../settings/components/ComingSoonPage';

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