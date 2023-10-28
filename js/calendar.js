const currentTitle = document.getElementById('current-year-month');
const calendarBody = document.getElementById('calendar-body');
const prevBtn = document.getElementById('calendar-prev');
const nextBtn = document.getElementById('calendar-next');
let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);
let dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let pageFirst = first;
let pageYear;
let clickedDate1;

let TODOS_KEY = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear;
} else {
  pageYear = notLeapYear;
}

//정확한 월의 최대 주수를 구하는 함수
const weekCount = function (dateInfo) {
  let firstDay = new Date(dateInfo.setDate(1)).getDay(); // 해당 월의 첫 번째 요일의 index값
  let totalDays = new Date(
    dateInfo.getFullYear(),
    dateInfo.getMonth() + 1,
    0
  ).getDate(); // 해당 월의 총 일수

  return Math.ceil((firstDay + totalDays) / 7);
};
/* 월 최대 주수 구하는 함수 참고한 소스코드
Date.prototype.getWeekOfMonth = function (dateInfo) {
  let firstDay = new Date(dateInfo.setDate(1)).getDay();
  let totalDays = new Date(
    dateInfo.getFullYear(),
    dateInfo.getMonth() + 1,
    0
  ).getDate();

  return Math.ceil((firstDay + totalDays) / 7);
};
let totalWeeks = new Date().getWeekOfMonth();*/

// 주차별 일자를 렌더링 하는 함수
const showCalendar = function () {
  console.log(first.getMonth());
  console.log(first);
  let monthCnt = 100;
  let cnt = 1;
  for (let i = 0; i < weekCount(first); i++) {
    let $tr = document.createElement('tr');
    $tr.setAttribute('id', monthCnt);
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
        let $td = document.createElement('td');
        $tr.appendChild($td);
      } else {
        let $td = document.createElement('td');
        $td.textContent = cnt;
        $td.setAttribute('id', cnt);
        $tr.appendChild($td);
        cnt++;
      }
    }
    monthCnt++;
    calendarBody.appendChild($tr);
  }
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add('active');

  currentTitle.innerHTML =
    monthList[first.getMonth()] +
    '&nbsp;&nbsp;&nbsp;&nbsp;' +
    first.getFullYear();
};
showCalendar();

const removeCalendar = function (weeks) {
  let catchTr = 100;
  for (let i = 100; i < 100 + weeks; i++) {
    let $tr = document.getElementById(catchTr);
    $tr.remove();
    catchTr++;
  }
  // spread operator & forEach 활용한 소스코드
  // **spread operator 안 쓰고 그냥 노드리스트(calendarBody.childNodes)로 하면 홀수 번째에는 작동 안함... 왜?
  // [...calendarBody.childNodes].forEach(function (date) {
  //   date.remove();
  // });
};

// 이전 달과 다음 달로 이동하는 이벤트 함수
const prev = function () {
  let currentWeekCnt = weekCount(first);
  if (pageFirst.getMonth() === 0) {
    pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
    first = pageFirst;
    if (first.getFullYear() % 4 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notLeapYear;
    }
  } else {
    pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
    first = pageFirst;
  }
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  TODOS_KEY = today;
  currentTitle.innerHTML =
    monthList[first.getMonth()] +
    '&nbsp;&nbsp;&nbsp;&nbsp;' +
    first.getFullYear();
  removeCalendar(currentWeekCnt);
  showCalendar();
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add('active');
  clickStart();

  // 기존 투두리스트 삭제
  const li = document.querySelectorAll('#todo-list li');
  li.forEach(function (list) {
    list.remove();
  });

  current_date_check();
};
// -----'이전 달 이동' 원래 소스코드 (위에 코드랑 작동에는 차이 없었음)
// const prev = function () {
//   if (pageFirst.getMonth() === 1) {
//     pageFirst = new Date(first.getFullYear() - 1, 12, 1);
//     first = pageFirst;
//     if (first.getFullYear() % 4 === 0) {
//       pageYear = leapYear;
//     } else {
//       pageYear = notLeapYear;
//     }
//   } else {
//     pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
//     first = pageFirst;
//   }
//   today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
//   showCalendar();
// };

const next = function () {
  let currentWeekCnt = weekCount(first);
  if (pageFirst.getMonth() === 11) {
    pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
    first = pageFirst;
    if (first.getFullYear() % 4 === 0) {
      pageYear = leapYear;
    } else {
      pageYear = notLeapYear;
    }
  } else {
    pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
    first = pageFirst;
  }
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  TODOS_KEY = today;
  currentTitle.innerHTML =
    monthList[first.getMonth()] +
    '&nbsp;&nbsp;&nbsp;&nbsp;' +
    first.getFullYear();
  removeCalendar(currentWeekCnt);
  showCalendar();
  clickedDate1 = document.getElementById(today.getDate());
  clickedDate1.classList.add('active');
  clickStart();

  // 기존 투두리스트 삭제
  const li = document.querySelectorAll('#todo-list li');
  li.forEach(function (list) {
    list.remove();
  });

  current_date_check();
};
// -----'다음 달 이동' 원래 소스코드(위에 코드랑 작동에는 차이 없었음)
// const next = function () {
//   if (
//     pageFirst.getMonth() ===
//     12 /* 이게 뭔 말인지 모르겠다. getMonth 값은 0 ~ 11로만 출력되는데 왜 12와 === 인지? */
//   ) {
//     pageFirst = new Date(first.getFullYear() + 1, 1, 1);
//     first = pageFirst;
//     if (first.getFullYear() % 4 === 0) {
//       pageYear = leapYear;
//     } else {
//       pageYear = notLeapYear;
//     }
//   } else {
//     pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
//     first = pageFirst;
//   }
//   today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
//   showCalendar();
// };

