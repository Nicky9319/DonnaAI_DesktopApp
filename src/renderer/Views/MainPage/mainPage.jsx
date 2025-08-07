import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar/Sidebar';
import HomePage from '../../features/home/HomePage';
import ActiveTasksPage from '../../features/tasks/ActiveTasksPage';
import TaskThreadPage from '../../features/chat/TaskThreadPage';

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