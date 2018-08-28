/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/* A list that holds all of the cards */
let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"]

let openCard = []; //To store the open card list
let moves = 0; //To store the no of moves
let score = 0; //To store the score
const reset = document.querySelector(".restart"); //Stores RESET button information
const cards = document.getElementsByClassName("card"); //Stores CARD element information
const movesShow = document.getElementsByClassName("moves")[0]; //Stores MOVES display information
const allCards = document.getElementsByClassName("card"); //Selects all elements with class Card
let previousCard; //stores the previously clicked card information

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

function setEventforClick() {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener("click", flipCard);
    }
}
/* Function to resets the game by setting score, time, moves to zero and reshuffeling the cards */
function resetGame() {

    cardList = shuffle(cardList); // To shuffle the card list

    /* Add classes to the elements from shuffled card list to display the cards on the page */
    for (let i = 0; i < cardList.length; i++) {
        let cardChild = cards[i].children[0];
        cardChild.className = "fa" + " " + cardList[i];
    }

    score = 0; // Sets the score to 0
    moves = 0; // Sets the moves counter to 0
    movesShow.innerHTML = moves; //Display the updated move count
    openCard = []; //Empty the openCard list

    for (let j = 0; j < cards.length; j++) {
        hideCard(cards[j]); //hide all the fliped card
    }
    setEventforClick();
}

/* flipCard function to flip and show card */
function flipCard() {
    let card = event.target;
    // console.log(card.children[0].classList[1] + " Clicked, moves=" + moves);
    if (card.classList.contains("open")) {
        console.log("Card already open");
    } else {
        card.className = "card open show";
        card.removeEventListener("click", flipCard);
        moves++;
        movesShow.innerHTML = moves;
        // console.log(card.children[0].classList[1] + " Clicked, moves=" + moves);
        // console.log("Class SHOW added, Class list of card element=" + card.classList);
        openCard.push(card.children[0].classList[1]);
        previousCard = this;
    }
    // if (moves % 2 == 0 && openCard.length != 0) {
    //     if (openCard[openCard.length - 1] == openCard[openCard.length - 2]) {
    //         console.log("Card matched...");
    //         // card.classList.add("open", "match");
    //     } else {
    //         console.log("Card NOT matched...");
    //         hideCard(card);
    //         hideCard(previousCard);
    //     }
    // }

    console.log(openCard + "\n" + card.classList);
}



/*hideCard Function to flip back and hide the card */
function hideCard(c) {
    c.className = "card";
    c.addEventListener("click", flipCard);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



/****************************************
         PROGRAM STARTS HERE
****************************************/

/*When user clock reset button, call resetGame fuction*/
reset.addEventListener("click", resetGame);

/* Setting event listener for click to every cards */
setEventforClick();