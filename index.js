function setup() {

  createCanvas(windowWidth, windowHeight);

}

// 로고 이미지 선택
const logo = document.querySelector('.logo img');

let offset = 0;

function animate() {

  offset = Math.sin(Date.now() * 0.002) * 12;

  logo.style.transform = `translateY(${offset}px)`;

  requestAnimationFrame(animate);
}

animate();

// 버튼 클릭 이벤트
const startBtn = document.querySelector('.start');

startBtn.addEventListener('click', () => {

  window.location.href = 'onboarding01.html';

});