prevBtn.parentElement.addEventListener('click', prev);
nextBtn.parentElement.addEventListener('click', next);

// 날짜 클릭 -> 색상 변경 함수
let tdGroup = [];
function clickStart() {
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
    tdGroup[i] = document.getElementById(i);
    tdGroup[i].addEventListener('click', changeToday);
  }
}
clickStart();

function changeToday(e) {
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
    if (tdGroup[i].classList.contains('active')) {
      tdGroup[i].classList.remove('active');
    }
  }
  clickedDate1 = e.currentTarget;
  clickedDate1.classList.add('active');
  today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
  TODOS_KEY = today;
  console.log(today, TODOS_KEY);

  // 기존 투두리스트 삭제
  const li = document.querySelectorAll('#todo-list li');
  li.forEach(function (list) {
    list.remove();
  });

  current_date_check();
}

// 해당 일자로 된 키값이 있으면 리스트 불러오기
function current_date_check() {
  const savedToDos = localStorage.getItem(today);
  if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
    noItem.classList.add('hidden');
  } else {
    noItem.classList.remove('hidden');
  }
}

// ----todo list----
const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.getElementById('todo-list');
const noItem = document.querySelector('.noItem');

function saveToDos(toDos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const deleteToDo = function (index) {
  const toDos = JSON.parse(localStorage.getItem(TODOS_KEY));
  toDos.splice(index, 1);
  // 노마드코더 방식
  // const li = e.target.parentElement;
  // li.remove();
  // toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  saveToDos(toDos);
};

const stateToDo = function (index, completed) {
  const toDos = JSON.parse(localStorage.getItem(TODOS_KEY));
  toDos[index].isComplete = completed;
  saveToDos(toDos);
};

const paintToDo = function (newTodo) {
  // create items
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  const checkBox = document.createElement('input');
  // Set attributes & class & id
  li.id = newTodo.id;
  // 드래그앤드롭을 위한 속성 추가
  li.setAttribute('draggable', 'true');
  li.classList.add('draggable', 'item');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.classList.add('todo-check');
  // Set innertext
  span.innerText = newTodo.text;
  button.innerText = '❌';
  // Add click listner to button
  button.addEventListener('click', function (e) {
    const correspondingItem = this.parentElement;
    deleteToDo(
      [...document.querySelectorAll('#todo-list .item')].indexOf(
        correspondingItem
      )
    );
    correspondingItem.remove();

    if (document.querySelectorAll('#todo-list li').length === 0) {
      noItem.classList.remove('hidden');
    }
  });
  // Add click listner to checkbox
  checkBox.addEventListener('click', function () {
    const correspondingItem = this.parentElement;
    const checked = this.checked;
    stateToDo(
      [...document.querySelectorAll('#todo-list .item')].indexOf(
        correspondingItem
      ),
      checked
    );
    checked
      ? correspondingItem.classList.add('checked')
      : correspondingItem.classList.remove('checked');
  });
  //
  li.appendChild(span);
  li.appendChild(button);
  li.prepend(checkBox);
  toDoList.appendChild(li);
  li.addEventListener('dragstart', dragStart);
  li.addEventListener('dragend', dragEnd);
};

const handleToDoSubmit = function (event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  if (newTodo !== '') {
    toDoInput.value = '';
    const toDos = !localStorage.getItem(TODOS_KEY)
      ? []
      : JSON.parse(localStorage.getItem(TODOS_KEY));
    const newTodoObj = {
      text: newTodo,
      isComplete: false,
      id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos(toDos);
    noItem.classList.add('hidden');
  }
};

toDoForm.addEventListener('submit', handleToDoSubmit);

//   const sayHello = function (item) {
//     console.log('This is a turn of', item);
//   };
//   item => console.log('This is a turn of', item)

// 로컬스토리지에 저장된 값 페이지 로드시 불러온 후 리스트 아이템 렌더링
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

// drag and drop -----------------------------------
document.getElementById('todo-list').addEventListener('dragover', dragOver);

function dragStart(e) {
  this.classList.add('dragging');
}

function dragOver(e) {
  e.preventDefault();
  // 드래그앤드롭 엘리먼트 위치 변경
  if (
    !e.target.classList.contains('dragging') &&
    e.target.classList.contains('item')
  ) {
    const draggingItem = document.querySelector('.dragging');
    const items = [...this.querySelectorAll('.item')];
    const currPos = items.indexOf(draggingItem);
    const newPos = items.indexOf(e.target);
    if (currPos > newPos) {
      this.insertBefore(draggingItem, e.target);
    } else {
      this.insertBefore(draggingItem, e.target.nextSibling);
    }

    // 드래그앤드롭 후 로컬스토리지에 변경된 순서로 데이터 다시 저장
    const toDos = JSON.parse(localStorage.getItem(TODOS_KEY));
    const removed = toDos.splice(currPos, 1);
    toDos.splice(newPos, 0, removed[0]);
    saveToDos(toDos);
  }
}

function dragEnd(e) {
  this.classList.remove('dragging');
}

// todo list가 없을 경우
const toDoListItems = document.querySelectorAll('#todo-list li');

if (toDoListItems.length === 0) {
  noItem.classList.remove('hidden');
}
