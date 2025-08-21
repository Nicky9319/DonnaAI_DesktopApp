// Import the conversation JSON file
import conversationData from '../API Responses/conversation-with-donna.json';

export class ChatHistoryService {
  
  /**
   * Load chat history from the JSON file
   * Later this will be replaced with an API call
   * @returns {Promise<Array>} Array of processed messages
   */
  static async loadChatHistory() {
    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, we're loading from the imported JSON file
      // Later this will be replaced with: const response = await fetch('/api/chat-history');
      const response = conversationData;
      
      if (response.status === 200 && response.data) {
        return this.processChatData(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      throw error;
    }
  }

  /**
   * Process raw chat data into a format suitable for the UI
   * @param {Array} rawData - Raw chat data from the API/JSON
   * @returns {Array} Processed messages
   */
  static processChatData(rawData) {
    const processedMessages = rawData.map((item, index) => {
      const messageData = item.data;
      
      // Better timestamp handling with validation
      let timestamp = messageData.additional_kwargs?.time_stamp;
      
      // Validate the timestamp format
      if (timestamp) {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
          // Invalid timestamp format, use fallback
          timestamp = null;
        }
      }
      
      // If no valid timestamp, create a reasonable fallback based on message order
      if (!timestamp) {
        // Create a timestamp that's a few seconds after the previous message
        // or use current time for the first message
        const baseTime = index === 0 ? Date.now() : Date.now() - (rawData.length - index) * 5000;
        timestamp = new Date(baseTime).toISOString();
      }
      
      return {
        id: messageData.id || `msg-${index}-${Date.now()}`,
        text: messageData.content,
        sender: item.type === 'human' ? 'user' : 'assistant',
        timestamp: timestamp,
        // Add any additional metadata if needed
        metadata: {
          modelName: messageData.response_metadata?.model_name,
          tokenUsage: messageData.response_metadata?.token_usage,
          finishReason: messageData.response_metadata?.finish_reason,
          originalId: messageData.id
        }
      };
    });

    // Add a welcome message if no messages exist
    if (processedMessages.length === 0) {
      processedMessages.unshift({
        id: 'welcome-message',
        text: "Hello! How can I help you today?",
        sender: 'assistant',
        timestamp: new Date().toISOString()
      });
    }

    return processedMessages;
  }

  /**
   * Process a single message for WebSocket handling
   * @param {Object} rawMessage - Raw message from WebSocket
   * @returns {Object} Processed message
   */
  static processSingleMessage(rawMessage) {
    const messageData = rawMessage.data;
    
    // Better timestamp handling with validation
    let timestamp = messageData.additional_kwargs?.time_stamp;
    
    // Validate the timestamp format
    if (timestamp) {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        // Invalid timestamp format, use fallback
        timestamp = null;
      }
    }
    
    // If no valid timestamp, use current time
    if (!timestamp) {
      timestamp = new Date().toISOString();
    }
    
    return {
      id: messageData.id || `msg-${Date.now()}-${Math.random()}`,
      text: messageData.content,
      sender: rawMessage.type === 'human' ? 'user' : 'assistant',
      timestamp: timestamp,
      metadata: {
        modelName: messageData.response_metadata?.model_name,
        tokenUsage: messageData.response_metadata?.token_usage,
        finishReason: messageData.response_metadata?.finish_reason,
        originalId: messageData.id
      }
    };
  }

  /**
   * Future API call function (placeholder)
   * This will replace the JSON file loading when the API is ready
   */
  static async loadChatHistoryFromAPI(conversationId = null) {
    try {
      const url = conversationId 
        ? `/api/chat-history/${conversationId}`
        : '/api/chat-history';
        
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers here when needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.processChatData(data.data || data);
    } catch (error) {
      console.error('API Error loading chat history:', error);
      throw error;
    }
  }
}

export default ChatHistoryService;