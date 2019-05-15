(function() {
  var cards = document.querySelectorAll('.card');
  var flipped_cards = [];
  var lockboard = false;
  var clicks = 0;
  var score = document.getElementById('score');
  var matched_cards = [];
  var lowestScore = localStorage.getItem('newLowScore');
  var newGameButton = document.getElementById('new-game');
  var modal = document.getElementById('modal');
  var finalScore = document.getElementById('final-score');
  var currentLowScore = document.getElementById('low-score');
  var firstGameButton = document.getElementById('first-game');
  var cardContainer = document.getElementById('card-container');
  var header = document.getElementById('head');

  window.onload = function() {
    firstGameButton.addEventListener('click', firstGame);
    randomizeCards(cards);
    cards.forEach(function(card) {
      card.addEventListener('click', flip_card);
    });
  };

  newGameButton.addEventListener('click', newGame);

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
})();
