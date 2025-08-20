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
      const timestamp = messageData.additional_kwargs?.time_stamp || new Date().toISOString();
      
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