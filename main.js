class Book {
<<<<<<< HEAD
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  toggleRead() {
    if (this.read === "on") {
      this.read = "off";
    } else {
      this.read = "on";
    }
=======
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
>>>>>>> b99efe416f13f65c1ef67f82460de8044f7ad99b
  }
}

class Library {
<<<<<<< HEAD
  #library = [];
  constructor() {}

  addBook(bookInfo, viewMode) {
    const book = new Book(
      bookInfo.title,
      bookInfo.author,
      bookInfo.pages,
      bookInfo.read,
      `${bookInfo.title + (this.length + 1)}`
    );
    this.#library.push(book);
    updateBookView(viewMode);
  }

  removeBook(id) {
    this.#library = this.#library.filter((book) => book.id !== id);
  }

  get length() {
    return this.#library.length;
  }

  get books() {
    return [...this.#library];
  }
}

const library = new Library();

function displayBooksAsTable() {
  const booksContainer = document.querySelector(".books-container");
  const booksTable = document.createElement("table");

  booksContainer.classList.remove("grid");
  booksContainer.classList.add("table");
  const tableHeader = document.createElement("tr");
  const titleHeader = document.createElement("th");
  const titleAuthors = document.createElement("th");
  const titlePages = document.createElement("th");
  const titleStatus = document.createElement("th");
  const titleActions = document.createElement("th");

  titleHeader.innerText = "Title";
  titleAuthors.innerText = "Authors";
  titlePages.innerText = "Pages";
  titleStatus.innerText = "Status";
  titleActions.innerText = "";

  [titleHeader, titleAuthors, titlePages, titleStatus, titleActions].forEach(
    (title) => {
      tableHeader.appendChild(title);
    }
  );
  booksTable.appendChild(tableHeader);

  library.books.forEach((book) => {
    const row = document.createElement("tr");

    Object.keys(book).forEach((key) => {
      if (key !== "id" && key !== "read") {
        const td = document.createElement("td");
        td.innerText = book[key];
        td.classList.add(key);
        row.appendChild(td);
        return;
      }

      if (key === "read") {
        const td = document.createElement("td");
        const readButton = document.createElement("button");
        readButton.innerText = `${book.read === "on" ? "Read" : "To read"}`;
        readButton.classList = "button read-button";
        readButton.addEventListener("click", () => {
          book.toggleRead();
          updateBookView("table");
        });

        if (book.read === "on") {
          row.classList.add("read");
        }

        td.appendChild(readButton);
        row.appendChild(td);
      }
    });

    const deleteButtonTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList = "button delete-button";
    deleteButton.addEventListener("click", () => {
      library.removeBook(book.id);
      updateBookView("table");
    });

    deleteButtonTd.appendChild(deleteButton);
    row.appendChild(deleteButtonTd);

    booksTable.appendChild(row);
  });

  booksContainer.appendChild(booksTable);
}

function displayBooksAsGrid() {
  const booksContainer = document.querySelector(".books-container");

  booksContainer.classList.remove("table");
  booksContainer.classList.add("grid");

  library.books.forEach((book) => {
    const bookCard = document.createElement("div");
    const title = document.createElement("h3");

    const bookInformation = document.createElement("p");
    const bookAuthor = document.createElement("span");
    const bookPages = document.createElement("span");

    const buttonsContainer = document.createElement("div");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    title.innerText = book.title;
    bookAuthor.innerText = `Author: ${book.author}`;
    bookPages.innerText = `Pages: ${book.pages}`;

    bookInformation.appendChild(bookAuthor);
    bookInformation.appendChild(bookPages);

    buttonsContainer.classList = "buttons-container";

    readButton.innerText = `${book.read === "on" ? "Read" : "To read"}`;
    readButton.classList = "button read-button";
    readButton.addEventListener("click", () => {
      book.toggleRead();
      updateBookView("grid");
    });

    deleteButton.innerText = "Delete";
    deleteButton.classList = "button delete-button";
    deleteButton.addEventListener("click", () => {
      library.removeBook(book.id);
      updateBookView("grid");
    });

    buttonsContainer.appendChild(readButton);
    buttonsContainer.appendChild(deleteButton);

    bookCard.classList = `book-card ${book.read === "on" ? "read" : ""}`;
    bookCard.appendChild(title);
    bookCard.appendChild(bookInformation);
    bookCard.appendChild(buttonsContainer);

    booksContainer.appendChild(bookCard);
  });
}

function updateBookView(viewMode) {
  const booksContainer = document.querySelector(".books-container");

  booksContainer.innerHTML = "";

  if (viewMode === "grid") {
    displayBooksAsGrid();
  }

  if (viewMode === "table") {
    displayBooksAsTable();
=======
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
>>>>>>> b99efe416f13f65c1ef67f82460de8044f7ad99b
  }
}

(function () {
<<<<<<< HEAD
  const addBookButton = document.querySelector(".add-book");
  const addBookModal = document.querySelector("dialog.add-book-dialog");
  const addBookForm = addBookModal.querySelector("form");
  const gridModeButton = document.querySelector(".grid-mode-button");
  const tableModeButton = document.querySelector(".table-mode-button");
  const booksContainer = document.querySelector(".books-container");

  const dialog = document.querySelector("dialog.add-book-dialog");
  dialog.querySelector("button.close-button").addEventListener("click", () => {
    dialog.close();
  });

  let viewMode = "grid";

  addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
  });

  addBookForm.addEventListener("submit", (event) => {
    let formData = new FormData(addBookForm);
    library.addBook(Object.fromEntries(formData), viewMode);
  });

  gridModeButton.addEventListener("click", (event) => {
    if (viewMode === "table") {
      tableModeButton.classList.remove("active");
      booksContainer.classList.remove("table");
      gridModeButton.classList.add("active");
      booksContainer.classList.add("grid");
      viewMode = "grid";
      updateBookView(viewMode);
    }
  });

  tableModeButton.addEventListener("click", (event) => {
    if (viewMode === "grid") {
      gridModeButton.classList.remove("active");
      booksContainer.classList.remove("grid");
      tableModeButton.classList.add("active");
      booksContainer.classList.add("table");
      viewMode = "table";
      updateBookView(viewMode);
    }
  });
=======
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
>>>>>>> b99efe416f13f65c1ef67f82460de8044f7ad99b
})();
