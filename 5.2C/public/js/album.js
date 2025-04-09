const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.addEventListener("DOMContentLoaded", async ()=>{
    const url = `http://localhost:3000/albums/${id}`
    const response = await fetch(url);
    const data = await response.json()
    const album = data.album;
    document.getElementById('album-title').textContent = album.album;
    document.getElementById('album-artist').textContent = album.artist;
    document.getElementById('album-year').textContent = album.year;
    
    const img = document.createElement('img');
    img.classList.add('album-img')
    img.src = album.album_cover_url;
    document.getElementById('card-album-cover').appendChild(img);
})

document.addEventListener("DOMContentLoaded", ()=>{
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  })