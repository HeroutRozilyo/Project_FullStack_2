// set the score of the game
var score = 0;
var level = 0;
var questionDo = [];

//message when the game is over
var playerWinner = "congratulations! You win!!";
var playerScore = parseInt(score);
var  roundFinished = false;
var cardSelected = false;
var Current = JSON.parse(localStorage.getItem("CurrenUser"));
document.getElementById('username').innerHTML="Name: "+ Current.name;
updateScores();

var allCardElements = document.querySelectorAll(".card");
// Adds click handler to all answer card elements
for(var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];
    if(card.classList.contains("answer-card")) {
      card.addEventListener("click",function(e){
        answerClicked(this);
      });
    }
  }

startGame();

// When a card is clicked
function answerClicked(cardEl) {
    if(cardSelected) { return; }
    cardSelected = true;
  
    cardEl.classList.add("selected-card");
    
    // Wait 500ms to reveal the hacker power
    setTimeout(function(){
        checkSelectedAnswer();
    },500)
  
  }

function checkSelectedAnswer() {
    var selectedAnswer = document.querySelector(".selected-card");
    var selectedAnswerText = selectedAnswer.querySelector(".text");

    var question = document.querySelector(".question-card");
    var realAnswer = question.querySelector(".theAnswer");

    document.querySelector(".message-box").style.display = 'block';

    if(selectedAnswerText.innerHTML[0] == realAnswer.innerHTML[0]) {
        //the player was right
        document.querySelector(".message-box").style.background = "#92D050";
        document.querySelector(".message-text").innerHTML = '<i class="fa fa-thumbs-up"></i> you correct!!';
        //document.querySelector(".message-text").style.color = "black";
        var ansScore = question.querySelector(".score");
        score += parseInt(ansScore.innerHTML);
    }
    else {
        document.querySelector(".message-text").innerHTML = '<i class="fa fa-thumbs-down"></i> you wrong';
        document.querySelector(".message-box").style.background = "#FF0000";

    }

    updateScores();
    level += 1;

    if(level >= questions.length) {
        gameOver();
    }

    roundFinished = true;
    document.querySelector(".selected-card").classList.remove("selected-card");
  }

// Starts the game
function startGame() {

    playRound();
  }

function playRound() {
    roundFinished = true;
    cardSelected = false;

    setTimeout(function(){
        revealCards();
      }, 500);
}

function playTurn() {

    if(document.querySelector(".nextButton").innerHTML == 'next <i class="fa fa-arrow-right"></i>') {
        roundFinished = true;
        cardSelected = false;
    
        // Hides the "next turn" button, will show again when turn is over
        document.querySelector(".message-box").style.display = 'none';
  
        setTimeout(function(){
        revealCards();
        }, 500);
    }
    else {
      location.href='home.html';
    }

  }

function revealCards(){
    var j = 0;
    var cardIndexes = [0,1,2,3];
    
    // Get question and answers
    var randomIndex = Math.floor(Math.random() * (questions.length));
    while(questionDo.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * (questions.length));
    }
    questionDo.push(randomIndex);

    //update progress bar
    var progress = (questionDo.length/questions.length)*100;
    document.querySelector(".myBar").style.width = progress + "%";

    var oneQuestion = questions[randomIndex];

    var question = oneQuestion.question;
    var questionElement = document.querySelector(".question-card");
  
    // Contents of the player cards
    var answers = oneQuestion.answers;
  
    for(var i = 0; i < allCardElements.length; i++) {
      var card = allCardElements[i];
  
      // Display the payer card details
      if(card.classList.contains("answer-card")) {
        card.querySelector(".text").innerHTML = answers[cardIndexes[j]].description;
        j++;
      }
  
    }
    questionElement.querySelector(".text").innerHTML = question.description;
    questionElement.querySelector(".theAnswer").innerHTML = question.correct;
    questionElement.querySelector(".score").innerHTML = question.score;
}


function gameOver() {

    document.querySelector(".message-box").classList.remove("none");
    document.querySelector(".message-text").innerHTML += " You finish all the questions with the score: " + score;
    document.querySelector(".nextButton").innerHTML = 'back to manu';
    

    //update Score
    var users = JSON.parse(localStorage.getItem("users")) ?? [];
    var Current = JSON.parse(localStorage.getItem("CurrenUser"));
    var gamenum=parseInt(Current.allGame);
    gamenum+=1;
    Current.allGame=(gamenum).toString();
    var scoreup=parseInt(Current.Score);
    scoreup+=score;
    Current.Score= (scoreup).toString();
    
    users = users.filter(item => item.email !== Current.email)

    users.push(Current);
    window.localStorage.removeItem('users');
    window.localStorage.removeItem('CurrenUser');
    window.localStorage.setItem('users', JSON.stringify(users));
    window.localStorage.setItem("CurrenUser",JSON.stringify(Current));
}


function updateScores(){
    document.querySelector(".userScore").innerHTML = score;

}

function exit() {

}

