
const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");
const questionNumberspan= document.querySelector(".question-num-value");
const totalQuestionSpan= document.querySelector(".total-question");
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestionSpan2=document.querySelector(".total-question2");
const percentage=document.querySelector(".percentage");
const question= document.querySelector(".question");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;

// questions and options and answers

const questions=[
{
q: 'What is the name of The Abuja Intl. airport?', 
options:['Nnamdi Azikiwe','Yakubu Gowon ','Alele Williams','Muhammadu Buhari'],
answer:0
},

{ 
    q: 'Who is the governor of Rivers state?', 
    options:['Dave Umahi','Nyesom Wike','Adoke Peterside','Ifeanyi Okowa'],
    answer:1
    },
{
    q: 'What is the name of the current President’s wife?', 
    options:['Patience Jonathan','Aisha Babangida','Aisha Buhari','Ajoke Murtala'],
    answer:2
    },

    {
        q: 'What is the full meaning of EFCC?', 
        options:['Economic and fault finding commission','  Economic and financial crimes commission','Economic and fact finding commission','Eco and friendly fact commission'],
        answer:1
        },

        {
            q: 'How many states are there in Nigeria', 
            options:['42',' 36','38','34'],
            answer:1
            },   
]

// set questions and options and options number
totalQuestionSpan.innerHTML=questions.length;
function load(){
questionNumberspan.innerHTML=index+1;
question.innerHTML=questions[questionIndex].q;
op1.innerHTML=questions[questionIndex].options[0];
op2.innerHTML=questions[questionIndex].options[1];
op3.innerHTML=questions[questionIndex].options[2];
op4.innerHTML=questions[questionIndex].options[3];
index++;
}

function check(element){
if(element.id==questions[questionIndex].answer){ 
    element.classList.add("correct");
    updateAnswerTracker("correct")
    score++;
    console.log("score:"+score)
}
else{
    element.classList.add("wrong");
    updateAnswerTracker("wrong")
}
disabledOptions()
}

function disabledOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled");
        //but if the answer is wrong and you want to show the correct one
        if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");   
        }
    }

}

function enableOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}

function validate (){
    if(!options[0].classList.contains("disabled")){ alert("Please select one option")
 }
else{
    enableOptions();
    randomQuestion();
}
}

function next(){

    validate()

}


function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;
    if(index==questions.length){
        quizOver();
    }
    else{
       if(myArray.length>0){
       for(let i=0; i<myArray.length; i++){ if(myArray[i]==randomNumber){
           hitDuplicate=1;
          break;
       }
       }
       if(hitDuplicate==1){
           randomQuestion();
       }
       else{
        questionIndex=randomNumber;
        load();
        myArr.push(questionIndex);
       }
       

       }
       if(myArray.length==0){
        questionIndex=randomNumber;
        load();
        myArr.push(questionIndex);
       }

    myArray.push(randomNumber);
    
    }
}

function answerTracker(){
for(let i=0; i<questions.length; i++){
    const div=document.createElement("div")
    answerTrackerContainer.appendChild(div);
}
}

function updateAnswerTracker(classNam){
    answerTrackerContainer.children[index-1].classList.add(classNam);
}

function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";
}

function tryAgain(){ 
window.location.reload();
}

window.onload=function(){
    randomQuestion();
    answerTracker();
}

