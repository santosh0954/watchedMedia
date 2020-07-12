const form1 = document.getElementById('form1');
const title = document.querySelector('.title');
const type = document.querySelector('#type');
const year = document.querySelector('.year');
const network = document.querySelector('#network');
const form2 = document.getElementById('form2');
const output = document.getElementById('displayData');
const easy = new EasyHttp();
const easy2 = new EasyHttp();
const ui = new UI();
const watched = document.querySelector('#watched');
const watching = document.querySelector('#watching');
// Adding event for selection online or offline option 
window.addEventListener('online', () => network.selectedIndex = 0);
window.addEventListener('offline', () => network.selectedIndex = 1);


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
  ui.clearList();
  if(title.value === '') {
    ui.showAlert('title is important to search');
    return;
  }
  // console.log(title.value, type.value, year.value, network.value);
  if(network.value === 'online') {
    // console.log(`http://www.omdbapi.com/?apikey=e1f5a170&t=${title.value}&type=${type.value}&year=${year.value}&season=${season.value}`);
    easy2.getData(`//www.omdbapi.com/?apikey=e1f5a170&s=${title.value}&type=${type.value}&y=${year.value}`)
    .then((datas) => {
      if(datas.Response === 'True') {
        // console.log(datas);
        datas.Search.forEach(data => {
          // return console.log(data.imdbID);
          easy.getData(`//www.omdbapi.com/?apikey=e1f5a170&i=${data.imdbID}`)
          .then(data => {
            ui.createMovieList(data);
          });
        });
      }else {
        console.log('movie not found', datas.Response);
        ui.showAlert('Movie / Series not found');
        ui.clearList();
        ui.listChecked = document.querySelectorAll('.listChecked');
      }
    });
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
 
