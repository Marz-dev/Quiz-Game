let option = document.querySelectorAll('.option');
let title_Category = document.getElementById('title_Category');
let quetxt = document.querySelector('.question');
let totalQues = document.querySelector('.totalQues');
let clock = document.querySelector('.timer h1');
let nxtBtn = document.querySelector('.nextBtn')
let shuffledQuestion, currentQuestionIndex, totalQuestions, timer;
let optionPicked = false;
let score = 0;
const userKey = generateUserKey();

// Get the URL of the current page
var url = new URL(window.location.href);
const queryParams = url.search.slice(1);

function startgame(questions){
    shuffledQuestion = questions.sort(() => Math.random() - .5)
    .slice(0, Math.min(10, questions.length));

    totalQuestions = shuffledQuestion.length;


    title_Category.innerText = queryParams.toUpperCase();
    currentQuestionIndex = 0;
    nextQuestion();
}

function generateUserKey() {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5); 

    return timestamp + randomNum;
}

function nextQuestion(){
    countDown();
    if(currentQuestionIndex >= totalQuestions){
        localStorage.setItem('score', score);
        localStorage.setItem('total', shuffledQuestion.length);
        window.location.href = `../pages/results.html?${userKey}`;
    }
    resetGame();
    optionPicked = false;
    nxtBtn.style.display = "none";
    showQuestion(shuffledQuestion[currentQuestionIndex]);
    totalQues.innerHTML = `${currentQuestionIndex + 1}/${totalQuestions}`
}

function showQuestion(question){
    quetxt.innerHTML = `<h2>${question.Question}</h2>`;
    for (let i = 0; i < option.length; i++){
        option[i].innerHTML = `<h3>${question.options[i].text} </h3>`
    }
}

function resetGame(){
    for (let i = 0; i < option.length; i++){
        option[i].style = "background-color:  #0469a3";
        option[i].innerHTML = `<h3>${shuffledQuestion[currentQuestionIndex].options[i].text} </h3>`
    }
}

function countDown(){
    if(optionPicked){
        clearInterval(timer);
        clock.style = "color: white";
    }
    let timeLeft = 29;
    timer = setInterval(function(){
        if(timeLeft < 0){
            clearInterval(timer);
            actualAns();
            optionPicked = true;
            afterPicked();
        }else{
            if(timeLeft < 10){
                clock.style = "color: red";
            }
            clock.innerHTML = `${timeLeft}`;
            timeLeft--;
        }
    }, 1000);
   
}

function afterPicked(){
    nxtBtn.style.display = "initial";
    if(currentQuestionIndex < totalQuestions - 1){
        currentQuestionIndex++;
    }else{
        currentQuestionIndex++;
        nxtBtn.innerHTML = "Result";
    }
}

//outputs the actual answer if wrong

function actualAns(){
    shuffledQuestion[currentQuestionIndex].options.forEach((rightOne, index) => {
        if (rightOne.correct === "true") {
            option[index].style.backgroundColor = "green";
        }
    });
}


const initApp = (query) => {
    fetch(`../quizes/${query}.json`)
    .then(response => response.json())
    .then(data => {
       //add the parsed json data to Html
        startgame(data);
    })
}

initApp(queryParams);

let opt = (answer) => {
    if(!optionPicked){
        if(shuffledQuestion[currentQuestionIndex].options[answer-1].correct === "true"){
            option[answer-1].style = "background-color: green";
            score++;
        }else{
            option[answer-1].style = "background-color: red";
            actualAns();
        }
        optionPicked = true;
        afterPicked();
    }
}


//Finding Cheaters 

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    document.body.innerHTML = `<h1> Cheater Cheater! reloader!! </h1>
    <a href="../index.html" style = "text-decoration: none; color: white;">Back to Home</a>`;
}
