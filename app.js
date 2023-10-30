// Declare variables for 
    // cards
    // shuffledDeck?
    // player
    // dealer
    // hit
    // stand
    // playerTotal
    // dealerTotal
    // playerScore
    // dealerScore
    // wager?
    // balance?
    // winStreak?

let playerCount;
let dealerCount;
let playerScore = 0;
let dealerScore = 0;
const displayTwoCards = [];

// functions
    // shuffleDeck
    // dealCards
    // hitButtonEl
    // standButtonEL
    // endGame
    // updateScore
    


// hit and stand 

const hitButtonEl = document.querySelector('.hit-button')
const standButtonEl = document.querySelector('.stand-button')
const newDealButton = document.querySelector('.new-deal-button')

console.log("New Deal Button:", newDealButton)
console.log("Hit Button", hitButtonEl)
console.log("Stand Button:", standButtonEl)

// event listeners

hitButtonEl.addEventListener('click', handleBtnClick)
standButtonEl.addEventListener('click', handleBtnClick)
newDealButton.addEventListener('click', handleBtnClick)


init()



function handleBtnClick(event){
    console.log(event.target.innerText)
}

function init() {
    console.log("game is running")
}

function hitBtn() {
}

function standBtn() {

}




function gameOver() {
}


function renderCards() {

}



/*----- constants -----*/
// source for deck / shuffled deck
// https://generalassembly.instructure.com/courses/161/pages/video-resource-css-card-library?module_item_id=2837
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const playersContainer = document.getElementById('players-container');
const dealersContainer = document.getElementById('dealers-container');
/*----- event listeners -----*/


/*----- functions -----*/



function buildOriginalDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  let newShuffledDeck = [];
  while (tempDeck.length - 50) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    console.log(newShuffledDeck)
  }
  return newShuffledDeck;
}



function renderNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, playersContainer)
  renderDeckInContainer(shuffledDeck, dealersContainer)
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}


renderNewShuffledDeck();