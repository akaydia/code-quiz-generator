let quizEl = document.querySelector(".quiz-container");
let startBtn = document.getElementById("start-btn");
let currentQuestionIndex = 0;
let questionDivs = [];
let resultDivs = [];
let isAnswerClicked = false;

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


    // add more questions

];

function moveToNextQuestion() {
    // check if the answer is clicked and if the quiz is completed before moving to the next question
    if (isAnswerClicked) {
        if (currentQuestionIndex < questions.length - 1) {
            questionDivs[currentQuestionIndex].style.display = "none";
            resultDivs[currentQuestionIndex].style.display = "none";
            currentQuestionIndex++;
            questionDivs[currentQuestionIndex].style.display = "block";
            resultDivs[currentQuestionIndex].style.display = "block";
        } else {
            console.log("Quiz completed =)");
        }
        isAnswerClicked = false;
    }
} // moveToNextQuestion()

startBtn.addEventListener("click", function () {
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
                    setTimeout(moveToNextQuestion, 1000);
                } else {
                    resultDiv.innerText = "wrong !! lol";
                    resultDiv.setAttribute("class", "");
                    resultDiv.setAttribute("class", "wrong");
                    setTimeout(moveToNextQuestion, 1000);
                }
            });
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
