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
async function dealHand() {
    let data = await drawCards(4);
    // loops4 through card array from drawCards() and deals to player or dealer based on index 
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
    // Takes array of cards from dealer container and gets the score
    let dealerCards = dealer.querySelectorAll("img:not(.cardBack)");
    let dealerScore = calculateScore(dealer);
    dealerScore = parseInt(dealerScore.split("/")[0]);

    // Takes array of cards from player container and gets the score
    let playerScore =calculateScore(player); // Looks at player 2 cards and updates text to show total
    player2Cards =2; // Set Global Variable equal to number of cards in player array, should be 2 when dealing cards 
    playerScore = parseInt(playerScore.split("/")[0]); // Takes number of cards in player container
    
    // Checks Player for Blackjack, if so display text and run clearBoard() after 2 seconds
    if(playerScore ==21 ) {
        centerText.innerText = "Player: Blackjack";
        centerText.style.color = "Green";
        centerText.style.display = "flex";
        setTimeout(() => {
             clearBoard();
        }, 2000);
        return;
    }
    // Checks Dealer for 21 ,if so display text and show second card, run clearBoard() after 2 seconds
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
    // Neither have 21, set dealer text to value of 1st card
    else {
        let cardValue = dealerCards[0].dataset.value;
        dealerText.innerText = `Dealer: ${cardValue}`;      
        dealerFaceCard = cardValue;
    }
   centerButtons.classList.remove("hideButton"); // Shows hit and stand button
}
    








function loadCard(cardObj) {
    // Takes card object as the param, create a img element and use the card object image as the src, 
    let card = document.createElement("img");
    card.src = cardObj.image;
    let cardValue = cardObj.value;
    // assigns value based on length of the value attribute, 3= ACE, 4 = Jack,King, 5 =Queen, default = nums
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
    // checks for ace if over 21 and updates total if so
    while (score>21 &&aceCount>0) {
        score -=10;
        aceCount --;
    }
    // Updates Display Text for Score 
    let contanierText = `${contanier.className}Text`; // takes the object class passed in and sets it as a string
    let contanierName = contanier.className.charAt(0).toUpperCase() + contanier.className.slice(1);
    let contanierObj = document.querySelector(`.${contanierText}`);
    contanierObj.innerText = `${contanierName}: ${score}`;
    // returns card total value, followed by number of cards in array, followed by number of aces
    // Ex: 15/2/0, 15 total, 2 cards, 0 aces
    return score.toString() + "/" + cardList.length.toString()+aceCount.toString(); 
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
    // hides hit and stand button, to avoid breaking the code
    cardBack.style.display = "none";
    centerButtons.classList.toggle("hideButton");

    let playerScore = calculateScore(player); // gets the string data for text,num of cards, sets display equal to total
    let playerCards = parseInt(playerScore.split("/")[1].slice(0,-1)); // Takes String after "/", and removes last char 
    playerScore = parseInt(playerScore.split("/")[0]); // converts the total from string to int

    let dealerScore = calculateScore(dealer); 
    let aceCount = parseInt(dealerScore.slice(-1)); // takes last char which counts num of aces
    dealerScore = parseInt(dealerScore.split("/")[0]); // convert the string from dealerScore into int

    await sleep(1000); // Pause when showing dealer second card, gives user time to understand/calculate

    // Check for dealer to hit, less than 17 of soft 17(ace included)
    while (dealerScore<17 || (dealerScore==17 && aceCount==1)) {
        // drawing and appending cards
        let data = await drawCards(1);
        let card = loadCard(data.cards[0]);
        dealer.appendChild(card);
        drawCardAudio();
        // 
        let tempScore = calculateScore(dealer); // updating text and getting string 
        dealerScore = parseInt(tempScore.split("/")[0]); // parsing string to int
        aceCount = parseInt(tempScore.slice(-1)); // updates aceCount after soft totals

        await sleep(800); // Pause after each card for user
    }

    // Check for dealer 21 & not a push
    if (dealerScore<22 && dealerScore>playerScore) {
        centerText.innerText = "Dealer: Winner";
        centerText.style.color = "rgb(78, 10, 10)";
        centerText.style.display = "flex";
        // if 2 cards then player stood, update s table value 
        if (playerCards ==2) {
            storeStandingData(false, "S");
        }
        else {storeHittingData(false ,"H")}
    }
    // check for push
    else if (dealerScore==playerScore) {
        centerText.innerText = "Push";
        centerText.style.color = "Yellow";
        centerText.style.display = "flex";
    }
    // player wins
    else {
        centerText.style.color = "Green";
        centerText.innerText = "Player: Winner";
        centerText.style.display = "flex";
        // if 2 cards then player stood, update s table value 
        if (playerCards ==2) {
            storeStandingData(true, "S");
        }
        else {storeHittingData(true ,"H")}
    }
    clearBoard(); 
}

// When hit button is clicked, draw 1 card, append to player container, calcuate score
async function hitButton() {

    centerButtons.classList.toggle("hideButton"); // hide hit and stand button
    drawCardAudio();
    await sleep(100);
    // Draws and appends card
    let data = await drawCards(1);
    let card = loadCard(data.cards[0]);
    player.appendChild(card);
    
    let playerScore = calculateScore(player); // gets string and updates score text
    playerScore = parseInt(playerScore.split("/")[0]);// parse string into int to check for bust later
    player2Cards++; // increments number of cards in player array
    centerButtons.classList.toggle("hideButton"); // shows button
    if (playerScore >21) {
        centerButtons.classList.toggle("hideButton"); // hides button when bust
        storeHittingData(false); // saves data to localStorage
        await sleep (100);
        // Displays bust text
        centerText.innerText = "Player: Bust";
        centerText.style.color = "rgb(78, 10, 10)";
        centerText.style.display = "flex";
        cardBack.style.display ="none";
        clearBoard();
    }
}

// Local Storage Function,
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
    // if localStorage is null
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
// Local Storage Function,
function storeStandingData (isWinnner) {
    let dataString =localStorage.getItem(`S${player2Cards}/${dealerFaceCard}`);
    if (dataString!== null) {
        let parts = dataString.split("/");
        let wins = parseInt(parts[0]);
        let losses = parseInt(parts[1]);
        if(isWinnner) {
            wins;
            dataString = `${wins}/${losses}`;
            localStorage.setItem(`S${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }
        else {
            losses++;
            dataString = `${wins}/${losses}`;
            localStorage.setItem(`S${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }  
    }
    else {
        if(isWinnner) {
            dataString = 1 + "/0";
            localStorage.setItem(`S${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }
        else {
            dataString =  "0/" +1;
            localStorage.setItem(`S${player2Cards}/${dealerFaceCard}`, `${dataString}`);
        }
    }
}


// function for delay when drawing cards
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Audio Function when cards are drawn fron deck
function drawCardAudio () {
    const audio =document.getElementById("drawCard");
    audio.play();
}
// Home Button
function homePage() {
    window.location.href= "../index.html";
}


// Starts Game, gets deck, generates cut card, deals han
async function startGame() {
    await getDeck();
    await drawCards(1); // Cut Card
    await dealHand();

}
startGame();

