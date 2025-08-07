import React from 'react';

const TaskCard = ({ query, status, onAction }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'active':
                return {
                    color: '#00D09C',
                    label: 'Active',
                    bgColor: 'bg-[#00D09C]/20'
                };
            case 'halted':
                return {
                    color: '#FDCB6E',
                    label: 'Halted',
                    bgColor: 'bg-[#FDCB6E]/20'
                };
            case 'userStopped':
                return {
                    color: '#FF6B6B',
                    label: 'User Stopped',
                    bgColor: 'bg-[#FF6B6B]/20'
                };
            default:
                return {
                    color: '#6B7280',
                    label: status,
                    bgColor: 'bg-[#6B7280]/20'
                };
        }
    };

    const statusConfig = getStatusConfig(status);

    return (
        <div className="rounded-lg shadow-lg p-6 mb-4 border border-[#3A86FF]/20" style={{ backgroundColor: '#0D1B2A' }}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div 
                        className={`w-3 h-3 rounded-full mr-3 ${statusConfig.bgColor}`}
                        style={{ backgroundColor: statusConfig.color }}
                    ></div>
                    <span 
                        className="text-sm font-semibold"
                        style={{ color: statusConfig.color }}
                    >
                        {statusConfig.label}
                    </span>
                </div>
                {onAction && (
                    <button
                        onClick={() => onAction(status)}
                        className="px-3 py-1 rounded text-xs font-medium transition-colors"
                        style={{ 
                            backgroundColor: '#3A86FF',
                            color: '#FFFFFF'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#265DF2'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3A86FF'}
                    >
                        {status === 'active' ? 'Stop' : 'Start'}
                    </button>
                )}
            </div>
            <div 
                className="text-base leading-relaxed"
                style={{ color: '#E0E0E0' }}
            >
                {query}
            </div>
        </div>
    );
};

export default TaskCard;
