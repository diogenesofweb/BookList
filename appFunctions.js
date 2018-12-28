// book obj
const newBook = (title, author, school) => {
  const id = Math.random();
  return { title, author, school, id };
};

// localStorage
const getBooks = () => {
  const books = localStorage.getItem("books");
  return books === null ? [] : JSON.parse(books);
};

const addBook = book => {
  const books = getBooks();
  localStorage.setItem("books", JSON.stringify([book, ...books]));
};

const removeBook = id => {
  const books = getBooks().filter(b => b.id != id);
  localStorage.setItem("books", JSON.stringify(books));
};

// UI section
const displayBooks = () => getBooks().forEach(b => addBookToList(b));

const addBookToList = book => {
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
};

const deleteBook = id => document.getElementById(id).remove();

const showAlert = (message, color) => {
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
};

const clearField = () => {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#school").value = "";
};

// display books
document.addEventListener("DOMContentLoaded", displayBooks());

// add book or not
document.querySelector("#form-book").addEventListener("submit", e => {
  e.preventDefault();
  const title = e.target[0].value,
    author = e.target[1].value,
    school = e.target[2].value;

  const succes = () => {
    const book = newBook(title, author, school);
    addBookToList(book);
    addBook(book);
    showAlert("Book added", "green");
    clearField();
  };

  const failure = () => {
    showAlert("All fields are required", "red");
  };

  title === "" || author === "" || school === "" ? failure() : succes();
});

// delete book
document.querySelector("#book-list").addEventListener("click", e => {
  const id = e.target.parentElement.parentElement.parentElement.id;
  deleteBook(id);
  removeBook(id);
  showAlert("Book deleted", "amber darken-4");
});
