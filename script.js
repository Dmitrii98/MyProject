let allItems = [];
let valueInputFirst = '';
let valueInputSecond = 0;
let inputFirst = null;
let inputSecond = null;
let total = 0;

window.onload = function init() {
  inputFirst = document.getElementById('input-first');
  inputSecond = document.getElementById('input-second');
  inputFirst.addEventListener('change', updateValFirst);
  inputSecond.addEventListener('change', updateValSecond);

  const sum = document.getElementById('sum');
  sum.innerText = total;
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
    sum.innerText = total;
  }

  allItems.map((item, index) => {

    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task-container';

    let countNum = document.createElement('p');
    countNum.className = 'countNum';

    countNum.innerText += (index + 1) + ')';

    const whereSpent = document.createElement('p');
    whereSpent.className = 'whereSpent';
    whereSpent.innerText = item.textFirst;

    const expencese = document.createElement('p');
    expencese.className = 'expencese';
    expencese.innerText = item.textSecond;

    expencese.onchange = function (event) {
      allItems[index].textSecond = event.target.value;
    }

    const imageEdit = document.createElement('img');
    imageEdit.className = 'imageEdit';
    imageEdit.src = 'img/edit.svg';

    const imageDelete = document.createElement('img');
    imageDelete.className = 'imageDelete';
    imageDelete.src = 'img/delete.svg';

    imageDelete.onclick = () => {
      onClickImageDelete(whereSpent, expencese)
    }

    imageEdit.onclick = () => {
      onClickImageEdit()
    }

    totalCalc();

    container.appendChild(countNum);
    container.appendChild(whereSpent);
    container.appendChild(expencese);
    container.appendChild(imageEdit);
    container.appendChild(imageDelete);
    content.appendChild(container);
  })
}

const onClickImageDelete = (index) => {
  allItems.splice(index, 1)
  render()
}

const onClickImageEdit = (firstInput, secondInput) => {

}