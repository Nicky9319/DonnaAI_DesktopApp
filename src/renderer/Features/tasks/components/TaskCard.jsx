import React from 'react';

const TaskCard = ({ query, status, onAction, isClickable }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'active':
                return {
                    color: '#00D09C',
                    label: 'Active',
                    bgColor: 'rgba(0, 208, 156, 0.15)',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )
                };
            case 'halted':
                return {
                    color: '#FF9500',
                    label: 'Halted',
                    bgColor: 'rgba(255, 149, 0, 0.15)',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
            case 'userStopped':
                return {
                    color: '#FF3B30',
                    label: 'Stopped',
                    bgColor: 'rgba(255, 59, 48, 0.15)',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
                        </svg>
                    )
                };
            default:
                return {
                    color: '#8E8E93',
                    label: 'Unknown',
                    bgColor: 'rgba(142, 142, 147, 0.15)',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
        }
    };

    const statusConfig = getStatusConfig(status);

    return (
        <div 
            className={`rounded-2xl p-5 border transition-all duration-150 group ${isClickable ? 'hover:border-opacity-80' : ''}`}
            style={{ 
                backgroundColor: '#1C1C1E',
                borderColor: '#2D2D2F'
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                    <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center mt-1 flex-shrink-0"
                        style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color }}
                    >
                        {statusConfig.icon}
                    </div>
                    <div className="flex flex-col">
                        <span 
                            className="text-sm font-semibold block"
                            style={{ color: statusConfig.color }}
                        >
                            {statusConfig.label}
                        </span>
                        <span 
                            className="text-xs font-light"
                            style={{ color: '#8E8E93' }}
                        >
                            Task Status
                        </span>
                        <p 
                            className="text-sm leading-relaxed mt-2"
                            style={{ color: '#E5E5E7' }}
                        >
                            {query}
                        </p>
                    </div>
                </div>
                {onAction && (
                    <button
                        onClick={(e) => {
                            if (isClickable) e.stopPropagation();
                            onAction(status);
                        }}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center space-x-2 flex-shrink-0"
                        style={{ 
                            backgroundColor: status === 'active' ? 'rgba(255, 59, 48, 0.8)' : 'rgba(0, 122, 255, 0.8)',
                            color: '#FFFFFF'
                        }}
                        onMouseEnter={(e) => {
                            if (status === 'active') {
                                e.target.style.backgroundColor = 'rgba(255, 59, 48, 1)';
                            } else {
                                e.target.style.backgroundColor = 'rgba(0, 122, 255, 1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (status === 'active') {
                                e.target.style.backgroundColor = 'rgba(255, 59, 48, 0.8)';
                            } else {
                                e.target.style.backgroundColor = 'rgba(0, 122, 255, 0.8)';
                            }
                        }}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            {status === 'active' ? (
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            ) : (
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            )}
                        </svg>
                        <span>{status === 'active' ? 'Stop' : 'Start'}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;

