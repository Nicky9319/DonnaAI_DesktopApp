import React, { useState, useRef, useEffect } from 'react';

const HorizontalBar = ({ isOpen, onClose, onTypeSomething, onOpenThread, position, showDropdown, onCloseDropdown, dropdownType }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isUser: false, timestamp: new Date() },
    { id: 2, text: "I need help with my project", isUser: true, timestamp: new Date() },
    { id: 3, text: "I'd be happy to help! What kind of project are you working on?", isUser: false, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showDropdown && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [showDropdown]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: "I understand! Let me help you with that. Could you provide more details?",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  // Check if widget is near the right edge of the screen
  const isNearRightEdge = position.x > window.innerWidth - 300;
  
  // Calculate safe position to avoid overlapping with the widget
  const barWidth = 220; // Approximate width of the bar
  const safeLeft = isNearRightEdge ? 
    Math.max(10, position.x - barWidth - 20) : // Keep 20px gap from left edge
    Math.min(window.innerWidth - barWidth - 10, position.x + 60); // Keep 10px gap from right edge
  
  return (
         <div 
       className={`horizontal-bar ${isOpen ? 'bar-open' : ''}`}
       style={{
         position: 'fixed',
         left: safeLeft,
         top: position.y + 15, // Align with the center of the widget
         transform: isOpen ? 'translateX(0)' : (isNearRightEdge ? 'translateX(20px)' : 'translateX(-20px)'),
         opacity: isOpen ? 1 : 0,
         transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
         zIndex: 10002,
         display: 'flex',
         alignItems: 'center',
         gap: '10px',
         pointerEvents: isOpen ? 'auto' : 'none',
         width: 'fit-content',
         height: 'fit-content'
       }}
     >
      {/* Arrow pointing to widget */}
      <div style={{
        width: 0,
        height: 0,
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderRight: isNearRightEdge ? 'none' : '6px solid rgba(0, 0, 0, 0.9)',
        borderLeft: isNearRightEdge ? '6px solid rgba(0, 0, 0, 0.9)' : 'none',
        marginRight: isNearRightEdge ? '0' : '-1px',
        marginLeft: isNearRightEdge ? '-1px' : '0',
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
      }} />
      
             {/* Bar background */}
       <div style={{
         background: '#000000',
         backdropFilter: 'blur(10px)',
         borderRadius: '25px',
         padding: '8px 16px',
         display: 'flex',
         alignItems: 'center',
         gap: '12px',
         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
         border: '1px solid #1C1C1E',
         minWidth: '200px',
         animation: isOpen ? 'slideInFromLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
       }}>
                 {/* Type Something Button */}
         <button
           onClick={onTypeSomething}
           style={{
             background: '#007AFF',
             border: 'none',
             borderRadius: '20px',
             padding: '8px 16px',
             color: '#FFFFFF',
             fontSize: '12px',
             fontWeight: '600',
             cursor: 'pointer',
             transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
             display: 'flex',
             alignItems: 'center',
             gap: '6px',
             boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)',
             whiteSpace: 'nowrap'
           }}
                     onMouseEnter={(e) => {
             e.target.style.transform = 'translateY(-1px) scale(1.02)';
             e.target.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.4)';
           }}
           onMouseLeave={(e) => {
             e.target.style.transform = 'translateY(0) scale(1)';
             e.target.style.boxShadow = '0 2px 8px rgba(0, 122, 255, 0.3)';
           }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Type
        </button>

                 {/* Message Thread Button */}
         <button
           onClick={onOpenThread}
           style={{
             background: '#00D09C',
             border: 'none',
             borderRadius: '20px',
             padding: '8px 16px',
             color: '#FFFFFF',
             fontSize: '12px',
             fontWeight: '600',
             cursor: 'pointer',
             transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
             display: 'flex',
             alignItems: 'center',
             gap: '6px',
             boxShadow: '0 2px 8px rgba(0, 208, 156, 0.3)',
             whiteSpace: 'nowrap'
           }}
                     onMouseEnter={(e) => {
             e.target.style.transform = 'translateY(-1px) scale(1.02)';
             e.target.style.boxShadow = '0 4px 12px rgba(0, 208, 156, 0.4)';
           }}
           onMouseLeave={(e) => {
             e.target.style.transform = 'translateY(0) scale(1)';
             e.target.style.boxShadow = '0 2px 8px rgba(0, 208, 156, 0.3)';
           }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          Thread
        </button>

                 {/* Close button */}
         <button
           onClick={onClose}
           style={{
             background: '#2D2D2F',
             border: 'none',
             borderRadius: '50%',
             width: '24px',
             height: '24px',
             color: '#FFFFFF',
             fontSize: '14px',
             cursor: 'pointer',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             transition: 'all 0.2s',
             marginLeft: '4px'
           }}
                     onMouseEnter={(e) => {
             e.target.style.backgroundColor = '#1C1C1E';
             e.target.style.transform = 'scale(1.1)';
           }}
           onMouseLeave={(e) => {
             e.target.style.backgroundColor = '#2D2D2F';
             e.target.style.transform = 'scale(1)';
           }}
                 >
           ×
         </button>
       </div>

                                                               {/* Dropdown */}
         {showDropdown && (
           <div style={{
             position: 'absolute',
             top: '100%',
             left: '0',
             marginTop: '8px',
             background: '#000000',
             border: '1px solid #1C1C1E',
             borderRadius: '12px',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
             zIndex: 10003,
             maxHeight: '400px',
             width: '350px',
             overflow: 'hidden',
             animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
             pointerEvents: 'auto'
           }}>
             {/* Close button for dropdown */}
             <button
               onClick={() => {
                 onCloseDropdown();
                 onClose(); // Also close the bar
               }}
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
               onMouseEnter={(e) => {
                 e.target.style.backgroundColor = '#1C1C1E';
                 e.target.style.transform = 'scale(1.1)';
               }}
               onMouseLeave={(e) => {
                 e.target.style.backgroundColor = '#2D2D2F';
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
               {messages.map((message) => (
                 <div
                   key={message.id}
                   style={{
                     display: 'flex',
                     justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                     animation: 'messageSlideIn 0.3s ease-out'
                   }}
                 >
                   <div style={{
                     maxWidth: '80%',
                     padding: '8px 12px',
                     borderRadius: '12px',
                     background: message.isUser ? '#007AFF' : '#1C1C1E',
                     color: '#FFFFFF',
                     fontSize: '12px',
                     lineHeight: '1.4',
                     wordWrap: 'break-word'
                   }}>
                     {message.text}
                     <div style={{
                       fontSize: '10px',
                       opacity: 0.7,
                       marginTop: '4px',
                       textAlign: message.isUser ? 'right' : 'left'
                     }}>
                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </div>
                   </div>
                 </div>
               ))}
               <div ref={messagesEndRef} />
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
                 ref={inputRef}
                 className="dropdown-textarea"
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyPress={handleKeyPress}
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
                 onFocus={(e) => {
                   e.target.style.borderColor = '#007AFF';
                 }}
                 onBlur={(e) => {
                   e.target.style.borderColor = '#1C1C1E';
                 }}
               />
               <button
                 onClick={handleSendMessage}
                 disabled={!inputText.trim()}
                 style={{
                   width: '32px',
                   height: '32px',
                   borderRadius: '50%',
                   border: 'none',
                   background: inputText.trim() ? '#007AFF' : '#2D2D2F',
                   color: '#FFFFFF',
                   cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   transition: 'all 0.2s',
                   transform: inputText.trim() ? 'scale(1)' : 'scale(0.9)'
                 }}
                 onMouseEnter={(e) => {
                   if (inputText.trim()) {
                     e.target.style.transform = 'scale(1.05)';
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (inputText.trim()) {
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
       )}
     </div>
   );
 };

export default HorizontalBar;
