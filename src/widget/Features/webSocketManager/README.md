# WebSocket Manager Component

This directory contains the WebSocket manager React component that initializes and manages the WebSocket connection.

## Files

- `WebSocketManager.jsx` - React component that initializes WebSocket and updates Redux state
- `README.md` - This documentation file

## Architecture

### Component Structure
```
WebSocketManager (React Component)
├── Creates WebSocket instance
├── Sets instance in Redux state
├── Sets up connection listeners
└── Updates connection status in Redux
```

### Redux Integration
- **State**: Stores WebSocket instance and connection status
- **Actions**: `setWebSocketInstance`, `setConnectionStatus`
- **Selectors**: `selectWebSocketInstance`, `selectIsConnected`

## Usage

### Including the Component
The WebSocketManager component should be included in your main app component:

```jsx
import WebSocketManager from './Features/webSocketManager/WebSocketManager';

const App = () => {
  return (
    <>
      <WebSocketManager />
      {/* Other components */}
    </>
  );
};
```

### Using WebSocket Instance in Components
Access the WebSocket instance from Redux in any component:

```jsx
import { useSelector } from 'react-redux';
import { selectWebSocketInstance, selectIsConnected } from '../store/slices/webSocketSlice';

const MyComponent = () => {
  const wsInstance = useSelector(selectWebSocketInstance);
  const isConnected = useSelector(selectIsConnected);

  const handleSendMessage = () => {
    if (wsInstance && isConnected) {
      wsInstance.emit('my-event', { data: 'Hello!' });
    }
  };

  return (
    <div>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};
```

## Features

### Automatic Initialization
- Creates WebSocket instance on component mount
- Sets up connection status listeners
- Updates Redux state with instance and status

### Connection Management
- Tracks connection status in Redux
- Provides connection/disconnection events
- Handles automatic reconnection

### Event Handling
- Supports custom event listeners via `on()` method
- Provides event emission via `emit()` method
- Clean event listener removal via `off()` method

## Redux State Structure

```javascript
{
  webSocket: {
    wsInstance: WebSocketManager, // The WebSocket instance
    isConnected: boolean,         // Connection status
    lastEvent: object,           // Last received event
    connectionAttempts: number,  // Number of connection attempts
    lastConnectionAttempt: string, // Timestamp of last attempt
    connectionUrl: string,       // Connection URL
    connectionOptions: object    // Connection options
  }
}
```

## Methods Available

### WebSocket Instance Methods
- `connect(url, options)` - Connect to WebSocket server
- `disconnect()` - Disconnect from server
- `emit(event, data, callback)` - Send event to server
- `on(event, callback)` - Listen for events
- `off(event, callback)` - Remove event listener
- `sendConnectionEvent()` - Send connection event to server
- `getConnectionStatus()` - Get current connection status

### Redux Actions
- `setWebSocketInstance(instance)` - Set WebSocket instance in state
- `setConnectionStatus(status)` - Update connection status
- `connectWebSocket(url, options)` - Initiate connection
- `disconnectWebSocket()` - Disconnect WebSocket
- `setLastEvent(event)` - Set last received event
- `resetConnectionAttempts()` - Reset connection attempt counter

### Redux Selectors
- `selectWebSocketInstance(state)` - Get WebSocket instance
- `selectIsConnected(state)` - Get connection status
- `selectLastEvent(state)` - Get last received event
- `selectConnectionAttempts(state)` - Get connection attempts count
- `selectConnectionUrl(state)` - Get connection URL
- `selectConnectionOptions(state)` - Get connection options

## Error Handling

The component includes comprehensive error handling:
- Connection failure handling
- Event emission validation
- Instance availability checks
- Graceful degradation when WebSocket is unavailable

## Testing

To test the WebSocket functionality:

1. **Check Initialization**: Look for "WebSocket Manager component initialized" in console
2. **Verify Connection**: Check connection status in Redux state
3. **Test Events**: Use the test buttons in the UI to send events
4. **Monitor Console**: Watch for connection and event logs

## Migration from Old Architecture

This new architecture replaces the previous hook-based approach:

### Old Pattern (Removed)
```jsx
import { useWebSocket } from '../hooks/useWebSocket';

const { emit, setContext, sendConnectionEvent } = useWebSocket();
```

### New Pattern
```jsx
import { useSelector } from 'react-redux';
import { selectWebSocketInstance } from '../store/slices/webSocketSlice';

const wsInstance = useSelector(selectWebSocketInstance);
```

## Benefits

1. **Centralized Management**: Single component handles WebSocket initialization
2. **Redux Integration**: WebSocket state is part of the global Redux store
3. **Better Testing**: Easier to test WebSocket functionality
4. **Cleaner Components**: Components can focus on their specific logic
5. **Type Safety**: Better TypeScript support with explicit state structure
