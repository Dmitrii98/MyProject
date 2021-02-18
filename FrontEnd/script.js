let allItems = [];
let valueInputFirst = '';
let valueInputSecond = 0;
let inputFirst = null;
let inputSecond = null;
let total = 0;
let firstField = null;
let secondField = null;
let imageField = null;

window.onload = async function init() {
  inputFirst = document.getElementById('input-first');
  inputSecond = document.getElementById('input-second');
  inputFirst.addEventListener('change', updateValFirst);
  inputFirst.addEventListener('focus', focusValFirst);
  inputSecond.addEventListener('change', updateValSecond);
  inputSecond.addEventListener('focus', focusValSecond);
  const sum = document.getElementById('sum');
  sum.innerText = `${total} ₽`;
  const resp = await fetch('http://localhost:8080/allItems', {
    method: 'GET'
  });
  let result = await resp.json();
  allItems = result.data;
  allItems.forEach(item => {
    item.isEdit = false
    item.isEditFirst = false
    item.isEditSecond = false
  })
  render();
};

const focusValFirst = () =>{
  inputFirst.className = 'input-first'
}
const focusValSecond = () =>{
  inputSecond.className = 'input-second'
}

const updateValFirst = (event) => {
  valueInputFirst = event.target.value;
};

const updateValSecond = (event) => {
  valueInputSecond = event.target.value;
};

const onclickButton = async () => {
  if (valueInputFirst === '' && valueInputSecond === 0) {
    inputFirst.className = 'invalidFirstInput';
    inputSecond.className = 'invalidSecondInput';
    return;
  } else if (valueInputFirst === '') {
    inputFirst.className = 'invalidFirstInput';
    return;
  } else if (valueInputSecond === 0){
    inputSecond.className = 'invalidSecondInput';
    return;
  }
  allItems.push({
    textFirst: valueInputFirst,
    textSecond: valueInputSecond,
  });
  const resp = await fetch('http://localhost:8080/createItem', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      textFirst: valueInputFirst,
      textSecond: valueInputSecond,
    })
  });
  let result = await resp.json();
  allItems = result.data;
  allItems.forEach(item => {
    item.isEdit = false
    item.isEditFirst = false
    item.isEditSecond = false
  })
  valueInputFirst = '';
  valueInputSecond = 0;
  inputFirst.value = '';
  inputSecond.value = '';

  render();
};

const render = () => {
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  };
  const totalCalc = () => {
    total = 0;
    allItems.forEach(item => {
      total += +item.textSecond;
    });
    sum.innerText = `${total} ₽`;
  };

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
      };
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
      };
    };

    if (item.isEditFirst === false) {
      firstField.ondblclick = () => {
        item.isEditFirst = !item.isEditFirst;
        render();
        firstField.focus();
      };
    } else {
      firstField = document.createElement('input');
      firstField.className = 'firstFieldEdit';
      firstField.value = item.textFirst;
      firstField.type = 'text';
      firstField.disabled = false;

      firstField.onblur = () => {
        item.isEditFirst = !item.isEditFirst;
        render();
      };
    };

    if (item.isEditSecond === false) {
      secondField.ondblclick = () => {
        item.isEditSecond = !item.isEditSecond;
        render();
        secondField.focus();
      };
    } else {
      secondField = document.createElement('input');
      secondField.className = 'secondFieldEdit';
      secondField.value = item.textSecond;
      secondField.type = 'number';
      secondField.disabled = false;

      secondField.onblur = () => {
        item.isEditSecond = !item.isEditSecond;
        render();
      };
    }
    ;

    firstField.onchange = async (event) => {
      allItems[index].textFirst = event.target.value;
      const response = await fetch('http://localhost:8080/updateItem', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          _id: allItems[index]._id,
          textFirst: allItems[index].textFirst
        })
      });
      let result = await response.json();
      allItems = result.data;
      allItems.forEach(item => {
        item.isEdit = false
        item.isEditFirst = false
        item.isEditSecond = false
      })
    };

    secondField.onchange = async (event) => {
      allItems[index].textSecond = event.target.value;
      const response = await fetch('http://localhost:8080/updateItem', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          _id: allItems[index]._id,
          textSecond: allItems[index].textSecond
        })
      });
      let result = await response.json();
      allItems = result.data;
      allItems.forEach(item => {
        item.isEdit = false
        item.isEditFirst = false
        item.isEditSecond = false
      })
    };

    const imageDelete = document.createElement('img');
    imageDelete.className = 'imageDelete';
    imageDelete.src = 'img/delete.svg';

    imageDelete.onclick = () => {
      onClickImageDelete(index);
    };

    totalCalc();

    container.appendChild(countNum);
    container.appendChild(firstField);
    container.appendChild(secondField);
    container.appendChild(imageField);
    container.appendChild(imageDelete);
    content.appendChild(container);
  });
};

const onClickImageDelete = async (index) => {
  const response = await fetch(`http://localhost:8080/deleteItem?id=${allItems[index]._id}`, {
    method: 'DELETE'
  });
  let result = await response.json()
  allItems = result.data;
  allItems.forEach(item => {
    item.isEdit = false
    item.isEditFirst = false
    item.isEditSecond = false
  })
  render();
  refreshSum();
};

const refreshSum = () => {
  total = 0;
  allItems.forEach(item => {
    total += +item.textSecond;
  });
  sum.innerText = `${total} ₽`;
};
