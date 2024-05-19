class Book {
  constructor({ title, author, pageNumber, status, id }) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.status = status;
    this.id = id;
  }

  static createBookId(book, library) {
    return `${book.title}-${library.length}`;
  }

  updateStatus() {
    this.status = !this.status;
  }
}

class Library {
  library = [];
  constructor() {}

  getLibrary() {
    return this.library;
  }

  addBookToLibrary(bookInfo) {
    const book = new Book({
      ...bookInfo,
      id: Book.createBookId(bookInfo, this.library),
    });
    this.library.push(book);
  }

  removeBookFromLibrary(bookId) {
    this.library = this.library.filter((book) => book.id !== bookId);
  }
}

class DisplayController {
  #booksTable = document.querySelector(".books-table");
  #bookTemplate = document.querySelector("#book-template");

  constructor(library) {
    this.library = library;
  }

  resetLibrary() {
    const books = this.#booksTable.querySelectorAll(".book");
    books.forEach((book) => {
      this.#booksTable.removeChild(book);
    });
  }

  renderLibrary() {
    this.library.getLibrary().forEach((book) => {
      const newBookElement = this.createBookElement(book);
      this.#booksTable.appendChild(newBookElement);
    });
  }

  updateLibrary() {
    this.resetLibrary();
    this.renderLibrary();
  }

  createBookElement(book) {
    const bookElement = this.#bookTemplate.content.cloneNode(true);
    const tr = bookElement.querySelector("tr");

    const title = bookElement.querySelector(".book__title");
    const author = bookElement.querySelector(".book__author");
    const pages = bookElement.querySelector(".book__pages");
    const statusButton = bookElement.querySelector(".book__status__button");
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
      this.library.removeBookFromLibrary(book.id);
      this.updateLibrary();
    });

    statusButton.addEventListener("click", () => {
      book.updateStatus();
      this.updateLibrary();
    });

    return bookElement;
  }
}

(function () {
  const library = new Library();
  const displayController = new DisplayController(library);

  const addBookDialog = document.querySelector(".add-book-dialog");
  const addBookButton = document.querySelector("#add-book-button");
  const addBookForm = addBookDialog.querySelector(".add-book-dialog__form");

  addBookForm.addEventListener("submit", (event) => {
    const formData = new FormData(event.target);
    const bookData = Object.fromEntries(formData.entries());

    library.addBookToLibrary(bookData);
    displayController.updateLibrary();
  });

  addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
  });

  displayController.renderLibrary(library);
})();
