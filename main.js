// add questions
const questions = [
    {
        question: "Hudai try kortesi?",
        answers: [
            {text: "baal", correct: false},
            {text: "chal", correct: false},
            {text: "abar baal", correct: false},
            {text: "baal chal", correct: true},
        ]
    },
    {
        question: "baal felaite ascho?",
        answers: [
            {text: "huh tate tur ki", correct: true},
            {text: "baal er question diso", correct: false},
            {text: "tore arr kichu komu nah", correct: false},
            {text: "romjan jak tarpor dekhtesi", correct: false},
        ]
    },
    {
        question: "eikhane ki baal er jonno ascho?",
        answers: [
            {text: "kotha kom ko", correct: true},
            {text: "tore j ki koisi", correct: false},
            {text: "arr hoitese nah baal", correct: false},
            {text: "dhur baal ki  j kori", correct: false},
        ]
    },
    {
    question: "Gulshan er rate koto",
        answers: [
            {text: "1k", correct: false},
            {text: "2k", correct: false},
            {text: "4k", correct: true},
            {text: "tomar awkad er baire", correct: false},
        ]
        },
];
// questions are added

// create variables for using id's in html file
const questionElement = document.getElementById("Questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
// create a function for start the quiz
function startQuiz(){
    currentQuestionIndex=0;
    score= 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// to remove the previwes question in html file we write first

function resetState(){
    nextButton.style.display= "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display= "block";

}

function  showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML= "Play Again";
    nextButton.style.display= "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})
startQuiz();

