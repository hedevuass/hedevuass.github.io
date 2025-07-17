// wheel.js
const wheel = new Winwheel({
    canvasId: 'canvas',
    numSegments: 6,
    outerRadius: 230,
    textFontSize: 18,
    segments: [
      { fillStyle: '#f82', text: 'Приз 1' },
      { fillStyle: '#2af', text: 'Приз 2' },
      { fillStyle: '#fa2', text: 'Приз 3' },
      { fillStyle: '#2fa', text: 'Приз 4' },
      { fillStyle: '#af2', text: 'Приз 5' },
      { fillStyle: '#a2f', text: 'Приз 6' }
    ],
    animation: {
      type: 'spinToStop',
      duration: 5,
      spins: 8,
      callbackFinished: alertPrize
    }
  });
  
  document.getElementById('spinBtn').addEventListener('click', () => {
    wheel.startAnimation();
  });
  
  // stop function
  function alertPrize(indicatedSegment) {
    alert(`Поздравляем! В секторе: ${indicatedSegment.text}`);
  }
  