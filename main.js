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
    bookInfo.title,
    bookInfo.author,
    bookInfo.pages,
    bookInfo.read,
    `${bookInfo.title + (library.length + 1)}`
  );
  library.push(book);
  updateBookView(viewMode);
}

function removeBookFromLibrary(id) {
  library = library.filter((book) => book.id !== id);
}

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

  library.forEach((book) => {
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
      removeBookFromLibrary(book.id);
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
  const gridModeButton = document.querySelector(".grid-mode-button");
  const tableModeButton = document.querySelector(".table-mode-button");
  const booksContainer = document.querySelector(".books-container");

  let viewMode = "grid";

  addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
  });

  addBookForm.addEventListener("submit", (event) => {
    let formData = new FormData(addBookForm);
    addBookToLibrary(Object.fromEntries(formData), viewMode);
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
})();
