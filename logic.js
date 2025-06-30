//* FUNCTIONS -----------------------------------------------
let library = [];

// CONSTRUCTOR de los objetos libro
function Book(id, title, author, pages, summary, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.summary = summary;
    this.read = read;
}

// GENERA ID, CREA EL OBJETO, AGREGA AL ARRAY
function addToLibrary(title = "", author = "", pages = 0, summary = "") {
    let id = crypto.randomUUID();
    let read = false;

    const nthBook = new Book(id, title, author, pages, summary, read)
    library.push(nthBook);
}

// SELECCIONA DOM, AGREGA EL LIBRO AL DOM, ASIGNA FUNCION A LOS BOTONES
function displayBook(name) {
    const library_books = document.querySelector(".library__books");
    const book_div = document.createElement("div");
    const book_button = document.createElement("button");

    book_div.classList.add("book");
    book_button.textContent = name;
    book_div.appendChild(book_button);
    
    library_books.appendChild(book_div);

//todo  FUNCION QUE ASIGNE EL SHOWMODA, ELIMINAR Y LEIDO/NO LEIDO EN EL DIALOG
    book_button.addEventListener("click", () => {
        dialog.showModal();
    })
}

// SELECCIONA EL LIBRO MAS RECIENTE
function array_books() {
    const last = library[library.length - 1];
    displayBook(last.title);
}

//! DIALOG ------------------------------------------------------
// FUNCIONALIDADES AL PRIMER LIBRO
const dialog = document.querySelector(".library__book-info");
const showButton = document.querySelector(".book button");
showButton.addEventListener("click", () => {
    dialog.showModal();
})

// BOTON DE CERRADO PARA EL DIALOG
const closeButton = document.querySelector(".library__book-info button");
closeButton.addEventListener("click", () => {
    dialog.close();
})

//! CHAMBA ------------------------------------------------------


//* GETTING DATA -----------------------------------------------
const Title = document.querySelector("#title");
const Author = document.querySelector("#author");
const Pages = document.querySelector("#pages");
const Summary = document.querySelector("#summary");

//* SIGNAL -----------------------------------------------
const submit = document.querySelector("#send")
submit.addEventListener("click", (event) => {
    event.preventDefault();

    let valTitle = Title.value;
    let valAuthor = Author.value;
    let valPages = Pages.value;
    let valSummary = Summary.value;

    addToLibrary(valTitle, valAuthor, valPages, valSummary);
    array_books();
})