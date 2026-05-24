document.addEventListener('DOMContentLoaded', () => {
    // Subtle Skull Parallax
    const skull = document.querySelector('.skull-wrapper');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        if (skull) {
            skull.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Console Log
    console.log("%c system online // state: unstable ", "background: #050505; color: #00f2ff; font-weight: bold;");
});