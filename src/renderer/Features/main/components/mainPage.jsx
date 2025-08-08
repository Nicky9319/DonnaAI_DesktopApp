import React, { useState } from 'react';
import Sidebar from '../../common/components/Sidebar/Sidebar';
import HomePage from '../../home/components/HomePage';
import ActiveTasksPage from '../../tasks/components/ActiveTasksPage';
import TaskThreadPage from '../../chat/components/TaskThreadPage';

// MainContent Component
const MainContent = ({ activeTab }) => (
    <div className="flex-1 p-10 overflow-auto" style={{ backgroundColor: '#0D1B2A' }}>
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'activeTasks' && <ActiveTasksPage />}
        {activeTab === 'taskThread' && <TaskThreadPage />}
    </div>
);

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    
    return (
        <div className="flex h-screen" style={{ backgroundColor: '#0D1B2A' }}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <MainContent activeTab={activeTab} />
        </div>
    );
};

export default MainPage;