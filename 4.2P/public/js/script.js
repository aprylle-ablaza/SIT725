const albumContainer = document.getElementById("albums")
const header = document.getElementById("heading")
document.addEventListener("DOMContentLoaded", async ()=>{
  const url = "http://localhost:3000/albums"
  const response = await fetch(url);
  const data = await response.json()
  const albums = data.albums;
  
  header.innerHTML = `There are ${albums.length} albums on this database. Feel free to add more.`
  albums.forEach(album => {
    const col = document.createElement('div')
    col.classList.add('col');
    col.classList.add('m4')
    col.classList.add('s12')

    const card = document.createElement('div')
    card.classList.add('card')
    card.style.color = 'black';

    const cardImage = document.createElement('div')
    cardImage.classList.add('card-image');
    const img = document.createElement('img')
    img.src = album.album_cover_url;
    cardImage.appendChild(img);

    const title = document.createElement('span');
    title.classList.add('card-title');
    title.innerText = album.album;
    cardImage.appendChild(title);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    const p = document.createElement('p');
    p.innerHTML = `<i>${album.artist}</i><br><b>Year: ${album.year}</b>`
    cardContent.appendChild(p);

    card.appendChild(cardImage);
    card.appendChild(cardContent);
    col.appendChild(card)
    
    albumContainer.appendChild(col)
  });
})

document.addEventListener("DOMContentLoaded", ()=>{
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
})
