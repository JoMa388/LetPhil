const deckURL = "https:/deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"; // Deck API 
let deck; // Global deck object once initialized with api, used for remaining cards in deck
let cutCard = Math.floor(Math.random() * (90 - 50 + 1)) + 50;; // Cut card to restart game
let remainingCards;
const dealer = document.querySelector(".dealer"); // Container to Hold dealer cards
const dealerText = document.querySelector(".dealerText"); // Text to display total under dealer
const player = document.querySelector(".player"); // Container to hold player cards
const playerText = document.querySelector(".playerText"); // Text to display player total above player container
let cardBack = document.querySelector(".cardBack");
let centerText = document.querySelector(".centerText");
let deckCount = document.querySelector(".deckCount");
let centerButtons = document.querySelector(".hideButton");
let player2Cards;
let dealerFaceCard;
// Use deckofcards api to get deck and saves data to deck
async function getDeck() {
    try {
        const response = await fetch(deckURL);
        if(!response.ok) {
            throw new Error(`HTTP ERROR STATUS: ${response.status}`);
        }
         deck =await response.json();
    }
    catch(error) {
        console.error('Fetch error:', error);
    }
}
async function shuffleDeck() {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
        if(!response.ok) {
            throw new Error(`HTTP ERROR STATUS: ${response.status}`);
        }
        let data =await response.json();
        remainingCards =data.remaining;
        deckCount.innerHTML = remainingCards;
    }
    catch (error) {
        console.error('Fetch error:', error);
    }
}

