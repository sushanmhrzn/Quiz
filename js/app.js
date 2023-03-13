
const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionsContainer=document.querySelector(".option-container");
let homeBox=document.querySelector(".home");
let quizBox=document.querySelector(".quiz-box");
let resultBox=document.querySelector(".result-box");
let singupBox=document.querySelector(".signup");
let loginBox=document.querySelector(".login");
const totalattempt=document.querySelector(".total-attempts");
const totalquestions=document.querySelector(".total-question");
const answerIndicator=document.querySelector(".answer-indicator");
const correctS=document.querySelector('.correct');
const incorrectS=document.querySelector('.wrong');
const score=document.querySelector('.score');
const total=document.getElementById("num");
let totalQues=0;
totalQues=total.value;

let availableQuestions=[];
let questionCounter=0;
let availableOption=[];
let currentQuestion;
let correct=0;
let incorrect=0;
let attempt=0;
let randomQuestion=[];
let questionLimit;
let downloadTimer;

function play(){
    totalQues=parseInt(total.value);
    let numberOfQuestion=totalQues;
    questionLimit=questions.length;
    
    if(isNaN(numberOfQuestion)){
        alert("Please enter a number before playing");
    }
    else if(numberOfQuestion>questionLimit){
        alert("Sorry there is not enough question, we have only "+questionLimit+" questions");
        // // home();
        // newHome();
    }else{
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setQuestions();
    }
    }
// function setQuestions() {
    
    
//     for(let i=0; i<questions.length; i++){
//         console.log("hello");
//         availableQuestions.push(questions[Math.floor(Math.random()*questions.length)]);
//         // attempt=attempt+1;
        
//     }
    
//     console.log(availableQuestions);
//     // console.log(availableQuestions);
// }
let randomavailableQuestions=[]
let questionIndex;

function newHome(){
    homeBox.classList.add("hide");
    homeBox.classList.remove("hide");
    reset();
}
function setQuestions() {
    let numberOfQuestion=totalQues;
    questionLimit=questions.length;

    // alert("Hello");
   
       
        for(let i=0; i<questions.length; i++){
            console.log("hello");
             randomavailableQuestions.push(i);
            // attempt=attempt+1;     
        }
       
        for(let i=0;i<questions.length;i++){
            questionIndex=randomavailableQuestions[Math.floor(Math.random()*randomavailableQuestions.length)];
            index=randomavailableQuestions.indexOf(questionIndex);
            availableQuestions.push(questions[questionIndex]);
            randomavailableQuestions.splice(index,1);
            // console.log(""randomavailableQuestions);
            console.log(questionIndex);
            console.log(randomavailableQuestions);
        }
        console.log(availableQuestions);
        
        getNewQuestion();
    }  
    // console.log(randomavailableQuestions);

function getNewQuestion(){
    // setQuestions();
    var timeleft = 15;
     downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            document.getElementById("countdown").innerHTML ="";
          clearInterval(downloadTimer);
          next();
        } else {
          document.getElementById("countdown").innerHTML = timeleft + " seconds remaining before you answer";
        }
        timeleft -= 1;
      }, 1500);


    questionNumber.innerHTML=` Questions ${questionCounter + 1} of ${totalQues}`;
    // console.log(availableQuestions[0]);
    const questionIndex= availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    // console.log(questionIndex);
    console.log(questionIndex);
    currentQuestion=questionIndex;
    console.log(currentQuestion);
    questionText.innerHTML=currentQuestion.question;
    const currentIndex=availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(currentIndex,1);
    // console.log(availableQuestions);

    const optionLength= currentQuestion.options.length;
    for(let i=0;i<optionLength;i++){
        availableOption.push(i);
    }
    // console.log(availableOption)
    optionsContainer.innerHTML="";
    for(let i=0;i<optionLength;i++){

        const optionIndex= availableOption[Math.floor(Math.random() * availableOption.length)];
        // console.log(optionIndex);
        const index2=availableOption.indexOf(optionIndex);
        // console.log(index2);
        availableOption.splice(index2,1);
        // console.log(optionIndex);
        
        const option=document.createElement("div");
        
        option.innerHTML=currentQuestion.options[optionIndex];
        option.id=optionIndex;
        option.className="option";
        optionsContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)")
    }
    
    // if(abc==undefined){
    //     attempt-=1;
    //     console.log(attempt);
    // }

    questionCounter++;
}
function login(){
    username=document.getElementById("username").value;
    password=document.getElementById("password").value;
    if(!username || !password){
        alert("Please fill both the fields");
    }else{
        console.log(username, password);

        loginBox.classList.add("hide");
        homeBox.classList.remove("hide");
    }
}

function signupPage(){
    loginBox.classList.add("hide")
    singupBox.classList.remove("hide");    
}
function loginPage(){
    singupBox.classList.add("hide")
    loginBox.classList.remove("hide");    
}

function getResult(element){
    const id=parseInt(element.id);
    console.log("Element: "+id);
    if(id==currentQuestion.answer){
        element.classList.add("correct");
        correct +=1;
    }else{
        incorrect+=1;
        element.classList.add("incorrect");
        const optionLength=optionsContainer.children.length;
        console.log(currentQuestion.question);
        for(let i=0;i<optionLength;i++){
            console.log("Option Container id====="+ (optionsContainer.children[i].id)+"   " +(currentQuestion.answer));
            if(parseInt(optionsContainer.children[i].id)===currentQuestion.answer){
                optionsContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickable();
    attempt++;
}
function unclickable(){
    // console.log("hello");
    const optionLength = optionsContainer.children.length;
    for(let i=0;i<optionLength;i++){
        optionsContainer.children[i].classList.add("answered");
    }
}
function home(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    reset();
}
function next(){
    if(questionCounter==totalQues){
        console.log(attempt);
        totalquestions.innerHTML=totalQues;
        totalattempt.innerHTML=attempt;
        correctS.innerHTML=correct;
        incorrectS.innerHTML=incorrect;
        score.innerHTML=correct*10;
        quizBox.classList.add("hide");
        resultBox.classList.remove("hide");
        reset();
        setQuestions();
    }else{
        
        document.getElementById("countdown").innerHTML ="";
        clearInterval(downloadTimer);
        getNewQuestion();
    }
}
function reset(){
    availableQuestions=[];
    attempt=0;
    questionCounter=0;
    availableOption=[];
    currentQuestion;
    correct=0;
    totalQues=0
    incorrect=0;
    const list = answerIndicator;
    
    if (list.hasChildNodes()) {
    list.removeChild(list.children);
    console.log("j");
}
}
window.onload = function abc(){
    
//     getNewQuestion();
}