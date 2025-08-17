import React from 'react';
import HoverComponent from '../../common/components/HoverComponent';

const DropdownModal = () => {
  return (
    <HoverComponent>
      <div
        style={{
          position: 'fixed',
          top: '120px',
          left: 'calc(50vw - 175px)',
          background: '#000000',
          border: '1px solid #1C1C1E',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          zIndex: 10003,
          maxHeight: '400px',
          width: '350px',
          overflow: 'hidden',
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Close button for dropdown */}
        <button
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#2D2D2F',
            border: 'none',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            color: '#FFFFFF',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            zIndex: 10004
          }}
        >
          ×
        </button>
        {/* Messages Area */}
        <div
          className="messages-container"
          style={{
            height: '280px',
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#1C1C1E #000000'
          }}
        >
          <style>
            {`
              .messages-container::-webkit-scrollbar {
                width: 6px;
              }
              .messages-container::-webkit-scrollbar-track {
                background: #000000;
                border-radius: 3px;
              }
              .messages-container::-webkit-scrollbar-thumb {
                background: #1C1C1E;
                border-radius: 3px;
                transition: background 0.2s;
              }
              .messages-container::-webkit-scrollbar-thumb:hover {
                background: #2D2D2F;
              }
            `}
          </style>
          {/* Example messages */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'messageSlideIn 0.3s ease-out' }}>
            <div style={{
              maxWidth: '80%',
              padding: '8px 12px',
              borderRadius: '12px',
              background: '#1C1C1E',
              color: '#FFFFFF',
              fontSize: '12px',
              lineHeight: '1.4',
              wordWrap: 'break-word'
            }}>
              Hello! How can I help you today?
              <div style={{
                fontSize: '10px',
                opacity: 0.7,
                marginTop: '4px',
                textAlign: 'left'
              }}>
                09:00
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'messageSlideIn 0.3s ease-out' }}>
            <div style={{
              maxWidth: '80%',
              padding: '8px 12px',
              borderRadius: '12px',
              background: '#007AFF',
              color: '#FFFFFF',
              fontSize: '12px',
              lineHeight: '1.4',
              wordWrap: 'break-word'
            }}>
              I need help with my project
              <div style={{
                fontSize: '10px',
                opacity: 0.7,
                marginTop: '4px',
                textAlign: 'right'
              }}>
                09:01
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'messageSlideIn 0.3s ease-out' }}>
            <div style={{
              maxWidth: '80%',
              padding: '8px 12px',
              borderRadius: '12px',
              background: '#1C1C1E',
              color: '#FFFFFF',
              fontSize: '12px',
              lineHeight: '1.4',
              wordWrap: 'break-word'
            }}>
              I'd be happy to help! What kind of project are you working on?
              <div style={{
                fontSize: '10px',
                opacity: 0.7,
                marginTop: '4px',
                textAlign: 'left'
              }}>
                09:02
              </div>
            </div>
          </div>
          <div />
        </div>
        {/* Input Area */}
        <div style={{
          padding: '12px',
          borderTop: '1px solid #1C1C1E',
          background: '#111111'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end'
          }}>
            <textarea
              value=""
              placeholder="Type your message..."
              style={{
                flex: 1,
                minHeight: '32px',
                maxHeight: '80px',
                padding: '8px 12px',
                border: '1px solid #1C1C1E',
                borderRadius: '16px',
                fontSize: '12px',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                background: '#000000',
                color: '#FFFFFF',
                transition: 'border-color 0.2s'
              }}
              readOnly
            />
            <button
              disabled
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: '#2D2D2F',
                color: '#FFFFFF',
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                transform: 'scale(0.9)'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </HoverComponent>
  );
};





export default DropdownModal;
