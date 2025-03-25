const cards = document.getElementById('cards');
const btnAdd = document.getElementById('add-cards');
const btnReset = document.getElementById('reset');

let counter = 0;
const albums = [
    {
      "album": "Midnights",
      "artist": "Taylor Swift",
      "year": 2024,
      "recommended_song": "Anti-Hero",
      "description": "Taylor Swift's 'Midnights' delves into themes of self-reflection and personal growth, blending synth-pop sounds with introspective lyrics. The album showcases Swift's evolution as an artist, offering listeners a journey through her midnight thoughts.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png"
    },
    {
      "album": "Harry's House",
      "artist": "Harry Styles",
      "year": 2023,
      "recommended_song": "As It Was",
      "description": "In 'Harry's House,' Harry Styles crafts a warm and intimate atmosphere, combining elements of pop and rock. The album reflects on themes of love, identity, and personal experiences, highlighting Styles' versatility and growth as a musician.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/d/d5/Harry_Styles_-_Harry%27s_House.png"
    },
    {
      "album": "We Are",
      "artist": "Jon Batiste",
      "year": 2022,
      "recommended_song": "Freedom",
      "description": "Jon Batiste's 'We Are' is a vibrant celebration of Black culture, blending jazz, R&B, and soul. The album is a testament to Batiste's musical prowess and his ability to fuse various genres into a cohesive and uplifting experience.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/f/f9/Jon_Batiste_-_We_Are.png"
    },
    {
      "album": "Folklore",
      "artist": "Taylor Swift",
      "year": 2021,
      "recommended_song": "Cardigan",
      "description": "'Folklore' marks a departure from Taylor Swift's pop roots, embracing indie-folk and alternative styles. The album features storytelling lyrics and mellow melodies, offering a contemplative and intimate listening experience.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png"
    },
    {
      "album": "When We All Fall Asleep, Where Do We Go?",
      "artist": "Billie Eilish",
      "year": 2020,
      "recommended_song": "Bad Guy",
      "description": "Billie Eilish's debut album introduces a dark and experimental pop sound, characterized by whispery vocals and innovative production. The record explores themes of fame, mental health, and teenage angst, establishing Eilish as a distinctive voice in modern music.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png"
    },
    {
      "album": "SOS",
      "artist": "SZA",
      "year": 2024,
      "recommended_song": "Kill Bill",
      "description": "SZA's 'SOS' showcases her unique blend of R&B, hip-hop, and soul, with introspective lyrics and smooth melodies. The album delves into themes of love, heartbreak, and self-discovery, solidifying SZA's place in contemporary R&B.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_S.O.S.png"
    },
    {
      "album": "Endless Summer Vacation",
      "artist": "Miley Cyrus",
      "year": 2024,
      "recommended_song": "Flowers",
      "description": "Miley Cyrus's 'Endless Summer Vacation' captures the essence of self-empowerment and resilience, blending pop and rock elements. The album reflects on personal growth and independence, with 'Flowers' serving as an anthem of self-love.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/5/54/Miley_Cyrus_-_Endless_Summer_Vacation.png"
    },
    {
      "album": "World Music Radio",
      "artist": "Jon Batiste",
      "year": 2024,
      "recommended_song": "Worship",
      "description": "In 'World Music Radio,' Jon Batiste explores a fusion of global sounds, incorporating elements from various musical traditions. The album celebrates cultural diversity and unity, offering listeners a rich tapestry of rhythms and melodies.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/b/b7/Jon_Batiste_-_World_Music_Radio.png"
    },
    {
      "album": "Guts",
      "artist": "Olivia Rodrigo",
      "year": 2024,
      "recommended_song": "Vampire",
      "description": "Olivia Rodrigo's 'Guts' delves into the complexities of young adulthood, with raw and honest lyrics set against pop-rock instrumentation. The album captures the emotional turbulence of growing up, showcasing Rodrigo's songwriting prowess.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/0/03/Olivia_Rodrigo_-_Guts.png"
    },
    {
      "album": "The Record",
      "artist": "Boygenius",
      "year": 2024,
      "recommended_song": "Not Strong Enough",
      "description": "Boygenius's 'The Record' brings together the talents of Julien Baker, Phoebe Bridgers, and Lucy Dacus, resulting in a harmonious blend of indie rock and folk. The album explores themes of friendship, identity, and vulnerability, highlighting the trio's cohesive synergy.",
      "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/2/21/Boygenius_-_the_record.jpg"
    }
]

let shownAlbums = []

function randomNumberGenerator(max) {
    return Math.floor(Math.random() * max);
}
btnAdd.addEventListener('click', (e)=>{
    e.preventDefault();
    let num = randomNumberGenerator(albums.length);

    while (shownAlbums.includes(num)){
        num = randomNumberGenerator(albums.length);
    }
    if (counter < 3)
    {
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
        img.src = albums[num].album_cover_url;
        cardImage.appendChild(img);

        const title = document.createElement('span');
        title.classList.add('card-title');
        title.innerText = albums[num].album;
        cardImage.appendChild(title);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        const p = document.createElement('p');
        p.innerHTML = `<i>${albums[num].description}</i><br><b>Year: ${albums[num].year}</b>`
        cardContent.appendChild(p);


        card.appendChild(cardImage);
        card.appendChild(cardContent);
        col.appendChild(card)
        cards.appendChild(col)
        counter = counter + 1;
        shownAlbums.push(num);
    }
})

btnReset.addEventListener('click', (e)=>{
    e.preventDefault();
    counter = 0;
    cards.innerHTML = '';
    shownAlbums = [];
})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });