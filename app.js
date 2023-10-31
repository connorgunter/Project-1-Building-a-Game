// Variable declaration
let dealerHand = []
let playerHand = []

// Buttons
const hitButtonEl = document.querySelector('.hit-button') 
const standButtonEl = document.querySelector('.stand-button')
const newDealButton = document.querySelector('.new-deal-button')
// grabbing the span to display hand total
const playerScoreText = document.querySelector('.player-score')
const dealerScoreText = document.querySelector('.dealer-score')
const gameResult = document.querySelector('.game-result')
// event listeners for buttons
hitButtonEl.addEventListener('click', hitBtn)
standButtonEl.addEventListener('click', standBtn)
newDealButton.addEventListener('click', newDealBtn)
//


// functions 
init()

function init() {
    console.log("game is running")
}

// function updateScore() {
//     if(player === wins){
//         playerScoreText++;
//     } else {
//         dealerScoreText++
//     }
// }


/*----- constants -----*/
// source for deck / shuffled deck
// https://generalassembly.instructure.com/courses/161/pages/video-resource-css-card-library?module_item_id=2837
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const originalDeck = buildOriginalDeck();

let shuffledDeck;

const playersContainer = document.getElementById('players-container');
const dealersContainer = document.getElementById('dealers-container');

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
// console.log(testDeck[0].value)
function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  let newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    
  }
  return newShuffledDeck;
}
// deal 2 new cards for dealer and player and render on screen //
function dealCard() { // deals first 2 cards for player and dealer
    const dealCard = getNewShuffledDeck().pop()
    return dealCard;
 }
function renderDealerHand() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  dealerHand.push(dealCard(),dealCard())
  renderDeckInContainer(dealerHand, dealersContainer)
  return dealerHand
}
let currentDealerHand = renderDealerHand()

function renderPlayerHand() {
    playerHand.push(dealCard(), dealCard())
    renderDeckInContainer(playerHand, playersContainer)
    return playerHand
}

let currentPlayerHand = renderPlayerHand()


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
// update Players current hand score 
let playerHandScore = 0
function playerHandTotal() {
    playerHandScore = 0
    for(const card of currentPlayerHand) {
        playerHandScore += parseInt(card.value)
    }
    playerScoreText.textContent = `Score: ${playerHandScore}`
    return playerHandScore
}

console.log(playerHandTotal())

// hit button function 
function hitBtn(event) {
    console.log(event.target.innerText)
    if (playerHandTotal() < 21) { //if playerHandTotal < 21
        const playerNewCard = dealCard() // create a new card to draw from shuffled deck
        playerHand.push(playerNewCard) // push the new card onto the playerHand
        renderDeckInContainer(playerHand, playersContainer) // render the new card on the screen
        // playerHandScore = playerHandTotal() // grab the playerhandtotal and set it equal to the variable playerhandscore
        console.log(playerHandScore)
        playerHandScore += parseInt(playerNewCard.value) // add the value of the new card to the playerhandscore
        playerScoreText.textContent = `Score: ${playerHandScore}` // display the new score
        if (playerHandTotal() > 21) {
            gameResult.textContent = "Busted! Dealer Wins!"
        }
    }else{
        console.log("Blackjack!!!")
    }
}


                        // DEALER SCORE AND HIT FUNCTIONS //
let dealerHandScore = 0
function dealerHandTotal() { // this function will do the math of the dealersHandTotal for the first 2 cards
    let dealerHandScore = 0
    for(const card of currentDealerHand) {
        dealerHandScore += parseInt(card.value)
    }
    dealerScoreText.textContent = `Score: ${dealerHandScore}` // displays the current dealerHandTotal
    return dealerHandScore // returns the value to the function
}
console.log(dealerHandTotal())

function standBtn(event) { // stand button when pressed
    console.log(event.target.innerText) // log it is detecting click
    function dealerTurn() { // this function is for when the stand button is pressed, initiate dealers turn
        if (dealerHandTotal() < 17) { // if dealersHandTotal is less than 17
            dealerHit() // dealer will now hit, grabbing a new card from the deck
        } else { // if the dealer has 17 or more, compare hands and update the score because the dealer has chose to stand
            compareHands()
            updateScore()
        }

    }
dealerTurn() // call the dealer turn function, will invoke when stand is clicked
}

function dealerHit() { // dealer hit function
        const dealerNewCard = dealCard() // create a new variable for the next card
        dealerHand.push(dealerNewCard) // push the new card onto the dealers hand
        renderDeckInContainer(dealerHand, dealersContainer) // render the new card on the screen
        dealerHandScore += parseInt(dealerNewCard.value) // adds the new cards value to the current dealerHandScore value
        dealerScoreText.textContent = `Score: ${dealerHandScore}` // displays dealerScoreText on the screen
 
        if (dealerHandTotal() > 21){
            gameResult.textContent = "Dealer Busted! Player Wins!"
        }
}
                        // DEALER HIT AND SCORE FUNCTIONS END //



// function compareHands() {
//     if(dealerHandTotal() <= 21 && dealerHandTotal() > playerHandTotal()){
//         gameResult.textContent = "Dealer Wins!"
//     } else if (dealerHandTotal() > 21) {
//         gameResult.textContent = "Dealer Busted! Player Wins!"
//     }else if (playerHandTotal() > 21) {
//         gameResult.textContent = "Player busted! Dealer Wins!"
//     } else if (playerHandTotal() <= 21 && dealerHandTotal() < playerHandTotal()){
//         gameResult.textContent = "Player Wins!"
//     } else if (playerHandTotal() === dealerHandTotal()){
//         gameResult.textContent ="Push! (Tie!)"
//     } else if (playerHandTotal() === 21 && dealerHandTotal() < 21) {
//         gameResult.textContent = "You got BlackJack! Player Wins!"
//     } else if (dealerHandTotal() === 21 && playerHandTotal() < 21) {
//         gameResult.textContent = "Dealer got BlackJack! Player Loses!"
//     } else {
//         return
//     }
// }

function gameOver() {
    compareHands()
    updateScore()
    
}

// deals new cards 
function newDealBtn(event) { // New Deal Button
    console.log(event.target.innerText) // checking if the button works
    dealerHand = [] // setting dealer hand to empty
    playerHand = [] // setting the player hand to empty
    currentPlayerHand = renderPlayerHand() // rendering starting 2 cards to currentPlayerHand
    currentDealerHand = renderDealerHand() // rendering starting 2 cards to currentPlayerHand
    playerHandScore = 0
    dealerHandScore = 0
    playerHandTotal() 
    dealerHandTotal()
    gameResult.textContent = ""
}


