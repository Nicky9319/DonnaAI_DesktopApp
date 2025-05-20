import React, { useState } from 'react';

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('agents'); // Default to agents tab
    
    return (
        <div className="flex h-screen" style={{ backgroundColor: '#121317' }}>
            {/* Sidebar */}
            <div className="w-64 h-screen shadow-lg" style={{ backgroundColor: '#1D1F24' }}>
                <div className="p-6 border-b" style={{ borderColor: '#2A2D35' }}>
                    <h1 className="text-2xl font-bold" style={{ color: '#F9FAFB' }}>AgentBed</h1>
                </div>
                <nav className="mt-6">
                    <div 
                        className={`px-6 py-4 cursor-pointer transition-colors flex items-center ${activeTab === 'agents' ? 'border-l-4' : ''}`}
                        onClick={() => setActiveTab('agents')}
                        style={{ 
                            color: '#F9FAFB',
                            backgroundColor: activeTab === 'agents' ? '#252830' : 'transparent',
                            borderColor: activeTab === 'agents' ? '#6366F1' : 'transparent',
                            hover: { backgroundColor: '#252830' }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Manage Agents
                    </div>
                    <div 
                        className={`px-6 py-4 cursor-pointer transition-colors flex items-center ${activeTab === 'profile' ? 'border-l-4' : ''}`}
                        onClick={() => setActiveTab('profile')}
                        style={{ 
                            color: '#F9FAFB',
                            backgroundColor: activeTab === 'profile' ? '#252830' : 'transparent',
                            borderColor: activeTab === 'profile' ? '#6366F1' : 'transparent',
                            hover: { backgroundColor: '#252830' }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                    </div>
                </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                {activeTab === 'agents' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6" style={{ color: '#F9FAFB' }}>Manage Agents</h2>
                        <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1D1F24' }}>
                            <p style={{ color: '#9CA3AF' }}>This is where you can manage your agents.</p>
                            <p className="mt-4" style={{ color: '#9CA3AF' }}>You can add, edit, and delete agents from this panel.</p>
                            <button 
                                className="mt-6 px-4 py-2 rounded-md font-medium"
                                style={{ backgroundColor: '#6366F1', color: '#F9FAFB' }}
                            >
                                Add New Agent
                            </button>
                        </div>
                    </div>
                )}
                
                {activeTab === 'profile' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6" style={{ color: '#F9FAFB' }}>Profile</h2>
                        <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1D1F24' }}>
                            <p style={{ color: '#9CA3AF' }}>This is where you can view and edit your profile.</p>
                            <p className="mt-4" style={{ color: '#9CA3AF' }}>Update your personal information and settings here.</p>
                            <button 
                                className="mt-6 px-4 py-2 rounded-md font-medium"
                                style={{ backgroundColor: '#0EA5E9', color: '#F9FAFB' }}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;