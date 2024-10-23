const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const bookGrid = document.querySelector('.book-grid');

const library = {
    books: [],
    assignBookElementIndex: function(bookCardElement) {
        const index = this.books.length

        bookCardElement.setAttribute('data', index);
    },
    addBookElement: function(bookCardElement) {
        this.books.push(bookCardElement);
    }
}

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
    const bookCardElement = createBookCardElement(new Book(title, author, pages, read));

    library.assignBookElementIndex(bookCardElement);
    library.addBookElement(bookCardElement);
    bookGrid.appendChild(bookCardElement);
    modal.classList.remove('active');
});

createBookCardElement = function(book) {
    const bookCardElement = document.createElement('div');
    const titleElement = document.createElement('h4');
    const authorElement = document.createElement('h4');
    const pagesElement = document.createElement('h4');
    const buttonGroup = document.createElement('div');
    const readElement = document.createElement('button');
    const removeElement = document.createElement('button');
    const readValue = (book.read === 'on') ? 'Read' : 'Unread';

    titleElement.textContent = book.title;
    authorElement.textContent = book.author;
    pagesElement.textContent = book.pages;
    readElement.textContent = readValue;
    removeElement.textContent = 'Remove';

    bookCardElement.classList.add('book-card');
    titleElement.classList.add('book-title');
    authorElement.classList.add('book-author');
    pagesElement.classList.add('pages');
    buttonGroup.classList.add('button-group');
    readElement.classList.add(readValue.toLowerCase());
    removeElement.classList.add('remove');

    buttonGroup.appendChild(readElement);
    buttonGroup.appendChild(removeElement);

    bookCardElement.appendChild(titleElement);
    bookCardElement.appendChild(authorElement);
    bookCardElement.appendChild(pagesElement);
    bookCardElement.appendChild(buttonGroup);

    return bookCardElement;
}

