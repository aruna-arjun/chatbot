document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatWindow = document.getElementById("chat-window");

    // Function to add a message to the chat window
    function addMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", `${sender}-message`);
        
        const p = document.createElement("p");
        // Use <pre> tag for code blocks to preserve formatting
        if (sender === 'bot' && (message.includes('class') || message.includes('</'))) {
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = message;
            pre.appendChild(code);
            messageElement.appendChild(pre);
        } else {
            p.textContent = message;
            messageElement.appendChild(p);
        }
        
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Function to handle sending a message
    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === "") return;

        addMessage(messageText, "user");
        userInput.value = "";

        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            addMessage(botResponse, "bot");
        }, 600); // Slightly longer delay for "thinking"
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // --- The "Brain" of the Chatbot ---
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        // --- Basic Conversation ---
        if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
            return "Hello! You can ask me about various programming languages and their syntax.";
        }
        if (lowerCaseMessage.includes("how are you")) {
            return "I'm a bot, so I'm always ready to help! What can I do for you?";
        }
        if (lowerCaseMessage.includes("time")) {
            return `The current time is ${new Date().toLocaleTimeString()}.`;
        }
        if (lowerCaseMessage.includes("bye")) {
            return "Goodbye! Happy coding!";
        }

        // --- Technical Questions with Syntax ---
        // The order is important: check for specific "syntax" questions first.

        // HTML
        if (lowerCaseMessage.includes("html syntax")) {
            return `Basic HTML page structure:\n\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Page Title</title>\n</head>\n<body>\n  <h1>A Heading</h1>\n  <p>A paragraph.</p>\n</body>\n</html>`;
        }
        if (lowerCaseMessage.includes("html")) {
            return "HTML (HyperText Markup Language) is the standard language for creating the structure and content of web pages.";
        }

        // CSS
        if (lowerCaseMessage.includes("css syntax")) {
            return `Basic CSS rule syntax:\n\nselector {\n  property: value;\n}\n\n/* Example: */\np {\n  color: blue;\n  font-size: 16px;\n}`;
        }
        if (lowerCaseMessage.includes("css")) {
            return "CSS (Cascading Style Sheets) is used to style the presentation of web pages, including colors, layout, and fonts.";
        }

        // JavaScript
        if (lowerCaseMessage.includes("javascript syntax") || lowerCaseMessage.includes("js syntax")) {
            return `Basic JavaScript syntax for a variable and a function:\n\n// Variable\nlet message = "Hello, World!";\n\n// Function\nfunction greet() {\n  console.log(message);\n}\n\ngreet(); // Calls the function`;
        }
        if (lowerCaseMessage.includes("javascript") || lowerCaseMessage.includes("js")) {
            return "JavaScript is a programming language that makes web pages interactive and dynamic. It can run in the browser, on servers (Node.js), and more.";
        }

        // NEW: Java
        if (lowerCaseMessage.includes("java syntax")) {
            return `A basic "Hello, World!" program in Java:\n\npublic class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`;
        }
        if (lowerCaseMessage.includes("java")) {
            return "Java is a popular, object-oriented programming language used for building enterprise-scale applications, Android apps, and web backend systems. It's known for its 'write once, run anywhere' principle.";
        }
        
        // Other Tech
        if (lowerCaseMessage.includes("api")) {
            return "An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other.";
        }
        if (lowerCaseMessage.includes("git")) {
            return "Git is a distributed version control system for tracking changes in source code during software development. It's essential for collaboration.";
        }

        // --- Updated Help Command ---
        if (lowerCaseMessage.includes("help")) {
            return "I can answer questions about tech topics. Try asking:\n• What is Java?\n• Show me HTML syntax\n• What is an API?\n• What time is it?";
        }

        // --- Default Response ---
        return "I'm not quite sure about that. Try asking for 'help' to see what I can answer.";
    }
});