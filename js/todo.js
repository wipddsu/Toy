const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

const saveToDos = function (toDos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

const deleteToDo = function (index) {
  const toDos = JSON.parse(localStorage.getItem(TODOS_KEY));
  toDos.splice(index, 1);
  // 노마드코더 방식
  // const li = e.target.parentElement;
  // li.remove();
  // toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  saveToDos(toDos);
};

const paintToDo = function (newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;
  // 드래그앤드롭을 위한 속성 추가
  li.classList.add('draggable', 'item');
  li.setAttribute('draggable', 'true');
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const button = document.createElement('button');
  button.innerText = '❌';
  button.addEventListener('click', function () {
    const correspondingItem = this.parentElement;
    deleteToDo(
      [...document.querySelectorAll('#todo-list .item')].indexOf(
        correspondingItem
      )
    );
    correspondingItem.remove();
  });
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  // addEventsDragAndDrop(li);
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
      id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos(toDos);
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
