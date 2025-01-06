let score = document.querySelector('.score h3');
//  scImp Refers to Score Impression i.e, Congratulations/{}
let scImp = document.querySelector('.score h2');
let scored = localStorage.getItem('score');
let totalQues = localStorage.getItem('total');
var url = new URL(window.location.href);
const queryParams = url.search.slice(1);

window.onload = (event) =>{
    if(scored > totalQues/2){
        scImp.innerHTML = "Congratulations";
    }
    else if(scored >= totalQues/4){
        scImp.innerHTML = "You can do better!";
    }else {
        scImp.innerHTML = "Try Again";
    }
    score.innerHTML = `Your Score is 
    <b>${scored}</b> out of <b> ${totalQues} </b>`;
}

function rhome(){
    window.location.href = "../index.html";
}