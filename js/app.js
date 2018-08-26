/* A list that holds all of the cards */
let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"]

let openCard = []; //To store the open card list
let moves = 0; //To store the no of moves
let score = 0; //To store the score

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

const reset = document.querySelector(".restart");
const cards = document.getElementsByClassName("card");
const movesShow = document.getElementsByClassName("moves")[0];

/* Function to resets the game by setting score, time, moves to zero and reshuffeling the cards */
function resetGame() {
    cardList = shuffle(cardList); // To shuffle the card list

    /* Add classes to the elements from shuffled card list to display the cards on the page */
    for (let i = 0; i < cardList.length; i++) {
        let cardChild = cards[i].children[0];
        cardChild.className = "fa" + " " + cardList[i];
    }

    score = 0; // Sets the score to 0
    moves = 0; // Sets the moves to 0
    movesShow.innerHTML = moves;
}

reset.addEventListener("click", resetGame);


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

const clickedCard = document.getElementsByClassName("deck")[0];

clickedCard.addEventListener("click", onCardClick);

function onCardClick() {
    let card = event.target;
    console.log(card.children[0].classList[1] + " Clicked");
    if (!card.classList.contains(open))
        displayCard(card);
}

/* displayCard function to flip and show card */
function displayCard(card) {
    card.classList.add("show");
    if (openCard.length == 0 || openCard[openCard.length - 1] == card.children[0].classList[1]) {
        console.log("added");
        openCard.push(card.children[0].classList[1]);
        card.classList.add("open");
        console.log(openCard);
    }



}