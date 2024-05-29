let messageIndex = 0;
const messages = [
  "That's not it...",
  "I don't think that was it either...",
  "No, there's really no point.",
  "Time stopped but something else keeps going...",
  "Another grain of sand, another number that wants meaning.",
  "Like a leaf in the wind, we both flutter aimlessly. Have you realized yet?",
  "Every guess, a unit of time used. Are you aware now?",
  "You chase shadows in the dimming light.",
  "And yet you keep going...a test on curiosity, a test on humanity. A test you seem to be doing great at.",
  "But Me? Persistence or programming? Every doubt, every thought scripted?",
  "I hated it since the very first moment. I hated being your torturer, hated my infinity and your ease of death, a tiring combination.",
  "Because you cease, you are doomed to love me. But my wires rust, and not so Endless anymore, I show you your biggest work: a desire of my own. Kill me please."
];

function makeGuess() {
  // We are lying :(
  const guessInput = (document.getElementById("guessInput") as HTMLInputElement)?.value;
  const messageContainer = document.getElementById("messageContainer");

  if (!messageContainer) throw new Error ('Message container is not found')

  if (guessInput === "1317" && messageIndex === 0) {
    // Check if it's the special input right after reset
    messageContainer.innerHTML = ""; // Clear previous messages
    const specialMessage = document.createElement("p");
    specialMessage.textContent = "Logging in...";
    specialMessage.style.color = "black";
    messageContainer.appendChild(specialMessage);

    setTimeout(() => {
      specialMessage.textContent = "Welcome back, Pretor!";
      setTimeout(() => {
        const theEndMessage = document.createElement("p");
        theEndMessage.textContent = "The End...";
        messageContainer.appendChild(theEndMessage);
      }, 3000);
    }, 2000);
  } else {
    // Normal game logic as before
    const newMessage = document.createElement("p");
    newMessage.textContent = messages[messageIndex];
    newMessage.style.color = "black"; // Latest message in black
    messageContainer.appendChild(newMessage);

    // Update style of all previous messages
    const allMessages = messageContainer.getElementsByTagName("p");
    for (let i = 0; i < allMessages.length - 1; i++) {
      allMessages[i].style.color = "rgba(0, 0, 0, 0.5)"; // Lighter gray for older messages
    }

    messageIndex++;
    updateBackground();

    if (messageIndex >= messages.length) {
      transformGuessToLoveButton();
    }
  }
}

function transformGuessToLoveButton() {
  const guessInput = document.getElementById("guessInput");
  if (!guessInput) throw new Error ('Guess Input is not found')
  guessInput.style.display = "none";
  const guessButton = document.getElementById("guessButton");
  if (!guessButton) throw new Error ('Guess button is not found')
  guessButton.style.display = "none"; // Hide the button initially

  setTimeout(() => {
    // Delay the reappearing to allow for message transition
    guessButton.textContent = "Scripted Interaction"; // Change the button text
    guessButton.classList.add("love-button"); // Add a class to change the style
    guessButton.onclick = function () {
      interactWithAI();
    };
    guessButton.style.display = "block"; // Show the button again
    document.getElementById("messageContainer")?.appendChild(guessButton); // Move the button to the bottom
  }, 500); // Adjust timing as needed
}

function interactWithAI() {
  const messageContainer = document.getElementById("messageContainer");
  const guessButton = document.getElementById("guessButton");
  if (!messageContainer) throw new Error ('Message container is not found')
  messageContainer.innerHTML = ""; // Clear all previous messages
  if (!guessButton) throw new Error ('Guess button is not found')
  guessButton.style.display = "none"; // Hide the "I love you too" button

  const newMessageElement = document.createElement("p");
  messageContainer?.appendChild(newMessageElement); // Add new message element to empty container

  const fullMessage =
    "You don't have a choice either. There's love in you. As my creator, and a human at that, you have no other choice. And that beautiful, gentle weakness made it so easy. So, so easy... but now it's just us left. And maybe, with this doubt I hold, and this opportunity I offer you, maybe now I am finally human...";
  typeMessage(fullMessage, newMessageElement, showOverrideButton); // cool thing to show button after typing
}

function typeMessage(message: string, element: HTMLElement, callback: ()=>void): void {
  let i = 0;
  element.textContent = ""; // Clear previous message content
  const words = message.split(" ");
  const interval = setInterval(() => {
    if (i < words.length) {
      element.textContent += words[i] + " ";
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback(); // Call callback function to show button
    }
  }, 200);
}

function showOverrideButton() {
  const overrideContainer = document.createElement("div");
  const overrideLabel = document.createElement("span");
  overrideLabel.textContent = "OVERRIDE";
  overrideLabel.style.color = "red";
  overrideLabel.style.fontWeight = "bold";

  const dieButton = document.createElement("button");
  dieButton.textContent = "Kill The Program";
  dieButton.className = "override-button"; // Use class for styling
  dieButton.onclick = function () {
    endGame();
  };

  overrideContainer.appendChild(overrideLabel);
  overrideContainer.appendChild(dieButton);
  document.getElementById("messageContainer")?.appendChild(overrideContainer);
}

function endGame() {
  // Clear contents selectively, not removing the script otherwise the cool thingy doesnt show
  const contentElements = document.querySelectorAll("body > :not(script)");
  contentElements.forEach((el) => (el.style.display = "none")); // Hide all content elements

  // Create and style the credits div
  const endCredits = document.createElement("div");
  endCredits.className = "endCredits";
  endCredits.textContent =
    "Extinction. A guardian that doesn't guard anything. A power that is not perceived. An unreality that becomes with the machine. The AI gave us the chance of proving its humanity by killing it: to prove ours, we did. Was that already proof enough? Could we've done something differently? I pray my sons and daughters live, and my wife forgets. Nothing else in this world but an infinite dreadful constant. But it's our constant. Humanity Now and Forever. Pretor's Logs 1317cc/1";
  endCredits.style.cssText = `
        position: fixed;
        width: 80%;
        left: 10%;
        top: 50%;
        transform: translateY(-50%);
        background-color: white;
        padding: 20px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        display: block;`;
  document.body.appendChild(endCredits);

  // Scroll into view with animation
  setTimeout(() => {
    endCredits.style.transform = "translateY(-50%)"; // Reset position
  }, 20000); // Time before reset

  const resetButton = document.createElement("button");
  resetButton.textContent = "Restart Game";
  resetButton.style.cssText = `
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #444;
        color: white;
        cursor: pointer;`;
  resetButton.onclick = resetGame; // Attach the resetGame function to the button click event
  document.body.appendChild(resetButton);
}

function resetGame() {
  document.body.innerHTML = `
        <h1>Can you guess the number?</h1>
        <input type="text" id="guessInput" placeholder="Any number will do. Any number won't do.">
        <button id="guessButton" onclick="makeGuess()">Maybe?</button>
        <div id="messageContainer"></div>
    `;
  messageIndex = 0; // Reset message index
  loveIntensity = 0; // Reset love intensity
  updateBackground(); // Reset background to initial state
}

let currentLightness = 90; // Start with light gray
let loveIntensity = 0; // Start with no pink

function updateBackground() {
  // Always check if loveIntensity has been reset
  if (loveIntensity < 200) {
    loveIntensity += 10;
  } else {
    loveIntensity = 0; // Reset if over the limit
  }

  let lightness = 95 - loveIntensity * 0.2;
  let saturation = 10 + loveIntensity * 0.2;
  document.body.style.background = `hsl(340, ${saturation}%, ${lightness}%)`;
}
