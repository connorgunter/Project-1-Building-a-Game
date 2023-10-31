// Variable declaration
let dealerHand = []
let playerHand = []

// Buttons
const hitButtonEl = document.querySelector('.hit-button')
const standButtonEl = document.querySelector('.stand-button')
const newDealButton = document.querySelector('.new-deal-button')
console.log("New Deal Button:", newDealButton)
console.log("Hit Button", hitButtonEl)
console.log("Stand Button:", standButtonEl)
// grabbing the span to display hand total
const playerScore = document.querySelector('.player-score')
const dealerScore = document.querySelector('.dealer-score')
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






function updateScore() {
    if(player === wins){
        playerScore++;
    } else {
        dealerScore++
    }
}


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
function dealCard() {
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
    playerHandScore = currentPlayerHand[0].value + currentPlayerHand[1].value
    playerScore.textContent = `Score: ${playerHandScore}`
    return playerHandScore
}

console.log(playerHandTotal())

// hit button function 
function hitBtn(event) {
    console.log(event.target.innerText)
    if (playerHandTotal() < 21) { //if playerHandTotal < 21
        const playerThirdCard = dealCard() // create a new card to draw from shuffled deck
        playerHand.push(playerThirdCard) // push the new card onto the playerHand
        renderDeckInContainer(playerHand, playersContainer) // render the new card on the screen
        playerHandScore = playerHandTotal() // grab the playerhandtotal and set it equal to the variable playerhandscore
        playerHandScore += parseInt(playerThirdCard.value) // add the value of the new card to the playerhandscore
        playerScore.textContent = `Score: ${playerHandScore}` // display the new score
        return playerHandScore // return the new score
    }else{
        console.log("Blackjack!!!")
    }
}

function standBtn(event) {
    console.log(event.target.innerText)
    while (dealerHandTotal < 17) {

    }
}

let dealerHandScore = 0
function dealerHandTotal() {
    let dealerHandTotal = currentDealerHand[0].value + currentDealerHand[1].value
    dealerScore.textContent = `Score: ${dealerHandTotal}`
    return dealerHandTotal
}
console.log(dealerHandTotal())

function dealerHit() {
    if (dealerHandTotal() < 17) {
        console.log("THIS IS WORKING")
        const dealerThirdCard = dealCard()
        dealerHand.push(dealerThirdCard)
        console.log(dealerHand)
        renderDeckInContainer(dealerHand, dealersContainer)
        dealerHandScore = dealerHandTotal()
        dealerHandScore += parseInt(dealerThirdCard.value)
        dealerScore.textContent = `Score: ${dealerHandScore}`
        return dealerHandScore
    }
}

function compareHands() {
    if(dealerHandTotal() <= 21 && dealerHandTotal() > playerHandTotal()){
        gameResult.textContent = "Dealer Wins!"
    } else if (dealerHandTotal() > 21) {
        gameResult.textContent = "Dealer Busted! Player Wins!"
    }else if (playerHandTotal() > 21) {
        gameResult.textContent = "Player busted! Dealer Wins!"
    } else if (playerHandTotal() <= 21 && dealerHandTotal() < playerHandTotal()){
        gameResult.textContent = "Player Wins!"
    } else if (playerHandTotal() === dealerHandTotal()){
        gameResult.textContent ="Push! (Tie!)"
    } else if (playerHandTotal() === 21 && dealerHandTotal() < 21) {
        gameResult.textContent = "You got BlackJack! Player Wins!"
    } else if (dealerHandTotal() === 21 && playerHandTotal() < 21) {
        gameResult.textContent = "Dealer got BlackJack! Player Loses!"
    } else {
        return
    }
}

function gameOver() {
    compareHands()
}
// deals new cards 
function newDealBtn(event) {
    console.log(event.target.innerText)
    dealerHand = []
    playerHand = []
    currentPlayerHand = renderPlayerHand()
    currentDealerHand = renderDealerHand()
    playerHandTotal()
    dealerHandTotal()
    gameOver()
}
dealerHit()


