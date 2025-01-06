let quizes = document.querySelector('.quizes');



const loadQuizes = (data) => {
    data.forEach(element => {
        //Tags
        const quiz = document.createElement('div');
        quiz.innerHTML = `
        <a href="pages/quiz.html?${element.link}">
            <div class="quiz" >
                <img src="img/${element.img}" alt="${element.alt}">
                <h4>${element.name}</h4>
            </div>
        </a>
        `;
        quizes.appendChild(quiz);
    });
}


const initApp = () => {
    fetch(`../quizes.json`)
    .then(response => response.json())
    .then(data => {
       //add the parsed json data to Html
       loadQuizes(data);
    })
}
initApp();