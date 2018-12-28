class Store {
  static getBooks() {
    const books = localStorage.getItem("books");
    return books === null ? [] : JSON.parse(books);
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Store.getBooks().filter(b => b.id != id);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

class Book {
  constructor(title, author, school) {
    this.title = title;
    this.author = author;
    this.school = school;
    this.id = Math.random();
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(b => UI.addBookToList(b));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.id = book.id;
    row.innerHTML = `
      <th>${book.title}</th>
      <th>${book.author}</th>
      <th>${book.school}</th>
      <th>
        <a class="btn-floating btn-small red"><i class="material-icons del">delete_forever</i></a>
      </th>
    `;
    list.appendChild(row);
  }

  static deleteBook(id) {
    document.getElementById(id).remove();
  }

  static showAlert(message, color) {
    const div = document.createElement("div");
    div.className = "row center alert";
    div.innerHTML = `
    <div class="input-field col s12 m10 offset-m1">
      <div class="collection">
        <a href="#!" class="collection-item active ${color}">${message}</a>
      </div>
    </div>
    `;
    const container = document.querySelector(".container");
    const form = document.querySelector("#form-book");
    container.insertBefore(div, form);
    //alert disappears after 2 sec
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#school").value = "";
  }
}

// display books
document.addEventListener("DOMContentLoaded", UI.displayBooks());

// add book
document.querySelector("#form-book").addEventListener("submit", e => {
  e.preventDefault();
  // console.log(e.target[0].value);
  const title = e.target[0].value,
    author = e.target[1].value,
    school = e.target[2].value;

  if (title === "" || author === "" || school === "") {
    UI.showAlert("All fields are required", "red");
  } else {
    const newBook = new Book(title, author, school);
    UI.addBookToList(newBook);
    Store.addBook(newBook);
    UI.showAlert("Book added", "green");
    UI.clearField();
  }
});

// delete book
document.querySelector("#book-list").addEventListener("click", e => {
  const id = e.target.parentElement.parentElement.parentElement.id;
  // console.log(id);
  UI.deleteBook(id);
  Store.removeBook(id);
  UI.showAlert("Book deleted", "amber darken-4");
});
