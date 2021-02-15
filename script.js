let allItems = [];
let valueInputFirst = '';
let valueInputSecond = 0;
let inputFirst = null;
let inputSecond = null;
let total = 0;
let firstField = null;
let secondField = null;
let imageField = null

window.onload = function init() {
  inputFirst = document.getElementById('input-first');
  inputSecond = document.getElementById('input-second');
  inputFirst.addEventListener('change', updateValFirst);
  inputSecond.addEventListener('change', updateValSecond);

  const sum = document.getElementById('sum');
  sum.innerText = `${total} ₽`;
  render();
}

const updateValFirst = (event) => {
  valueInputFirst = event.target.value;
};
const updateValSecond = (event) => {
  valueInputSecond = event.target.value;
};

const onclickButton = () => {
  allItems.push({
    textFirst: valueInputFirst,
    textSecond: valueInputSecond,
    isEdit: false,
    isEditFirst: false,
    isEditSecond: false
  });
  valueInputFirst = '';
  valueInputSecond = 0;
  inputFirst.value = '';
  inputSecond.value = '';
  render();
}

const render = () => {
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  const totalCalc = () => {
    total = 0;
    allItems.forEach(item => {
      total += +item.textSecond;
    })
    sum.innerText = `${total} ₽`;
  }

  allItems.map((item, index) => {

    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task-container';

    let countNum = document.createElement('p');
    countNum.className = 'countNum';

    countNum.innerText += (index + 1) + ')';

    if (item.isEdit === false) {
      firstField = document.createElement('p');
      firstField.className = 'firstField';
      firstField.innerText = item.textFirst;

      secondField = document.createElement('p');
      secondField.className = 'secondField';
      secondField.innerText = `${item.textSecond} ₽`;

      imageField = document.createElement('img');
      imageField.className = 'imageEdit';
      imageField.src = 'img/edit.svg';
      imageField.onclick = () => {
        item.isEdit = !item.isEdit;
        render();
        firstField.focus();
      }
    } else {
      firstField = document.createElement('input');
      firstField.className = 'firstFieldEdit';
      firstField.value = item.textFirst;
      firstField.type = 'text';
      firstField.disabled = false;

      secondField = document.createElement('input');
      secondField.className = 'secondFieldEdit';
      secondField.value = item.textSecond;
      secondField.type = 'number';
      secondField.disabled = false;

      imageField = document.createElement('img');
      imageField.className = 'imageDone';
      imageField.src = 'img/done.svg';
      imageField.onclick = () => {
        item.isEdit = !item.isEdit;
        render();
      }
    }

    if (item.isEditFirst === false) {
      firstField.ondblclick = () => {
        item.isEditFirst = !item.isEditFirst;
        render();
        firstField.focus();
      }
    } else {
      firstField = document.createElement('input');
      firstField.className = 'firstFieldEdit';
      firstField.value = item.textFirst;
      firstField.type = 'text';
      firstField.disabled = false;

      firstField.onblur = () => {
        item.isEditFirst = !item.isEditFirst;
        render();
      }
    }

    if (item.isEditSecond === false) {
      secondField.ondblclick = () => {
        item.isEditSecond = !item.isEditSecond;
        render();
        secondField.focus();
      }
    } else {
      secondField = document.createElement('input');
      secondField.className = 'secondFieldEdit';
      secondField.value = item.textSecond;
      secondField.type = 'number';
      secondField.disabled = false;

      secondField.onblur = () => {
        item.isEditSecond = !item.isEditSecond;
        render();
      }
    }

    firstField.onchange = (event) => {
      allItems[index].textFirst = event.target.value;
    }

    secondField.onchange = (event) => {
      allItems[index].textSecond = event.target.value;
    }

    const imageDelete = document.createElement('img');
    imageDelete.className = 'imageDelete';
    imageDelete.src = 'img/delete.svg';

    imageDelete.onclick = () => {
      onClickImageDelete(index);
    }

    totalCalc();

    container.appendChild(countNum);
    container.appendChild(firstField);
    container.appendChild(secondField);
    container.appendChild(imageField);
    container.appendChild(imageDelete);
    content.appendChild(container);
  })
}

const onClickImageDelete = (index) => {
  allItems.splice(index, 1);
  render();
  refreshSum();
}

const refreshSum = () => {
  total = 0;
  allItems.forEach(item => {
    total += +item.textSecond;
  })
  sum.innerText = `${total} ₽`;
}

