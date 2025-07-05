document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatWindow = document.getElementById("chat-window");

    // This function is now more reliable for displaying code.
    function addMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", `${sender}-message`);

        // A simple and effective way to detect code: check for multiple lines.
        if (sender === 'bot' && message.includes('\n')) {
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = message;
            pre.appendChild(code);
            messageElement.appendChild(pre);
        } else {
            const p = document.createElement("p");
            p.textContent = message;
            messageElement.appendChild(p);
        }
        
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === "") return;

        addMessage(messageText, "user");
        userInput.value = "";

        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            addMessage(botResponse, "bot");
        }, 500);
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // --- The "Brain" of the Chatbot ---
    // Re-structured with if...else if for correct logical flow.
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        // --- Basic Conversation ---
        if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
            return "Hello! I can answer questions about Web Dev, Java, Python, SQL, and OS concepts. Ask 'help' for examples.";
        
        // --- Handle Ambiguous Queries First ---
        } else if (lowerCaseMessage.trim() === "syntax") {
            return "Please specify which language's syntax you want (e.g., 'java syntax', 'python syntax').";

        // --- Web Development ---
        } else if (lowerCaseMessage.includes("html syntax")) {
            return `A basic HTML5 page structure:
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>`;
        } else if (lowerCaseMessage.includes("html")) {
            return "HTML (HyperText Markup Language) is the standard language for creating the structure of web pages.";
        } else if (lowerCaseMessage.includes("css syntax")) {
            return `A basic CSS rule:
selector {
  property: value;
}

/* Example */
body {
  background-color: #f0f0f0;
}`;
        } else if (lowerCaseMessage.includes("css")) {
            return "CSS (Cascading Style Sheets) is used for styling the visual presentation of web pages.";
        } else if (lowerCaseMessage.includes("js syntax") || lowerCaseMessage.includes("javascript syntax")) {
            return `JavaScript variable and function syntax:
// Variable to store data
let message = "Hello";

// Function to perform an action
function greet(name) {
  return message + ", " + name;
}

console.log(greet("Alice")); // Outputs: Hello, Alice`;
        } else if (lowerCaseMessage.includes("javascript") || lowerCaseMessage.includes("js")) {
            return "JavaScript is a programming language that makes web pages interactive and dynamic.";

        // --- Developer Tools ---
        } else if (lowerCaseMessage.includes("git")) {
            return "Git is a version control system for tracking changes in code. Common commands are 'git clone', 'git add', 'git commit', and 'git push'.";
        } else if (lowerCaseMessage.includes("api")) {
            return "API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other.";

        // --- Python ---
        } else if (lowerCaseMessage.includes("python syntax")) {
            return `Basic Python variable and function syntax:
# Variable
name = "World"

# Function
def greet(user_name):
  print(f"Hello, {user_name}")

greet(name)`;
        } else if (lowerCaseMessage.includes("python")) {
            return "Python is a high-level programming language known for its simple syntax. It's used in web development, data science, and AI.";

        // --- SQL ---
        } else if (lowerCaseMessage.includes("sql syntax") || lowerCaseMessage.includes("sql select")) {
            return `A basic SQL SELECT statement to query data:
SELECT CustomerName, City
FROM Customers
WHERE Country = 'Mexico';`;
        } else if (lowerCaseMessage.includes("sql")) {
            return "SQL (Structured Query Language) is the standard language for managing and querying data in relational databases.";

        // --- Operating System (OS) Concepts ---
        } else if (lowerCaseMessage.includes("process in os")) {
            return "A process is a program in execution. It's an active entity with its own memory space and resources.";
        } else if (lowerCaseMessage.includes("thread in os")) {
            return "A thread is the smallest unit of a process. Multiple threads can run within one process, sharing its memory, which makes them lightweight.";
        } else if (lowerCaseMessage.includes("os") || lowerCaseMessage.includes("operating system")) {
            return "An Operating System (OS) is software that manages computer hardware and provides services for programs. Examples: Windows, macOS, Linux.";

        // --- Java & OOP Concepts ---
        } else if (lowerCaseMessage.includes("encapsulation")) {
            return `Encapsulation bundles data (fields) and methods into a single class. It restricts direct access to data by using 'private' fields and providing public 'getter' and 'setter' methods.
Example:
public class Person {
  private String name; // private data

  // Getter
  public String getName() { return name; }

  // Setter
  public void setName(String newName) { this.name = newName; }
}`;
        } else if (lowerCaseMessage.includes("inheritance")) {
            return `Inheritance allows one class (child) to acquire the properties and methods of another class (parent) using the 'extends' keyword.
Example:
// Parent class
class Animal {
  void eat() {
    System.out.println("This animal eats food.");
  }
}
// Child class
class Dog extends Animal {
  void bark() {
    System.out.println("The dog barks.");
  }
}`;
        } else if (lowerCaseMessage.includes("polymorphism")) {
            return `Polymorphism means "many forms" and allows us to perform a single action in different ways, most commonly through method overriding.
Example:
class Animal {
  public void animalSound() {
    System.out.println("The animal makes a sound");
  }
}
class Dog extends Animal {
  @Override
  public void animalSound() {
    System.out.println("The dog says: woof");
  }
}`;
        } else if (lowerCaseMessage.includes("abstraction")) {
            return `Abstraction hides complex implementation details and shows only the essential features, using 'abstract' classes and 'interfaces'.
Example:
// Abstract class
abstract class Animal {
  // Abstract method (does not have a body)
  public abstract void animalSound();
}`;
        } else if (lowerCaseMessage.includes("oop")) {
            return "OOP's main principles are Encapsulation, Inheritance, Polymorphism, and Abstraction. Ask me about one for a detailed example!";
        } else if (lowerCaseMessage.includes("java syntax")) {
            return `A basic "Hello, World!" program in Java:
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`;
        } else if (lowerCaseMessage.includes("java")) {
            return "Java is a popular, object-oriented language. You can ask me about its syntax or OOP concepts like 'encapsulation' or 'inheritance'.";
        
        // --- Help & Default ---
        } else if (lowerCaseMessage.includes("help")) {
            return "I can answer questions on many topics. Try asking:\n• What is HTML?\n• python syntax\n• sql select\n• What is a process in os?\n• What is encapsulation in Java?";
        } else {
            return "I'm not sure about that. Try asking for 'help' to see what I can do.";
        }
    }
});