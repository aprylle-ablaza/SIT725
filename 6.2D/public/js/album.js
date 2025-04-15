const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const container = document.getElementById('album-content-container');

let editModalInstance;

document.addEventListener("DOMContentLoaded", async () => {
    const url = `http://localhost:3000/albums/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const album = data.album;

    // Set data-id globally
    container.dataset.id = id;

    // Display album details
    document.getElementById('album-title').textContent = album.album;
    document.getElementById('album-artist').textContent = album.artist;
    document.getElementById('album-year').textContent = album.year;

    const img = document.createElement('img');
    img.classList.add('album-img');
    img.src = album.album_cover_url;
    document.getElementById('card-album-cover').appendChild(img);

    // Pre-fill edit form
    document.getElementById('edit-album').value = album.album;
    document.getElementById('edit-artist').value = album.artist;
    document.getElementById('edit-year').value = album.year;
    document.getElementById('edit-album-cover').value = album.album_cover_url;

    M.updateTextFields();

    const modals = document.querySelectorAll('.modal');
    const instances = M.Modal.init(modals);
    editModalInstance = M.Modal.getInstance(document.getElementById('edit-form-modal'));
});

// Open edit modal
const editButton = document.getElementById('edit-button');
if (editButton) {
    editButton.addEventListener('click', () => {
        if (editModalInstance) editModalInstance.open();
    });
}

// Handle update (edit) form submission
const editForm = document.getElementById('edit-album-form');
if (editForm) {
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedAlbum = {
            album: document.getElementById('edit-album').value,
            artist: document.getElementById('edit-artist').value,
            year: document.getElementById('edit-year').value,
            albumCover: document.getElementById('edit-album-cover').value
        };

        const albumId = container.dataset.id;
        const response = await fetch(`/albums/${albumId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAlbum)
        });
        console.log(response);
        if (response.ok) {
            location.reload();
        } else {
            alert('Failed to update album.');
        }
    });
}

// Delete album
const deleteButton = document.getElementById('delete-button');
if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
        const albumId = container.dataset.id;
        const response = await fetch(`/albums/${albumId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            window.location.href = '/';
        } else {
            alert('Failed to delete the album.');
        }
    });
}
