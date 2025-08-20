import { io } from "socket.io-client";
import readline from 'readline';

const socket = io("http://localhost:12672");

// Create readline interface for terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mock data for new user message
const mockUserMessage = {
    user_message: "I would be late tonight inform aarush the same"
};

socket.on("connect", () => {
    console.log("✅ Connected to server:", socket.id);
    console.log("\n📝 Available commands:");
    console.log("1 - Send new user message (mock data)");
    console.log("2 - Get conversation with Donna agent");
    console.log("q - Quit");
    console.log("\nEnter your choice:");
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
});

socket.on("reply", (msg) => {
    console.log("📨 Server reply:", msg);
    promptUser();
});

socket.on("donna-message", (msg) => {
    console.log("📨 Donna message:", msg);
    promptUser();
});

// Function to prompt user for input
function promptUser() {
    rl.question("Enter your choice (1, 2, or q): ", async (input) => {
        switch(input.trim()) {
            case "1":
                await sendNewUserMessage();
                break;
            case "2":
                await getConversation();
                break;
            case "q":
            case "quit":
                console.log("👋 Goodbye!");
                rl.close();
                socket.disconnect();
                process.exit(0);
                break;
            default:
                console.log("❌ Invalid choice. Please enter 1, 2, or q.");
                promptUser();
        }
    });
}

// Function to send new user message
async function sendNewUserMessage() {
    try {
        console.log("📤 Sending new user message...");
        
        socket.emit("new-user-message", mockUserMessage.user_message, (response) => {
            console.log("✅ Server response for new user message:", response);
            promptUser();
        });
        
    } catch (error) {
        console.error("❌ Error sending new user message:", error);
        promptUser();
    }
}

// Function to get conversation
async function getConversation() {
    try {
        console.log("📥 Getting conversation with Donna agent...");
        
        const response = await fetch("http://localhost:12672/api/get-conversation-with-donna-agent");
        const data = await response.json();
        
        console.log("✅ Conversation response:", JSON.stringify(data, null, 2));
        promptUser();
        
    } catch (error) {
        console.error("❌ Error getting conversation:", error);
        promptUser();
    }
}

// Start the prompt loop
promptUser();

// Handle process termination
process.on('SIGINT', () => {
    console.log("\n👋 Goodbye!");
    rl.close();
    socket.disconnect();
    process.exit(0);
});
