import React, { useState } from 'react';

const ProfilePage = () => {
    // Dummy user data
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Administrator',
        apiKey: 'sk-****************************************',
        theme: 'dark',
        notifications: true
    });

    // Function to handle profile update (placeholder)
    const handleUpdateProfile = () => {
        alert('Profile update functionality will be implemented here');
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#F9FAFB' }}>Profile</h2>
            
            <div className="rounded-lg shadow-lg p-6 mb-6" style={{ backgroundColor: '#1D1F24' }}>
                <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#252830' }}>
                        <span className="text-2xl font-bold" style={{ color: '#F9FAFB' }}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold" style={{ color: '#F9FAFB' }}>{user.name}</h3>
                        <p style={{ color: '#9CA3AF' }}>{user.email}</p>
                        <span 
                            className="px-2 py-1 rounded-full text-xs font-medium inline-block mt-2"
                            style={{ backgroundColor: '#6366F1', color: '#F9FAFB' }}
                        >
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: '#1D1F24' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#F9FAFB' }}>Settings</h3>
                
                <div className="mb-4">
                    <label className="block mb-2" style={{ color: '#9CA3AF' }}>API Key</label>
                    <div className="flex">
                        <input 
                            type="password" 
                            value={user.apiKey}
                            readOnly
                            className="flex-1 px-3 py-2 rounded-l outline-none"
                            style={{ backgroundColor: '#252830', color: '#F9FAFB', border: '1px solid #2A2D35' }}
                        />
                        <button 
                            className="px-3 py-2 rounded-r"
                            style={{ backgroundColor: '#0EA5E9', color: '#F9FAFB' }}
                        >
                            Show
                        </button>
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block mb-2" style={{ color: '#9CA3AF' }}>Theme</label>
                    <select 
                        className="w-full px-3 py-2 rounded outline-none"
                        style={{ backgroundColor: '#252830', color: '#F9FAFB', border: '1px solid #2A2D35' }}
                        value={user.theme}
                        onChange={(e) => setUser({...user, theme: e.target.value})}
                    >
                        <option value="dark">Dark Theme</option>
                        <option value="light">Light Theme</option>
                    </select>
                </div>
                
                <div className="mb-6 flex items-center">
                    <input 
                        type="checkbox" 
                        id="notifications" 
                        checked={user.notifications}
                        onChange={(e) => setUser({...user, notifications: e.target.checked})}
                        className="mr-2"
                    />
                    <label htmlFor="notifications" style={{ color: '#F9FAFB' }}>
                        Enable Notifications
                    </label>
                </div>
                
                <button 
                    className="px-4 py-2 rounded-md font-medium"
                    style={{ backgroundColor: '#6366F1', color: '#F9FAFB' }}
                    onClick={handleUpdateProfile}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
