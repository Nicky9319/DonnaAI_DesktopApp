import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HoverComponent from '../common/components/HoverComponent';
import { themeColors } from '../common/utils/colors';
import { setChatInterfaceVisible } from '../store/uiVisibilitySlice';

const ChatInterface = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'assistant',
      timestamp: new Date(Date.now() - 60000) // 1 minute ago
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 80) + 'px';
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && !isTyping) {
      const newMessage = {
        id: Date.now(),
        text: inputValue.trim(),
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      setIsTyping(true);

      // Simulate assistant response after 1-2 seconds
      setTimeout(() => {
        const responses = [
          "I understand! Let me help you with that.",
          "That's interesting! Can you tell me more?",
          "I see what you mean. Here's what I think...",
          "Great question! Let me break this down for you.",
          "Thanks for sharing that with me. Here's my response...",
          "I'm processing your request. Here's what I found...",
          "That's a good point! Let me provide some insights...",
          "I appreciate your message. Here's my take on this..."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const assistantMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: 'assistant',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
  };

  const handleClose = () => {
    dispatch(setChatInterfaceVisible(false));
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <HoverComponent>
      <div
        style={{
          position: 'fixed',
          top: '120px',
          left: 'calc(50vw - 175px)',
          background: themeColors.primaryBackground,
          border: `1px solid ${themeColors.borderColor}`,
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
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: themeColors.tertiaryBackground,
            border: 'none',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            color: themeColors.primaryText,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            zIndex: 10004
          }}
          onMouseEnter={(e) => {
            e.target.style.background = themeColors.hoverBackground;
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = themeColors.tertiaryBackground;
            e.target.style.transform = 'scale(1)';
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
            scrollbarColor: `${themeColors.borderColor} ${themeColors.primaryBackground}`
          }}
        >
          <style>
            {`
              .messages-container::-webkit-scrollbar {
                width: 6px;
              }
              .messages-container::-webkit-scrollbar-track {
                background: ${themeColors.primaryBackground};
                border-radius: 3px;
              }
              .messages-container::-webkit-scrollbar-thumb {
                background: ${themeColors.borderColor};
                border-radius: 3px;
                transition: background 0.2s;
              }
              .messages-container::-webkit-scrollbar-thumb:hover {
                background: ${themeColors.tertiaryBackground};
              }
            `}
          </style>

          {/* Messages */}
          {messages.map((message) => (
            <div 
              key={message.id}
              style={{ 
                display: 'flex', 
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', 
                animation: 'messageSlideIn 0.3s ease-out' 
              }}
            >
              <div style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '12px',
                background: message.sender === 'user' ? themeColors.primaryBlue : themeColors.surfaceBackground,
                color: themeColors.primaryText,
                fontSize: '12px',
                lineHeight: '1.4',
                wordWrap: 'break-word'
              }}>
                {message.text}
                <div style={{
                  fontSize: '10px',
                  opacity: 0.7,
                  marginTop: '4px',
                  textAlign: message.sender === 'user' ? 'right' : 'left'
                }}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-start', 
              animation: 'messageSlideIn 0.3s ease-out' 
            }}>
              <div style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '12px',
                background: themeColors.surfaceBackground,
                color: themeColors.primaryText,
                fontSize: '12px',
                lineHeight: '1.4'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontSize: '10px', opacity: 0.7 }}>Assistant is typing</div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: themeColors.primaryText,
                      opacity: 0.7,
                      animation: 'typing 1.4s infinite'
                    }} />
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: themeColors.primaryText,
                      opacity: 0.7,
                      animation: 'typing 1.4s infinite 0.2s'
                    }} />
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: themeColors.primaryText,
                      opacity: 0.7,
                      animation: 'typing 1.4s infinite 0.4s'
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '12px',
          borderTop: `1px solid ${themeColors.borderColor}`,
          background: themeColors.secondaryBackground
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end'
          }}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                minHeight: '32px',
                maxHeight: '80px',
                padding: '8px 12px',
                border: `1px solid ${themeColors.borderColor}`,
                borderRadius: '16px',
                fontSize: '12px',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                background: themeColors.primaryBackground,
                color: themeColors.primaryText,
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = themeColors.primaryBlue;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = themeColors.borderColor;
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: inputValue.trim() && !isTyping ? themeColors.primaryBlue : themeColors.tertiaryBackground,
                color: themeColors.primaryText,
                cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                transform: inputValue.trim() && !isTyping ? 'scale(1)' : 'scale(0.9)'
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim() && !isTyping) {
                  e.target.style.background = '#0056CC';
                  e.target.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim() && !isTyping) {
                  e.target.style.background = themeColors.primaryBlue;
                  e.target.style.transform = 'scale(1)';
                }
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

export default ChatInterface;
