const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const bookGrid = document.querySelector('.book-grid');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const library = {
    books: [],
    appendBook: function(book) {
        this.books.push(book);
    },
    hasDuplicate: function(book) {
        const bookTitle = book.title.toLowerCase();

        for (let index in this.books) {
            if (this.books[index].title.toLowerCase() === bookTitle) {
                return true;
            }
        }

        return false;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault;

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const book = new Book(title, author, pages, read);
    const bookCardElement = createBookCardElement(book);

    if (!library.hasDuplicate(book)) {
        assignBookElementIndex(bookCardElement);
        addBookElementToDOM(bookCardElement);
        library.appendBook(book);
        form.reset();
        modal.classList.remove('active');
    } else {
        throw Error;
    }
});

function createBookCardElement(book) {
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

function assignBookElementIndex(bookCardElement) {
    const index = library.books.length

    bookCardElement.setAttribute('data', index);
}

function addBookElementToDOM(bookCardElement) {
    bookGrid.appendChild(bookCardElement);
}

function removeBookElementFromDOM(bookCardElement) {
    bookGrid.removeChild(bookCardElement);
}

addBookButton.addEventListener('click', () => {
    modal.classList.add('active');
});

overlay.addEventListener('click', () => {
    form.reset();
    modal.classList.remove('active');
});

