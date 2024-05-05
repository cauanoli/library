const library = [];

function Book({ title, author, pageNumber, isRead }) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.isRead = isRead;
}

function addBookToLibrary(bookInfo) {
  const book = new Book(bookInfo);

  library.push(book);
  updateLibrary();
}

function updateLibrary() {
  resetLibrary();
  renderLibrary();
}

function resetLibrary() {
  const booksTable = document.querySelector(".books-table");
  const books = booksTable.querySelectorAll(".book");

  books.forEach((book) => {
    booksTable.removeChild(book);
  });
}

function renderLibrary() {
  const booksTable = document.querySelector(".books-table");

  library.forEach((book) => {
    const newBookElement = createBookElement(book);
    booksTable.appendChild(newBookElement);
  });
}

function createBookElement(book) {
  const bookTemplate = document.querySelector("#book-template");
  const bookElement = bookTemplate.content.cloneNode(true);

  const title = bookElement.querySelector(".book__title");
  const author = bookElement.querySelector(".book__author");
  const pages = bookElement.querySelector(".book__pages");
  const status = bookElement.querySelector(".book__status");

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pageNumber;
  status.textContent = book.isRead ? "Read" : "Not Read";

  return bookElement;
}

const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

const addBookForm = addBookDialog.querySelector(
  ".add-book-dialog__form"
);

addBookForm.addEventListener("submit", (event) => {
  console.log(event);
  const formData = new FormData(event.target);
  const bookData = Object.fromEntries(formData.entries());

  addBookToLibrary(bookData);
});

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});
