const filterBtn = document.getElementById('filter');

filterBtn.addEventListener('click', handleFilter);

function handleFilter(e) {
  const toDoListItems = document.querySelectorAll('#todo-list li');

  if (!e.currentTarget.classList.contains('on')) {
    e.currentTarget.classList.add('on');

    toDoListItems.forEach(function (item) {
      if (item.classList.contains('checked')) {
        item.classList.add('hidden');
      }
    });
  } else {
    e.currentTarget.classList.remove('on');
    toDoListItems.forEach(function (item) {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden');
      }
    });
  }
}
