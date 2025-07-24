// wheel.js

document.body.addEventListener('click', () => {
  const bg = document.getElementById('bg-music');
  bg.muted = false;
  bg.volume = 0.1;
  bg.play();
}, { once: true });

const wheel = new Winwheel({
  canvasId: 'canvas',
  outerRadius: 140,
  numSegments: 2,
  textFontSize: 24,
  segments: [
    { fillStyle: '#4a90e2', text: '?' },
    { fillStyle: '#e91e63', text: '?' }
  ],
  animation: {
    type: 'spinToStop',
    duration: 5,
    spins: 40,
    stopAngle: 110,
    callbackFinished: showResult
  }
});

const spinBtn = document.getElementById('spinBtn');
const spinAudio = new Audio('audio/wheel-of-fortune.mp3');

spinBtn.addEventListener('click', () => {
  spinAudio.currentTime = 0;
  spinAudio.play();
  document.querySelector('.flip-card')?.remove();
  spinBtn.disabled = true;
  wheel.startAnimation();
});

function showResult(segment) {
  spinBtn.style.display = 'none';
  const isGirl = segment.segmentNumber === 2;
  const card = document.createElement('div');
  card.className = 'flip-card';
  document.body.appendChild(card);

  function setFlipContent(html) {
    card.innerHTML = `<div class="flip-inner">${html}</div>`;
  }

  function doFlip(htmlBack) {
    setFlipContent(`
      <div class="flip-front">?</div>
      <div class="flip-back relative p-1">${htmlBack}</div>
    `);
    setTimeout(() => card.classList.add('flipped'), 500);
  }

  if (isGirl) {
    doFlip(`<div class="flex items-center justify-center bg-red-500 text-white text-center p-4 rounded-lg">Упс!</div>`);
    setTimeout(() => {
      card.classList.remove('flipped');
      setFlipContent(`
        <div class="flip-front">?</div>
        <div class="flip-back relative p-1">
          <img id="result-img" src="img/miron.jpg" alt="Photo"
               class="w-full h-full object-cover rounded-lg" />
        </div>
      `);
      setTimeout(() => card.classList.add('flipped'), 100);

      setTimeout(() => {
        const back = card.querySelector('.flip-back');
        const small = document.createElement('img');
        small.src = 'img/boyimg.png';
        small.alt = 'Overlay';
        small.className = 'absolute bottom-2 right-2 w-16 h-16 rounded-full border-2 border-white shadow';
        back.appendChild(small);
      }, 3000);

    }, 3000);
  } else {
    doFlip(`<img id="result-img" src="img/miron.jpg" alt="Photo"
                  class="w-full h-full object-cover rounded-lg" />`);
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 }, colors: ['#4a90e2', '#fff'] });

    setTimeout(() => {
      const back = card.querySelector('.flip-back');
      const small = document.createElement('img');
      small.src = 'img/boyimg.png';
      small.alt = 'Overlay';
      small.className = 'absolute top-2 right-2 w-20 h-20';
      back.appendChild(small);
    }, 3000);
  }
}
