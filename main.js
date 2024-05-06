let library = [];

function Book({ title, author, pageNumber, status, id }) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.status = status;
  this.id = id;
}

function createBookId(book) {
  return `${book.title}-${library.length}`;
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
    const bookId = book.title + library.length;
    const newBookElement = createBookElement(book, bookId);
    booksTable.appendChild(newBookElement);
  });
}

function updateLibrary() {
  resetLibrary();
  renderLibrary();
}

function addBookToLibrary(bookInfo) {
  const book = new Book({ ...bookInfo, id: createBookId(bookInfo) });
  library.push(book);

  updateLibrary();
}

function removeBookFromLibrary(bookId) {
  library = library.filter((book) => book.id !== bookId);
  updateLibrary();
}

function updateBookStatus(bookId) {
  let book = library.find((book) => book.id === bookId);
  book.status = !book.status;
  updateLibrary();
}

function createBookElement(book) {
  const bookTemplate = document.querySelector("#book-template");
  const bookElement = bookTemplate.content.cloneNode(true);
  const tr = bookElement.querySelector("tr");

  const title = bookElement.querySelector(".book__title");
  const author = bookElement.querySelector(".book__author");
  const pages = bookElement.querySelector(".book__pages");
  const statusButton = bookElement.querySelector(
    ".book__status__button"
  );
  const removeButton = bookElement.querySelector(
    ".book__remove-button__button"
  );

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pageNumber;

  if (book.status) {
    statusButton.textContent = "Read";
    statusButton.classList.add("read");
  } else {
    statusButton.textContent = "Not read";
    statusButton.classList.remove("read");
  }

  tr.dataset.id = book.id;

  removeButton.addEventListener("click", () => {
    removeBookFromLibrary(book.id);
  });

  statusButton.addEventListener("click", () => {
    updateBookStatus(book.id);
  });

  return bookElement;
}

const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector("#add-book-button");
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

renderLibrary();
