let library = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.toggleRead = function () {
  if (this.read === "on") {
    this.read = "off";
  } else {
    this.read = "on";
  }
};

function addBookToLibrary(bookInfo, viewMode) {
  const book = new Book(
    ...Object.values(bookInfo),
    `${bookInfo.title + (library.length + 1)}`
  );
  library.push(book);
  updateBookView(viewMode);
}

function removeBookFromLibrary(id) {
  library = library.filter((book) => book.id !== id);
}

function displayBooksAsTable() {}

function displayBooksAsGrid() {
  const booksContainer = document.querySelector(".books-container");

  library.forEach((book) => {
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
    bookPages.innerText = `Pages: ${book.author}`;

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
      removeBookFromLibrary(book.id);
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
  }
}

(function () {
  const addBookButton = document.querySelector(".add-book");
  const addBookModal = document.querySelector("dialog.add-book-dialog");
  const addBookForm = addBookModal.querySelector("form");
  let viewMode = "grid";

  addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
  });

  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(addBookForm);
    addBookToLibrary(Object.fromEntries(formData), viewMode);
  });
})();
