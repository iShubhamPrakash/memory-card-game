/**************************************************************************************
 * Shubham Prakash
 * Email: shubham.prakash2308@gmail.com
 * LinkedIn: https: //www.linkedin.com/in/ishubhamprakash/
 **************************************************************************************/

/* A list that holds all of the cards */
let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"]
let openCard = []; //To store the open card list
let moves = 0; //To store the no of moves
let score = 0; //To store the score
let sec = 0; //stores second value for time
let min = 0; //stores minute value for time
let previousCard; //stores the previously clicked card
let currentCard; //stores the current clicked card
let timeCounter; //setInterval variable for time calculation
let starValue = 5; //hold star value


const reset = document.querySelector(".restart"); //Stores RESET button information
const cards = document.getElementsByClassName("card"); //Stores CARD element information
const movesShow = document.getElementsByClassName("moves")[0]; //Stores MOVES display information
const allCards = document.getElementsByClassName("card"); //Selects all elements with class Card
const startButton = document.getElementsByClassName("start-game")[0]; //for start button
const reStartButton = document.getElementsByClassName("reStartGame")[0]; //For restart button at the end of game
const timeMin = document.getElementsByClassName("min")[0]; //to access time in minute
const timeSec = document.getElementsByClassName("sec")[0]; //to access time in minute
const starColor = document.getElementsByClassName("star"); //to change stat rating
const startPopup = document.getElementsByClassName("start-popup")[0];
const endPopup = document.getElementsByClassName("end-popup")[0];
const showStar = document.getElementsByClassName("show-star")[0];
const timeShow = document.getElementsByClassName("time-show")[0];
const scoreShow = document.getElementsByClassName("score-show")[0];


// Shuffle function from http://stackoverflow.com/a/2450976 to shuffle card when reset
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*Start of the game */
startButton.addEventListener("click", startGame);

function startGame() {
    startPopup.classList.add("hide-popup");
    setTimeout(function () {
        for (let j = 0; j < cards.length; j++) {
            hideCard(cards[j]); //hide all the fliped card
        }
        timeStart();
    }, 5000);
}

/*Restarting of game */
reStartButton.addEventListener("click", function () {
    resetGame();
    endPopup.classList.add("hide-popup");
    startPopup.classList.remove("hide-popup");
    unHideAllCard();
});

function unHideAllCard() {
    for (let n = 0; n < cards.length; n++) {
        cards[n].className="card match show"; //hide all the fliped card
    }
}

/*When user click reset button, call resetGame fuction*/
reset.addEventListener("click", resetGame);

/* Setting event listener to listen click on every cards */
setEventforClick();

function setEventforClick() {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener("click", flipCard);
    }
}
/* Function to resets the game by setting score, time, moves to zero and reshuffeling the cards */
function resetGame() {
    timeStop();
    timeReset();
    score = 0; // Sets the score to 0
    moves = 0; // Sets the moves counter to 0
    starValue = 5; //Set start value back to 5
    movesShow.innerHTML = moves; //Display the updated move count
    openCard = []; //Empty the openCard list

    cardList = shuffle(cardList); // To shuffle the card list

    /* Add classes to the elements from shuffled card list to display the cards on the page */
    for (let i = 0; i < cardList.length; i++) {
        let cardChild = cards[i].children[0];
        cardChild.className = "fa" + " " + cardList[i];
    }

    for (let k = 0; k < starColor.length; k++) {
        starColor[k].style.color = "#3a8592"; //Set the color of star back to blue
    }

    setEventforClick();
    startPopup.classList.remove("hide-popup");
    unHideAllCard();
}

/* flipCard function to flip and show card */
function flipCard() {
    let card = event.target;
    if (card.tagName == "LI") {
        card.className = "card open show";
        openCard.push(card.children[0].classList[1]);
        card.removeEventListener("click", flipCard);

        if (openCard.length % 2) {
            card.id = "card1";
            console.log("card1 set");
        } else {
            card.id = "card2";
            console.log("card2 set");
        }

        console.log(this);

        if (openCard.length % 2 == 0 && openCard.length != 0) {
            previousCard = document.getElementById("card1");
            currentCard = document.getElementById("card2");

            if (openCard[openCard.length - 1] == openCard[openCard.length - 2]) {
                console.log("Card matched...");
                incrementMoveCount();
                previousCard.id = "";
                currentCard.id = "";
                previousCard.className = "card open show match";
                currentCard.className = "card open show match";
            } else {
                console.log("Card NOT matched...");
                incrementMoveCount();
                previousCard.className = "card show wrong";
                currentCard.className = "card show wrong";
                setTimeout(function () {
                    previousCard.className = "card";
                    currentCard.className = "card";
                    previousCard.id = "";
                    currentCard.id = "";
                    setEventforClick(previousCard);
                    setEventforClick(currentCard);
                    openCard.pop();
                    openCard.pop();
                }, 500);
            }
        }
    }

    // Game Over
    if (openCard.length == 16) {
        stopGame();
    }
}


/*hideCard Function to flip back and hide the card */
function hideCard(c) {
    c.className = "card";
    c.addEventListener("click", flipCard);
}

/* Function to increase move count */
function incrementMoveCount() {
    moves++;
    movesShow.innerHTML = moves;
}

/* Function for calculating and displaying time */

function timeStart() {
    // sec = 0;
    // min = 0;
    timeCounter = setInterval(timeCalculate, 1000);
}

function timeCalculate() {
    sec++;
    if (sec == 60) {
        min++;
        sec = 0;
        timeMin.innerHTML = min;
        //to change the number of star and its value
        starRating(min);
    }
    // console.log(min + " min" + " and " + sec + " sec");
    timeSec.innerHTML = sec;
}

function timeStop() {
    clearInterval(timeCounter);
}

function timeReset() {
    sec = 0;
    min = 0;
    timeMin.innerHTML = min;
    timeSec.innerHTML = sec;
}

function starRating(moves) {
    switch (moves) {
        case 8:
            starValue = 5;
            break;
        case 12:
            starValue = 4;
            starColor[4].style.color = "#60b0be6b";
            break;
        case 15:
            starValue = 3;
            starColor[3].style.color = "#60b0be6b";
            break;
        case 17:
            starValue = 2;
            starColor[2].style.color = "#60b0be6b";
            break;
        case 20:
            starValue = 1;
            starColor[1].style.color = "#60b0be6b";
            break;
        default:
            console.log("many moves!!!");
    }
}


function stopGame() {
    timeStop();
    scoreCalulate();
    console.log("Game Over");
    setTimeout(function () {
        endPopup.classList.remove("hide-popup");
    }, 1000);

    for (let z = 0; z < starValue; z++) {
        showStar.appendChild(document.createElement("i"));
        showStar.children[z].className = "fa fa-star";
    }

    timeShow.innerHTML = min + " min " + sec+" sec";
    scoreShow.innerHTML = score;
}

function scoreCalulate() {
    score = Math.floor(1000 / (min + moves)); //to get the score as an integer value
}