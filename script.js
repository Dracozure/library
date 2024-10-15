const myLibrary = [];

const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
let mouseDown = 0;

addBookButton.addEventListener('click', () => {
    modal.classList.add('active');
});

overlay.addEventListener('click', () => {
    modal.classList.remove('active');
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

