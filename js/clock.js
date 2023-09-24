const clock = document.querySelector('h2#clock');

const getClock = function () {
  // 시간 포맷 매서드
  //   clock.innerText = new Date().toLocaleTimeString('en-US', { hour12: false });
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  clock.innerText = `${hours}:${minutes}:${seconds}`;
};

//window 열자마자 바로 시계 호출
getClock();
// 그후 매초마다 시계 카운트
setInterval(getClock, 1000);
