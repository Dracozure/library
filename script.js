const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const bookGrid = document.querySelector('.book-grid');
const titleInput = document.getElementById('title');
const duplicateWarn = document.querySelector('.duplicate-warn');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const library = new class {
    constructor() {
        this.books = [];
    }

    appendBook(book) {
        this.books.push(book);
    }

    hasDuplicate(book) {
        const bookTitle = book.title.toLowerCase();

        for (let index in this.books) {
            if (this.books[index].title.toLowerCase() === bookTitle) {
                return true;
            }
        }

        return false;
    }

    removeBook(bookTitle) {
        let bookIndex = 0;

        this.books.forEach(book => {
            if (book.title === bookTitle) {
                this.books.splice(bookIndex, 1);
                return;
            }

            bookIndex++;
        });
    }

    toggleRead(bookTitle) {
        this.books.forEach(book => {
            if (book.title === bookTitle) {
                book.read = book.read ? false : true;
                return;
            }
        });
    }

    createBookCardElement(book) {
        const bookCardElement = document.createElement('div');
        const titleElement = document.createElement('h4');
        const authorElement = document.createElement('h4');
        const pagesElement = document.createElement('h4');
        const buttonGroup = document.createElement('div');
        const readElement = document.createElement('button');
        const removeElement = document.createElement('button');
        const readValue = book.read ? 'Read' : 'Unread';
    
        titleElement.textContent = book.title;
        authorElement.textContent = book.author;
        pagesElement.textContent = `Pages: ${book.pages}`;
        readElement.textContent = readValue;
        removeElement.textContent = 'Remove';
    
        bookCardElement.classList.add('book-card');
        titleElement.classList.add('book-title');
        authorElement.classList.add('book-author');
        pagesElement.classList.add('pages');
        buttonGroup.classList.add('button-group');
        readElement.classList.add('read-button', readValue.toLowerCase());
        removeElement.classList.add('remove');
    
        buttonGroup.appendChild(readElement);
        buttonGroup.appendChild(removeElement);
    
        bookCardElement.appendChild(titleElement);
        bookCardElement.appendChild(authorElement);
        bookCardElement.appendChild(pagesElement);
        bookCardElement.appendChild(buttonGroup);
    
        return bookCardElement;
    }

    addBookRemoveListener(bookElement) {
        const removeButton = bookElement.querySelector('.remove');
    
        removeButton.addEventListener('click', () => {
            removeBook(bookElement.querySelector('.book-title').textContent);
            bookGrid.removeChild(bookElement);
        });
    }

    addToggleReadListener(bookElement) {
        const readButton = bookElement.querySelector('.read-button');
    
        readButton.addEventListener('click', () => {
            const readCurrent = Array.from(readButton.classList)[1];
            const readOpposite = (readCurrent === 'read') ? 'Unread' : 'Read';
    
            toggleRead(bookElement.querySelector('.book-title').textContent);
            readButton.classList.remove(readCurrent);
            readButton.classList.add(readOpposite.toLowerCase());
            readButton.textContent = readOpposite;
        });
    }
    
    addBookElementToDOM(bookCardElement) {
        bookGrid.appendChild(bookCardElement);
    }
    
    removeBookElementFromDOM(bookCardElement) {
        bookGrid.removeChild(bookCardElement);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault;

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const book = new Book(title, author, pages, read);
    const bookCardElement = library.createBookCardElement(book);

    if (!library.hasDuplicate(book)) {
        library.addBookRemoveListener(bookCardElement);
        addToggleReadListener(bookCardElement);
        addBookElementToDOM(bookCardElement);
        library.appendBook(book);
        form.reset();
        modal.classList.remove('active');
    } else {
        duplicateWarn.classList.add('active');
    }
});

titleInput.addEventListener('input', () => {
    duplicateWarn.classList.remove('active');
});

addBookButton.addEventListener('click', () => {
    modal.classList.add('active');
});

overlay.addEventListener('click', () => {
    form.reset();
    modal.classList.remove('active');
    duplicateWarn.classList.remove('active');
});

