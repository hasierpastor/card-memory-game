(function() {
  let cards = document.querySelectorAll('.card');
  let flipped_cards = [];
  let lockboard = false;
  let clicks = 0;
  let score = document.getElementById('score');
  let matched_cards = [];
  let lowestScore = localStorage.getItem('newLowScore');
  let newGameButton = document.getElementById('new-game');
  let modal = document.getElementById('modal');
  let finalScore = document.getElementById('final-score');
  let currentLowScore = document.getElementById('low-score');
  let firstGameButton = document.getElementById('first-game');
  let cardContainer = document.getElementById('card-container');
  let header = document.getElementById('head');

  window.onload = function() {
    firstGameButton.addEventListener('click', firstGame);
    randomizeCards(cards);
    cards.forEach(function(card) {
      card.addEventListener('click', flip_card);
    });
  };

  //shuffle cards
  function randomizeCards(arr) {
    for (let i = 0; i < arr.length; i++) {
      let random_num = Math.floor(Math.random() * (arr.length - 1));
      arr[i].style.order = random_num;
    }
  }

  //unflip cards if they don't match

  function unflipCard() {
    flipped_cards[0].classList.remove('is-flipped');
    flipped_cards[1].classList.remove('is-flipped');

    lockboard = false;
    flipped_cards = [];
  }

  //what happens if cards match or don't match

  function matching_cards() {
    if (flipped_cards[0].dataset.name === flipped_cards[1].dataset.name) {
      flipped_cards = [];
      matched_cards.push(flipped_cards[0]);
      matched_cards.push(flipped_cards[1]);
      lockboard = false;
    } else {
      setTimeout(unflipCard, 1500);
    }
  }

  function flip_card() {
    if (lockboard) return;
    if (
      !event.currentTarget.classList.contains('is-flipped') &&
      flipped_cards.length < 2
    ) {
      event.currentTarget.classList.add('is-flipped');
      flipped_cards.push(event.currentTarget);
      score.innerText = 'score: ' + ++clicks;
    }
    if (flipped_cards.length === 2) {
      lockboard = true;
      matching_cards();
    }
    endGame();
  }

  function endGame() {
    if (matched_cards.length === 16) {
      if (lowestScore === null) {
        lowestScore = Infinity;
      }
      if (clicks < lowestScore) {
        localStorage.setItem('newLowScore', clicks);
        lowestScore = localStorage.getItem('newLowScore');
      }
      modal.classList.add('show');
      cardContainer.classList.add('opacity');
      score.classList.add('opacity');
      finalScore.innerText = 'Final score: ' + clicks;
      currentLowScore.innerText = 'Low score: ' + lowestScore;
    }
  }

  function newGame() {
    cards.forEach(function(card) {
      card.classList.remove('is-flipped');
      modal.classList.remove('show');
      cardContainer.classList.remove('opacity');
      score.classList.remove('opacity');
      matched_cards = [];
      clicks = 0;
      score.innerText = 'score: ';
    });
  }

  function firstGame() {
    cardContainer.classList.remove('hide');
    score.classList.remove('hide');
    header.classList.add('hide');
  }

  newGameButton.addEventListener('click', newGame);
});
