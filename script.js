const myLibrary = [];

const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
let mouseDown = 0;

addBookButton.addEventListener("click", () => {
    modal.classList.add("active");
});

modal.addEventListener("mousedown", (event) => {
    mouseDown = 1;
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

