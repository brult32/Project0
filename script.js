const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const itemDeletedSpan = document.getElementById('item-deleted')
const deletedItens = [];

function newTodo() {
  //alert('New TODO button clicked!')
  const newItem = newElement('li', null, classNames.TODO_ITEM, null);
  const itemCheckBox = newElement('input', 'checkbox', classNames.TODO_CHECKBOX, null);  
  itemCheckBox.onclick = function (e) {
    this.checked ? minusOne(uncheckedCountSpan) : addOne(uncheckedCountSpan);
  };
  const itemLabel = newElement('label', null, classNames.TODO_TEXT, 'New ToDo');
  itemLabel.setAttribute('for', itemCheckBox);
  itemLabel.onclick = function (e) {
    if(this.innerText !== ''){
      const changeText = newElement('input', 'text', classNames.TODO_TEXT, null);
      [changeText.value, this.innerText] = [this.innerText, ''];      
      const hideDelBtn = (bol) => this.parentNode.getElementsByClassName(classNames.TODO_DELETE)[0].hidden = bol;
      const textChange = () => {
        if (changeText.value == '') {changeText.value = '.....';}
        //if (changeText.value == 'del') {this.parentNode.remove();}
        this.innerText = changeText.value;
        hideDelBtn(false);
        this.removeChild(changeText);
      }
      changeText.addEventListener('focusout', (event) => { textChange();});
      changeText.addEventListener('keyup', (e) => { if (e.key == "Enter") { textChange();}});
      this.appendChild(changeText);
      hideDelBtn(true);
      changeText.focus();
      changeText.select();
    }
  };
  const itemDelete = newElement('button', 'button', classNames.TODO_DELETE, 'X');
  itemDelete.onclick = function (e) {
    addOne(itemDeletedSpan);
    minusOne(itemCountSpan);
    if (!this.parentNode.firstChild.checked) {minusOne(uncheckedCountSpan);}
    deletedItens.push(this.parentNode);
    this.parentNode.remove();
  };
  addOne(itemCountSpan);
  addOne(uncheckedCountSpan);
  newItem.appendChild(itemCheckBox);
  newItem.appendChild(itemLabel);
  newItem.appendChild(itemDelete);
  list.appendChild(newItem);
}

function newElement(elName, elType, elClass, elText) {
  let tempEl = document.createElement(elName);
  if (elType) {tempEl.setAttribute('type', elType); }   //overrides -- for nonGlobal atrb.
  if (elClass) {tempEl.className = elClass; }           //adds up   -- for global atrb.
  if (elText) {tempEl.innerText = elText;}
  return tempEl;
}

function addOne(displayText) { updateDisplay(displayText, 1);}

function minusOne(displayText) { updateDisplay(displayText, -1);}

function updateDisplay(displayText, n){
  displayText.innerText = Number(displayText.innerText) + n;
}