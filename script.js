const myLibrary = [];

const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const bookGrid = document.querySelector('.book-grid');
let mouseDown = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

addBookButton.addEventListener('click', () => {
    modal.classList.add('active');
});

overlay.addEventListener('click', () => {
    modal.classList.remove('active');
});

form.addEventListener('submit', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const bookCard = createBookCard(title, author, pages, read);

    bookGrid.appendChild(bookCard);
    modal.classList.remove('active');
});

function createBookCard(title, author, pages, read) {
    const newBookCard = document.createElement('div');
    const titleElement = document.createElement('h4');
    const authorElement = document.createElement('h4');
    const pagesElement = document.createElement('h4');
    const buttonGroup = document.createElement('div');
    const readElement = document.createElement('button');
    const removeElement = document.createElement('button');
    const readValue = (read === 'on') ? 'Read' : 'Unread';

    titleElement.textContent = title;
    authorElement.textContent = author;
    pagesElement.textContent = pages;
    readElement.textContent = readValue;
    removeElement.textContent = 'Remove';

    newBookCard.classList.add('book-card');
    titleElement.classList.add('book-title');
    authorElement.classList.add('book-author');
    pagesElement.classList.add('pages');
    buttonGroup.classList.add('button-group');
    readElement.classList.add(readValue.toLowerCase());
    removeElement.classList.add('remove');

    buttonGroup.appendChild(readElement);
    buttonGroup.appendChild(removeElement);

    newBookCard.appendChild(titleElement);
    newBookCard.appendChild(authorElement);
    newBookCard.appendChild(pagesElement);
    newBookCard.appendChild(buttonGroup);

    return newBookCard;
}

