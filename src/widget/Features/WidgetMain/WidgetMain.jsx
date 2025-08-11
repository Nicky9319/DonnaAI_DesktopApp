import React from 'react';

const WidgetMain = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'rgba(128, 128, 128, 0.3)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#10b981',
        boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
        animation: 'pulse 2s infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'red',
        fontSize: '10px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
      }}>
        WIDGET LOADED!
      </div>
    </div>
  );
};

export default WidgetMain;
