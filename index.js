const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const quizQuestions = [
    {
        question: "What does Node.js use to handle asynchronous operations?",
        options: ["Promises", "Callbacks", "Async/Await", "All of the above"],
        correctAnswer: 2
    },
    {
        question: "Which module is used to create a web server in Node.js?",
        options: ["http", "fs", "path", "url"],
        correctAnswer: 0
    },
    {
        question: "What is the event-driven programming paradigm used by Node.js?",
        options: ["Synchronous programming", "Asynchronous programming", "Sequential programming", "Parallel programming"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is NOT a built-in module in Node.js?",
        options: ["http", "fs", "os", "request"],
        correctAnswer: 3
    },
    {
        question: "What does the 'require' function do in Node.js?",
        options: ["Exports a module", "Imports a module", "Loads a module", "Installs a module"],
        correctAnswer: 2
    },
    {
        question: "Which Node.js method is used to terminate the application?",
        options: ["exit()", "stop()", "end()", "quit()"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a global object in Node.js?",
        options: ["window", "document", "global", "this"],
        correctAnswer: 2
    },
    {
        question: "Which Node.js framework is known for its simplicity and performance?",
        options: ["Express.js", "Meteor.js", "Sails.js", "Koa.js"],
        correctAnswer: 0
    },
    {
        question: "What does the 'npm' command do in Node.js?",
        options: ["Node Package Manager", "New Package Manager", "Necessary Package Manager", "None of the above"],
        correctAnswer: 0
    },
    {
        question: "Which tool is commonly used for debugging Node.js applications?",
        options: ["Visual Studio Code", "Sublime Text", "Atom", "Eclipse"],
        correctAnswer: 0
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let html = '<h1>Welcome to Node.js Quiz</h1>';
    html += '<form action="/submit" method="post">';
    quizQuestions.forEach((question, index) => {
        html += `<p>${question.question}</p>`;
        question.options.forEach((option, optionIndex) => {
            html += `<input type="radio" name="q${index}" value="${optionIndex}" ${(optionIndex === req.query[`q${index}`]) ? 'checked' : ''}> ${option}<br>`;
        });
        html += '<br>';
    });
    html += '<input type="submit" value="Submit">';
    html += '</form>';
    res.send(html);
});

app.post('/submit', (req, res) => {
    let html = '<h1>Quiz Results</h1>';
    let score = 0;
    quizQuestions.forEach((question, index) => {
        const userAnswerIndex = parseInt(req.body[`q${index}`]);
        const correctAnswerIndex = question.correctAnswer;
        html += `<p>${question.question}</p>`;
        html += '</p>';
        html += '<p><strong>Options:</strong><br>';
        question.options.forEach((option, optionIndex) => {
            html += `<input type="radio" name="q${index}" value="${optionIndex}" ${(optionIndex === userAnswerIndex) ? 'checked' : 'disabled'}> ${option}<br>`;
        });
        html += '</p>';
        if (userAnswerIndex === correctAnswerIndex) {
            html += '<p style="color: green;">Correct!</p>';
            score++;
        } else {
            html += `<p style="color: red;">Incorrect. Correct answer: ${question.options[correctAnswerIndex]}</p>`;
        }
        html += '<br>';
    });
    html += `<h2>Your score: ${score}/${quizQuestions.length}</h2>`;
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
