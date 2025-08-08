import React from 'react';
import EnvVarsEditor from '../../settings/components/EnvVarsEditor';

const HomePage = () => {
    const defaultEnvVars = {
        OPENAI_API_KEY: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ANTHROPIC_API_KEY: 'sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        GOOGLE_API_KEY: 'AIza-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    };

    const handleSaveEnvVars = (variables) => {
        console.log('Saving environment variables:', variables);
        // TODO: Implement actual save functionality
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h1 
                    className="text-4xl font-bold leading-tight"
                    style={{ color: '#FFFFFF' }}
                >
                    Got a task? Don't worry,{' '}
                    <span style={{ color: '#00D09C' }}>Donna</span>{' '}
                    got your back!!
                </h1>
                <p 
                    className="text-lg max-w-2xl mx-auto"
                    style={{ color: '#E0E0E0' }}
                >
                    Your intelligent assistant is ready to help you with any task. 
                    Configure your environment variables below to get started.
                </p>
            </div>

            {/* Environment Variables Section */}
            <div className="max-w-2xl">
                <EnvVarsEditor 
                    variables={defaultEnvVars}
                    onSave={handleSaveEnvVars}
                />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <div 
                    className="p-6 rounded-xl border"
                    style={{ 
                        backgroundColor: '#0D1B2A',
                        borderColor: '#3A86FF/20'
                    }}
                >
                    <div className="text-2xl font-bold mb-2" style={{ color: '#00D09C' }}>5</div>
                    <div className="text-sm" style={{ color: '#E0E0E0' }}>Active Tasks</div>
                </div>
                <div 
                    className="p-6 rounded-xl border"
                    style={{ 
                        backgroundColor: '#0D1B2A',
                        borderColor: '#3A86FF/20'
                    }}
                >
                    <div className="text-2xl font-bold mb-2" style={{ color: '#3A86FF' }}>12</div>
                    <div className="text-sm" style={{ color: '#E0E0E0' }}>Completed Today</div>
                </div>
                <div 
                    className="p-6 rounded-xl border"
                    style={{ 
                        backgroundColor: '#0D1B2A',
                        borderColor: '#3A86FF/20'
                    }}
                >
                    <div className="text-2xl font-bold mb-2" style={{ color: '#FDCB6E' }}>98%</div>
                    <div className="text-sm" style={{ color: '#E0E0E0' }}>Success Rate</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
