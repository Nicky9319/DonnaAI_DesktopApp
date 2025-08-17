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
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

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
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, 28), 120); // Min 28px, Max 120px
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [inputValue]);

  // Drag functionality
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('textarea')) {
      return; // Don't start dragging if clicking on buttons or textarea
    }
    
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep widget within viewport bounds
    const maxX = window.innerWidth - (isExpanded ? 540 : 390);
    const maxY = window.innerHeight - (isExpanded ? 600 : 500);
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

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

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const sidebarWidth = 40;
  const chatWidth = isExpanded ? '500px' : '350px';
  const chatHeight = isExpanded ? '600px' : '500px'; // Increased height
  const messagesHeight = isExpanded ? '500px' : '400px'; // Increased messages area

  return (
    <HoverComponent>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: position.y || '120px',
          left: position.x || `calc(50vw - ${parseInt(chatWidth) / 2 + sidebarWidth / 2}px)`,
          background: themeColors.primaryBackground,
          border: `1px solid ${themeColors.borderColor}`,
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          zIndex: 10003,
          maxHeight: chatHeight,
          width: `calc(${chatWidth} + ${sidebarWidth}px)`,
          overflow: 'hidden',
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Messages Area with Sidebar */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          height: messagesHeight
        }}>
          {/* Vertical Sidebar */}
          <div style={{
            width: sidebarWidth,
            background: themeColors.secondaryBackground,
            borderRight: `1px solid ${themeColors.borderColor}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            gap: '0px'
          }}>
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: 'none',
                background: themeColors.tertiaryBackground,
                color: themeColors.primaryText,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                fontSize: '10px',
                marginBottom: '4px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = themeColors.errorRed;
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = themeColors.tertiaryBackground;
                e.target.style.transform = 'scale(1)';
              }}
              title="Close"
            >
              ×
            </button>

            {/* Expand Button */}
            <button
              onClick={handleExpand}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: 'none',
                background: themeColors.tertiaryBackground,
                color: themeColors.primaryText,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                fontSize: '10px',
                marginBottom: '4px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = themeColors.hoverBackground;
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = themeColors.tertiaryBackground;
                e.target.style.transform = 'scale(1)';
              }}
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? '−' : '+'}
            </button>

            {/* Drag Handle */}
            <button
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: 'none',
                background: themeColors.tertiaryBackground,
                color: themeColors.primaryText,
                cursor: 'grab',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                fontSize: '10px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = themeColors.hoverBackground;
                e.target.style.transform = 'scale(1.1)';
                e.target.style.cursor = 'grabbing';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = themeColors.tertiaryBackground;
                e.target.style.transform = 'scale(1)';
                e.target.style.cursor = 'grab';
              }}
              title="Drag to move"
            >
              ⋮⋮
            </button>
          </div>

          {/* Messages Container */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Messages Area */}
            <div
              className="messages-container"
              style={{
                height: messagesHeight,
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
          </div>
        </div>

        {/* Input Area */}
        <div style={{
          padding: '8px 12px',
          borderTop: `1px solid ${themeColors.borderColor}`,
          background: themeColors.secondaryBackground
        }}>
          <div style={{
            display: 'flex',
            gap: '6px',
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
                minHeight: '28px',
                maxHeight: '120px',
                padding: '6px 10px',
                border: `1px solid ${themeColors.borderColor}`,
                borderRadius: '14px',
                fontSize: '11px',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                background: themeColors.primaryBackground,
                color: themeColors.primaryText,
                transition: 'all 0.2s ease',
                lineHeight: '1.3'
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
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: 'none',
                background: inputValue.trim() && !isTyping ? themeColors.primaryBlue : themeColors.tertiaryBackground,
                color: themeColors.primaryText,
                cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                transform: inputValue.trim() && !isTyping ? 'scale(1)' : 'scale(0.9)',
                flexShrink: 0
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
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
