import React from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ activeTab, setActiveTab }) => (
    <div className="w-20 h-screen shadow-lg flex flex-col items-center py-4" style={{ backgroundColor: '#0D1B2A' }}>
        <div className="mb-8">
            <div className="w-10 h-10 rounded-full bg-[#3A86FF] flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
            </div>
        </div>
        
        <SidebarItem
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
            }
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
        />
        
        <SidebarItem
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-4z" />
                </svg>
            }
            label="Active Tasks"
            isActive={activeTab === 'activeTasks'}
            onClick={() => setActiveTab('activeTasks')}
        />
        
        <SidebarItem
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4h-4m0 0V4m0 0v4" />
                </svg>
            }
            label="Task Thread"
            isActive={activeTab === 'taskThread'}
            onClick={() => setActiveTab('taskThread')}
        />
    </div>
);

export default Sidebar;
