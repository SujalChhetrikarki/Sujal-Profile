(function () {
  const colors = ['#7F77DD', '#1D9E75', '#D85A30', '#378ADD', '#D4537E'];
  let idx = 0;
 
  function ripple(x, y) {
    const color = colors[idx++ % colors.length];
 
    // --- Ripple ring ---
    const r = document.createElement('div');
    Object.assign(r.style, {
      position: 'fixed',
      pointerEvents: 'none',
      borderRadius: '50%',
      border: '2.5px solid ' + color,
      width: '0px',
      height: '0px',
      left: x + 'px',
      top: y + 'px',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease',
      opacity: '0.8',
      zIndex: '9999',
    });
    document.body.appendChild(r);
 
    requestAnimationFrame(() => {
      r.style.width = '140px';
      r.style.height = '140px';
      r.style.opacity = '0';
    });
    setTimeout(() => r.remove(), 700);
 
    // --- Sparks ---
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const dist = 35 + Math.random() * 25;
      const s = document.createElement('div');
 
      Object.assign(s.style, {
        position: 'fixed',
        pointerEvents: 'none',
        borderRadius: '50%',
        width: '6px',
        height: '6px',
        background: color,
        left: x + 'px',
        top: y + 'px',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.55s ease, opacity 0.55s ease',
        opacity: '1',
        zIndex: '9999',
      });
      document.body.appendChild(s);
 
      requestAnimationFrame(() => {
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        s.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.1)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 600);
    }
  }
 
  // Mouse click
  document.addEventListener('click', (e) => ripple(e.clientX, e.clientY));
 
  // Touch (mobile)
  document.addEventListener(
    'touchstart',
    (e) => {
      const t = e.touches[0];
      ripple(t.clientX, t.clientY);
    },
    { passive: true }
  );
})();