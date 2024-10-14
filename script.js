const myLibrary = [];

const addBookButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');

addBookButton.addEventListener("click", () => {
    modal.classList.add("active");
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

