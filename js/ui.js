class UI {
  constructor() {
    this.output = document.getElementById('displayData');
  }
  createMovieList(data) {
    // console.log(data);
    // console.log(data.totalSeasons);
      // console.log(data.Title, data.imdbId, data.Year, data.Type);
 
    data.totalSeasons === undefined ? data.totalSeasons = 1 : data.totalSeasons;
    this.output.innerHTML += `<li>
    <input type="checkbox" class="listChecked">
    <div class="row">
      <div class="col-3">
        <img src="${data.Poster}" alt="Movie/series Banner" class="banner">
      </div>
      <div class="col-9">
        <h2>${data.Title} <small> (${data.Year}) </small></h2>
        <div class="body">
          <p class="subtitle"><strong>Rating:</strong> ${data.imdbRating} |<strong> Released:</strong> ${data.Released} | <strong>Runtime:</strong> ${data.Runtime}</p>
          <p><strong>Genre:</strong> ${data.Genre} | <strong>Type:</strong> ${data.Type} </p>
          <p class="story"><strong>Story:</strong> ${data.Plot} </p>
          <hr>
          <p><strong>Total Season:</strong> ${data.totalSeasons} </p>

        </div>
      </div>
    </div>
  </li>`;
  this.listChecked = document.querySelectorAll('.listChecked');
  // console.log(this.listChecked);

}
  // get checked list 
  getList(listChecked) {
    return this.listChecked;
  }
   // alert notification 
   showAlert(message, type = false) {
    const className = type === false ? 'alert alert-danger' : 'alert alert-success';
    let alert = document.createElement('section');
    alert.className = className;
    alert.appendChild(document.createTextNode(message));
    document.body.prepend(alert);
    // removing the notification after 3sec 
    setTimeout(()=> {
      alert.remove();
    }, 3000);
  }
  clearList() {
    while(this.output.firstChild) {
      this.output.firstChild.remove();
    }
  }
}