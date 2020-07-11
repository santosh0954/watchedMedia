const form1 = document.getElementById('form1');
const title = document.querySelector('.title');
const type = document.querySelector('#type');
const year = document.querySelector('.year');
const network = document.querySelector('#network');
const form2 = document.getElementById('form2');
const output = document.getElementById('displayData');
const easy = new EasyHttp();
const ui = new UI();
const watched = document.querySelector('#watched');
const watching = document.querySelector('#watching');


//
// ─── ADDING EVENT LISTENER ──────────────────────────────────────────────────────
//

document.addEventListener('DOMContentLoaded', function() {
  form1.addEventListener('submit', loadData);
  form2.addEventListener('submit', sendData);
});
// Load Data function 
function loadData(e) {
  e.preventDefault();
  let search = '';
  if(title.value === '') {
    ui.showAlert('title is important to search');
    return;
  }
  // console.log(title.value, type.value, year.value, network.value);
  if(network.value === 'online') {
    // console.log(`http://www.omdbapi.com/?apikey=e1f5a170&t=${title.value}&type=${type.value}&year=${year.value}&season=${season.value}`);
    easy.getData(`//www.omdbapi.com/?apikey=e1f5a170&t=${title.value}&type=${type.value}&year=${year.value}`)
    .then(data => ui.createMovieList(data));
    // list now active so storing in variable
    return;
  }
  console.log('Your are using offline version');
  
}
//Send data function
function sendData(e) {
  // console.log(ui.getList().length);
    e.preventDefault();
    // console.log('send data working');
    if(!watched.checked) {
      if(watching.value === '') {
        ui.showAlert('watching no is required');
      }

    }else {
      ui.showAlert('watched is checked');
    }

  }
  // console.log(listChecked);
watched.addEventListener('change', function() {
  // console.log(typeof ui.getList() === 'undefined');
  if(typeof ui.getList() === 'undefined' ){
    ui.showAlert('No Media to select');
    this.checked = false;
  }else if (ui.getList().length === 0) {
    ui.showAlert('No Media to select');
    this.checked = false;
  
  }else if(this.checked) {
    this.checked = true;
    watching.setAttribute('disabled', true);
    watching.type = 'text';
    watching.value = 'disabled';
    // console.log(watching.value);
  }else {
    watching.type = 'number';
    watching.value = '';
    watching.removeAttribute('disabled');
  }
});
 
