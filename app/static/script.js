document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-messages");
    const userInputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatContainer = document.querySelector(".chat-container");
    // Function to add a user message to the chat
    function addUserMessage(message) {
        const userMessage = document.createElement("div");
        userMessage.className = "message user-message";
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);
    }

    // Function to add a bot message to the chat
    function addBotMessage(message) {
        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent = message;
        chatMessages.appendChild(botMessage);
        console.log('Bot message added:', message);
    }

    // Function to handle user input and bot response
    async function handleUserInput() {
        const userMessage = userInputField.value.trim();

        if (userMessage !== "") {
            // Add the user's message to the chat
            addUserMessage(userMessage);

            // Send the user's message to the server and get the bot's response
            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userInput: userMessage }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Server Response:', data);

                    // Display the chatbot's response
                    addBotMessage(data.chatbotResponse);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }

            // Clear the user input field
            userInputField.value = "";
        }
    }

    // Event listener for the send button
    sendButton.addEventListener("click", handleUserInput);

    // Event listener for pressing Enter in the input field
    userInputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });
    // Function to get the appropriate greeting based on the time of day
    function getGreeting() {
        const now = new Date();
        const hours = now.getHours();
        let greeting = "Good morning! How can I assist you today?";

        if (hours >= 12 && hours < 17) {
            greeting = "Good afternoon! How can I assist you today?";
        } else if (hours >= 17) {
            greeting = "Good evening! How can I assist you today?";
        }

        return greeting;
    }

    // Display the welcome message when the page loads
    addBotMessage(getGreeting());

});
