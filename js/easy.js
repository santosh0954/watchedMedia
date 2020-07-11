class EasyHttp {
  getData(url) {
    return fetch(url).then(res => res.json()).then(data => data).catch(err => console.log(err.message));
  }
}