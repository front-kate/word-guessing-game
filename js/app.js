const overlay = document.getElementById('overlay');
const start = document.querySelector('.btn__reset');
const phrase = document.getElementById('phrase');
const ul = phrase.querySelector('ul');
const lis = ul.children;
const qwerty = document.getElementById('qwerty');
const scoreboard = document.getElementById('scoreboard');
const ol = scoreboard.firstElementChild;

let missed = 0;

const phrases = [
  'Today is a nice day',
  'Strong people get back up',
  'Be positive',
  'I want a golden retriever',
  'Being sick sucks'
];


start.addEventListener('click', () => {
  overlay.style.display = 'none';
  ul.classList.add('ulDown');
  qwerty.classList.add('keyDown');
});


const getRandomPhraseAsArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const newArray = arr[randomIndex].split('');
  console.log(newArray);
  return newArray;
}


const addPhraseToDisplay = (arr) => {
  for(let i = 0; i < arr.length; i++) {    
    const char = arr[i];
    const li = document.createElement('LI');
    if (char !== ' ') {
      li.classList.add('letter'); 
      li.textContent = char;     
    } else {
      li.classList.add('space');
      li.textContent = char;  
    }
    ul.appendChild(li);
  }  
  return ul;
}

const phraseArray = addPhraseToDisplay(getRandomPhraseAsArray(phrases));


qwerty.addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.tagName ='BUTTON' && btn.className !== 'keyrow' && btn.id !== 'qwerty') {    
    btn.classList.add('chosen');
    btn.disabled = true;

    const letterFound = checkLetter(btn);
    if(letterFound !== null) {
      missed += 0;
      btn.style.backgroundColor = '#76Ce82'; 
    } else if (letterFound === null) {
      missed++;
      ol.lastElementChild.remove();
      btn.style.backgroundColor = 'var(--color-neutral)';
    }
    
  }
  checkWin();
});

const checkLetter = (btn) => {  
  let match = null;
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    if (btn.textContent === li.textContent.toLowerCase()) {
      li.classList.add('show'); 
      match = btn.textContent;      
    }
  }
  return match;  
}

const checkWin = () => {
  let letterCount= 0;
  let showCount = 0;   
  
  for(let i = 0; i < lis.length; i++) {     
    if(lis[i].classList.contains('letter')) {
      letterCount++;
    }     
    if (lis[i].classList.contains('show')) {
      showCount++;
    }    
  }  
  if(letterCount === showCount) {
    won();
  } else {
    lost();
  }
}

const won = () => { 
  setTimeout(() => {
    overlay.className = 'win';
    winLostphrase('Congrats! You WOn!!!', 'bounce', '1s', 'Play More');   
    reset()
  }, 2000)  
}

const lost = () => {
  if (missed >= 5) {
    setTimeout(() => {    
        overlay.className = 'lose';
        winLostphrase('Oh no... You Lost...', 'wiggle', '0.5s', 'Try again'); 
        reset();
    }, 2000)
  }
};

const winLostphrase = (winOrlose, animationName, animationDuration, buttonText) => {
  overlay.firstElementChild.textContent = winOrlose;
  overlay.firstElementChild.style.animationName = animationName;
  overlay.firstElementChild.style.animationDuration = animationDuration;
  overlay.lastElementChild.textContent = buttonText;
};



const reset = () => {
  overlay.style.display = 'flex';
  const buttons = document.querySelectorAll('button');  
  for(let button of buttons) {
    button.className = '';
    button.disabled = false;
    button.style.backgroundColor ='var(--color-keys-light)';
  }  
  missed = 0;
  letterCount = 0;
  showCount = 0;
  ul.innerHTML = '';
  addPhraseToDisplay(getRandomPhraseAsArray(phrases))
  ol.innerHTML = `<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
  <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>`
}











