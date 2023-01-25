let quizEl = document.querySelector(".quiz-container");
let startBtn = document.getElementById("start-btn");
let timerEl = document.querySelector(".timer-count");
let initialsInput = document.getElementById("initials-input");
let highscoresBtn = document.getElementById("highscores-btn");
let highscoresDiv = document.getElementById("highscores-div");
let highscoresList = document.getElementById("highscores-list");

let currentQuestionIndex = 0;
let questionDivs = [];
let resultDivs = [];
let isAnswerClicked = false;
let timer = 60;
let timerInterval;
let score = 0;
let gameOver = false;

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false },
        ],
    },

    {
        question: "The condition in an if/else statement is enclosed within ___.",
        answers: [
            { text: "quotes", correct: false },
            { text: "paranthesis", correct: true },
            { text: "curly brackets", correct: false },
            { text: "square brackets", correct: false },
        ],
    },
    {
        question: "Which of the following is not a type of loop in JavaScript?",
        answers: [
            { text: "for", correct: false },
            { text: "while", correct: false },
            { text: "repeat", correct: true },
            { text: "do-while", correct: false },
        ],
    },
    {
        question: "Which of the following is not a data type in JavaScript?",
        answers: [
            { text: "string", correct: false },
            { text: "number", correct: false },
            { text: "object", correct: false },
            { text: "picture", correct: true },
        ],
    },
    {
        question: "What is the syntax for creating an object in JavaScript?",
        answers: [
            { text: "objectName = new Object()", correct: false },
            { text: "objectName = {}", correct: true },
            { text: "var objectName = {}", correct: true },
            { text: "objectName = new object()", correct: false },
        ],
    },
    {
        question: "Which of the following is not a method of the Array object in JavaScript?",
        answers: [
            { text: "push()", correct: false },
            { text: "pop()", correct: false },
            { text: "split()", correct: true },
            { text: "slice()", correct: false },
        ],
    },
    {
        question: "Which of the following is not a way to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "const", correct: false },
            { text: "let", correct: false },
            { text: "property", correct: true },
        ],


        // add more questions
    }
];

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerEl.innerHTML = timer;
        if (timer <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timerInterval);
            gameOver = true;
            saveScore();
        }
        return timerInterval;
    }, 1000);
}

function moveToNextQuestion() {
    // check if the answer is clicked and if the quiz is completed before moving to the next question
    if (isAnswerClicked) {
        if (currentQuestionIndex < questions.length) {
            questionDivs[currentQuestionIndex].style.display = "none";
            resultDivs[currentQuestionIndex].style.display = "none";
            currentQuestionIndex++;
            questionDivs[currentQuestionIndex].style.display = "block";
            resultDivs[currentQuestionIndex].style.display = "block";
        } else {
            clearInterval(timerInterval);
            gameOver = true;
            saveScore();
        }
        if (timer > 0) {
            timer -= 5;
        }
        isAnswerClicked = false;
    }
} // moveToNextQuestion()

function saveScore() {
    // create input element
    initialsInput = document.createElement("input");
    initialsInput.setAttribute("id", "initials-input");
    initialsInput.setAttribute("placeholder", "Enter initials");
    quizEl.appendChild(initialsInput);

    // create a new button for submitting the initials
    let submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";
    submitBtn.setAttribute("id", "submit-btn");

    // add the button to the page
    quizEl.appendChild(submitBtn);

    submitBtn.addEventListener("click", function () {
        let initials = initialsInput.value;
        let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        highscores.push({ initials, score });
        localStorage.setItem("highscores", JSON.stringify(highscores));
        initialsInput.value = "";
        initialsInput.style.display = "none";
        submitBtn.style.display = "none";
    });

    // remove all question and answer elements from the page
    questionDivs.forEach((div) => {
        div.remove();
    });

    // create a new button to start the quiz again
    let startAgainBtn = document.createElement("button");
    startAgainBtn.innerText = "Start again";
    startAgainBtn.setAttribute("id", "start-again-btn");
    quizEl.appendChild(startAgainBtn);

    // add an event listener to the start again button
    startAgainBtn.addEventListener("click", function () {
        // reset the game variables
        initialsInput.value = "";
        submitBtn.style.display = "none";
        currentQuestionIndex = 0;
        score = 0;
        gameOver = false;
        timer = 60;
        startAgainBtn.style.display = "none";
        startTimer();
        // code to redisplay the questions and answers
        questionDivs.forEach((div, i) => {
            if (i === 0) {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
            quizEl.appendChild(div);
        });
    });
} // saveScore()

startBtn.addEventListener("click", function () {
    startTimer();
    startBtn.remove();
    questions.forEach((question) => {
        // create a new div for the question and applies a "question" class to it
        let questionDiv = document.createElement("div");
        let resultDiv = document.createElement("div");
        questionDiv.setAttribute("class", "question");
        resultDiv.setAttribute("class", "result");

        // create a new h2 for the question text
        let questionText = document.createElement("h2");
        questionText.innerText = question.question;
        questionDiv.appendChild(questionText);

        question.answers.forEach((answer) => {

            let answerDiv = document.createElement("div");
            answerDiv.setAttribute("class", "answer");
            answerDiv.innerText = answer.text;
            answerDiv.dataset.correct = answer.correct;

            // adding eventlistener to elements in the div
            answerDiv.addEventListener("click", (event) => {
                isAnswerClicked = true;
                // get element that was clicked
                let selectedAnswer = event.target;
                // compare if selected answer was correct
                if (selectedAnswer.dataset.correct === "true") {
                    resultDiv.innerText = "correct !! :)";
                    resultDiv.setAttribute("class", "");
                    resultDiv.setAttribute("class", "correct");
                    score++;
                    setTimeout(moveToNextQuestion, 500);
                } else {
                    resultDiv.innerText = "wrong !! lol";
                    resultDiv.setAttribute("class", "");
                    resultDiv.setAttribute("class", "wrong");
                    setTimeout(moveToNextQuestion, 500);
                }
            });

            if (currentQuestionIndex === questions.length || timer <= 0) {
                gameOver = true;
                saveScore();
            }
            questionDiv.appendChild(answerDiv);

        });
        // added the created divs to an array of them, to keep track of their index
        questionDivs.push(questionDiv);
        resultDivs.push(resultDiv);

        // displays the question and result
        quizEl.appendChild(questionDiv);
        questionDiv.appendChild(resultDiv);

        // hide all question divs except the first one
        questionDivs.forEach((div, i) => {
            if (i !== currentQuestionIndex) {
                div.style.display = "none";
                resultDivs[i].style.display = "none";
            }
        });

    }); // questions.forEach()

}); // startBtn.addEventListener("click") 

highscoresBtn.addEventListener("click", function() {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // toggle the visibility of the highscores div
    if (highscoresDiv.style.display === "none") {
        highscoresDiv.style.display = "block";
    } else {
        highscoresDiv.style.display = "none";
    }

    // clear the highscores list
    highscoresList.innerHTML = "";

    highscores.forEach((highscore) => {
        let highscoreLi = document.createElement("li");
        highscoreLi.innerText = highscore.initials + ": " + highscore.score;
        highscoresList.appendChild(highscoreLi);
    });
});