// Takes a number as input and draws that many cards with deck_id from deck, returns an array of the card objects called cards
async function drawCards(num) {
    let drawURL = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${num}`;
    try {
        const response = await fetch(drawURL);
        if(!response.ok) {
            throw new Error(`HTTP ERROR STATUS: ${response.status}`);
        }
        let data = await response.json();
        remainingCards =data.remaining;
        deckCount.innerHTML = remainingCards;
        return data ;
    }
    catch (error) {
        console.error('Fetch error:', error);
    }
}

// Draws 4 Cards from deck with drawCards(4), 
// loops4 through card array from drawCards() and deals to player or dealer based on index 
async function dealHand() {
    let data = await drawCards(4);
    for(let i =0; i<data.cards.length; i++) {
        let card = loadCard(data.cards[i]);
        await sleep(200);
        switch (i) {
            case 1:
                dealer.appendChild(card);
                break;
            case 3:
                dealer.appendChild(card);
                break;
            default:
                player.appendChild(card);

                break;
        }
    }
    let dealerCards = dealer.querySelectorAll("img:not(.cardBack)");
    let dealerScore = calculateScore(dealer);
    dealerScore = parseInt(dealerScore.slice(0, -1));
    let playerScore =calculateScore(player); 
    playerScore = parseInt(playerScore.slice(0, -1));
    player2Cards =playerScore;
    
    if(playerScore ==21 ) {
        centerText.innerText = "Player: Blackjack";
        centerText.style.color = "Green";
        centerText.style.display = "flex";
        setTimeout(() => {
             clearBoard();
        }, 2000);
        return;
    }
    else if (dealerScore ==21) {
        centerText.innerText = "Dealer: Blackjack";
        cardBack.style.display = "none";
        centerText.style.color = "rgb(78, 10, 10)";
        centerText.style.display = "flex";
        setTimeout(() => {
             clearBoard();
        }, 2000);
        return;
    }
    else {
        let cardValue = dealerCards[0].dataset.value;
        dealerText.innerText = `Dealer: ${cardValue}`;      
        dealerFaceCard = cardValue;
    }
   centerButtons.classList.remove("hideButton");
}
    


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// Takes cad object as the param, create a img element and use the card object image as the src, 
// sets card object value as data-value
// returns the img element
function loadCard(cardObj) {
    let card = document.createElement("img");
    card.src = cardObj.image;
    let cardValue = cardObj.value;
    switch (cardValue.length) {
        case 3:
            cardValue = 11;
            break;
        case 4:
        case 5:
            cardValue = 10;
            break;
        default: 
    }
    card.dataset.value = cardValue;
    return card;
}

function calculateScore(contanier) {
    let score =0; // Temp Int to calculate total value for blackjack
    let aceCount =0; // Number of Aces, for edge cases, ex double aces, getting a ace when hitting
    let cardList = contanier.querySelectorAll("img:not(.cardBack)");
    // Loops through div container of imgs and reads the data-value to calcuate total. 
    cardList.forEach(img => {
        let cardValue = parseInt(img.dataset.value);
        if (cardValue == 11) {
            aceCount ++;
        }
        score +=cardValue;
    });
    while (score>21 &&aceCount>0) {
        score -=10;
        aceCount --;
    }
    // Updates Display Text for Score 
    let contanierText = `${contanier.className}Text`;
    let contanierName = contanier.className.charAt(0).toUpperCase() + contanier.className.slice(1);
    let contanierObj = document.querySelector(`.${contanierText}`);
    contanierObj.innerText = `${contanierName}: ${score}`;


    return score.toString() +aceCount.toString();
}
// After 2 Seconds clears board and deals next hand 
function clearBoard() {
    if (remainingCards <=cutCard) {
        shuffleDeck();
        drawCards(1);
    }
    setTimeout(() => {
        centerText.style.display ="none";
        let test = document.querySelectorAll(".player img , .dealer img:not(.cardBack)").forEach(img => img.remove());
        cardBack.style.display = "flex";
        playerText.innerText = "Player: ";
        dealerText.innerText = "Dealer: ";
        dealHand();
    },3000);
}


async function standButton() {
    cardBack.style.display = "none";
    centerButtons.classList.toggle("hideButton");
    let playerScore = calculateScore(player);
    playerScore = parseInt(playerScore.slice(0, -1));
    let dealerScore = calculateScore(dealer);
    await sleep(1000);
    let aceCount = parseInt(dealerScore.slice(-1));
    dealerScore = parseInt(dealerScore.slice(0, -1));
    
    while (dealerScore<17 || (dealerScore==17 && aceCount==1)) {
        let data = await drawCards(1);
        let card = loadCard(data.cards[0]);
        dealer.appendChild(card);
        drawCardAudio();
        let tempScore = calculateScore(dealer);
        dealerScore = parseInt(tempScore.slice(0, -1));
        aceCount = parseInt(tempScore.slice(-1));
         await sleep(800);
    }

    centerText.style.color = "rgb(78, 10, 10)";
    if (dealerScore<22 && dealerScore>playerScore) {
        centerText.innerText = "Dealer: Winner";
        centerText.style.display = "flex";
    }
    else if (dealerScore==playerScore) {
        centerText.innerText = "Push";
        centerText.style.color = "Yellow";
        centerText.style.display = "flex";
    }
    else {
        centerText.style.color = "Green";
        centerText.innerText = "Player: Winner";
        centerText.style.display = "flex";
    }
    clearBoard(); 
}

// When hit button is clicked, draw 1 card, append to player container, calcuate score
async function hitButton() {
    centerButtons.classList.toggle("hideButton");
    drawCardAudio();
    await sleep(100);
    let data = await drawCards(1);
    let card = loadCard(data.cards[0]);
    player.appendChild(card);
    let score = calculateScore(player);
    score = parseInt(score.slice(0,-1));
    centerButtons.classList.toggle("hideButton");
    if (score >21) {
        storeHittingData(false);
        await sleep (100);
        centerText.innerText = "Player: Bust";
        centerText.style.color = "rgb(78, 10, 10)";
        centerText.style.display = "flex";
        cardBack.style.display ="none";
        clearBoard();
    }
}
function storeHittingData (isWinnner) {
    let dataString =localStorage.getItem(`H${player2Cards}/${dealerFaceCard}`);
    if (dataString!== null) {
        let parts = dataString.split("/");
        let wins = parseInt(parts[0]);
        let losses = parseInt(parts[1]);
        if(isWinnner) {
            wins;
            dataString = `${wins}/${losses}`;
            localStorage.setItem(`H${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }
        else {
            losses++;
            dataString = `${wins}/${losses}`;
            localStorage.setItem(`H${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }  
    }
    else {
        if(isWinnner) {
            dataString = 1 + "/0";
            localStorage.setItem(`H${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }
        else {
            dataString =  "0/" +1;
            localStorage.setItem(`H${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }
    }
}
function drawCardAudio () {
    const audio =document.getElementById("drawCard");
    audio.play();
}

function homePage() {
    window.location.href= "/blackjack";
}



async function startGame() {
    await getDeck();
    await drawCards(1); // Cut Card
    await dealHand();

}
startGame();

