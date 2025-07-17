
document.body.addEventListener('click', () => {
    const bg = document.getElementById('bg-music');
    bg.muted = false;
    bg.play();
  }, { once: true }); // один раз

const wheel = new Winwheel({
  canvasId: 'canvas',
  numSegments: 8,
  segments: [
    { fillStyle: '#e74c3c', text: 'Вариант 1' },
    { fillStyle: '#2ecc71', text: 'Вариант 2' },
    { fillStyle: '#3498db', text: 'Вариант 3' },
    { fillStyle: '#f1c40f', text: 'Вариант 4' },
    { fillStyle: '#9b59b6', text: 'Вариант 5' },
    { fillStyle: '#1abc9c', text: 'Вариант 6' },
    { fillStyle: '#e67e22', text: 'Вариант 7' },
    { fillStyle: '#34495e', text: 'Вариант 8' },
  ],
  animation: {
    type: 'spinToStop',
    duration: 5,
    spins: 18,
    callbackFinished: alertPrize,
  }
});

const spinAudio = new Audio('audio/wheel-of-fortune.mp3');
const spinBtn = document.getElementById('spinBtn');

spinBtn.addEventListener('click', () => {
  spinAudio.currentTime = 0;
  spinAudio.play();

  wheel.startAnimation();
});

function alertPrize(indicatedSegment) {
  alert('Ты получил: ' + indicatedSegment.text);
}

document.getElementById('spinBtn').addEventListener('click', () => {
  wheel.stopAnimation(false); // сброс
  wheel.rotationAngle = 0;
  wheel.draw();
  wheel.startAnimation();
});
