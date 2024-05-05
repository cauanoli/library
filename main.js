const library = [
  new Book({
    title: "something",
    pageNumber: 12321,
    author: "s",
    isRead: false,
  }),
];

function Book({ title, author, pageNumber, isRead }) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.isRead = isRead;
}

function addBookToLibrary(bookInfo) {
  const book = new Book(bookInfo);

  library.push(book);
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

  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(pages);
  bookElement.appendChild(status);

  return bookElement;
}

const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});
