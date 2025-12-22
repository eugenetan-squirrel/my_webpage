function checkAnswer(button, correctAnsId, outputId) {
    document.querySelector(outputId).innerText = "Your answer is: " + button.innerText;
    if (button.id === correctAnsId) {
        document.querySelector(outputId).innerText += " (Correct!)";
        button.classList.add("correct");
    } else {
        document.querySelector(outputId).innerText += " (Incorrect!)";
        button.classList.add("incorrect");
    }
    
    button.classList.add("selected");
    const questionDiv = button.closest(".question");
    questionDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function checkTextAnswer(inputId, correctAnswer, outputId, buttonId) {
    const inputElement = document.getElementById(inputId);
    const buttonElement = document.getElementById(buttonId);
    const outputElement = document.getElementById(outputId);

    const userAnsDisplay = inputElement.value.trim();
    const userAns = userAnsDisplay.toLowerCase();

    if (String(userAns) === String(correctAnswer).toLowerCase()) {
        outputElement.innerText = "Your answer is: " + userAnsDisplay + " (Correct!)";
        buttonElement.classList.add("correct");
        inputElement.classList.add("correct");
    } else {
        outputElement.innerText = "Your answer is: " + userAnsDisplay + " (Incorrect!)";
        buttonElement.classList.add("incorrect");
        inputElement.classList.add("incorrect");
    }

    if (inputElement) inputElement.disabled = true;
    if (buttonElement) buttonElement.disabled = true;
}