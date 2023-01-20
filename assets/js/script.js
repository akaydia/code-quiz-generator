let quizEl = document.querySelector(".quiz-container");

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



questions.forEach((question) => {
    // create a new div for the question and applies a "question" class to it
    let questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "question");

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
            //get element that was clicked
            let selectedAnswer = event.target;
            // compare if selected answer was correct
            if (selectedAnswer.dataset.correct === "true") {
                console.log("Correct!");
            } else {
                console.log("Wrong!");
            }
        });
        questionDiv.appendChild(answerDiv);
    });
    quizEl.appendChild(questionDiv);
}); // questions.forEach()