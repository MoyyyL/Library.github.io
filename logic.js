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

//!--------------------------------------------------------------------------
// SELECCIONA DOM, AGREGA EL LIBRO AL DOM, ASIGNA FUNCION A LOS BOTONES
function displayBook(lastBook) {
    const name = lastBook.title;
    const library_books = document.querySelector(".library__books"); //father
    const book_div = document.createElement("div"); //son
    const book_button = document.createElement("button");

    book_div.classList.add("book");
    book_button.textContent = name;
    book_div.appendChild(book_button);
    
    library_books.appendChild(book_div);

    book_button.addEventListener("click", () => {
        //                  book-object, father, son
        dialog_book_buttons(lastBook, library_books, book_div);
    })
}

// SELECCIONA EL LIBRO MAS RECIENTE
function array_books() {
    const last = library[library.length - 1];
    displayBook(last);
}

// EDITS THE DIALOG WITH THE INFO OF THE PRESSED BOOK
function dialog_book_buttons(element, father, son) {
    const innerDialog = document.querySelector(".library__book-info");

    const book_title = document.querySelector(".book-title");
    const book_author = document.querySelector(".book-author");
    const book_pages = document.querySelector(".book-pages");
    const book_summary = document.querySelector(".book-summary");
    const book_read = document.querySelector(".book-read");
    const book_delete = document.querySelector(".book-delete");

    book_title.textContent = element.title;
    book_author.textContent = element.author;
    book_pages.textContent = element.pages;
    book_summary.textContent = element.summary;

    book_read.addEventListener("click", () => {
        if (element.read === false) {
            element.read = true;
            book_read.textContent = "Read";
        }
        else if (element.read === true) {
            element.read = false;
            book_read.textContent = "Not read"
        }
    })

    book_delete.addEventListener("click", () => {
        innerDialog.close();
        father.removeChild(son);
    })

    innerDialog.showModal();
}

//* DIALOG ------------------------------------------------------
const dialog = document.querySelector(".library__book-info");

// FUNCIONALIDADES AL PRIMER LIBRO
const showButton = document.querySelector(".book button");
showButton.addEventListener("click", () => {
    dialog.showModal();
})

// BOTON DE CERRADO PARA EL DIALOG
const closeButton = document.querySelector(".library__book-info button");
closeButton.addEventListener("click", () => {
    dialog.close();
})

//* FORM --------------------------------------------------
// GETTING DATA
const Title = document.querySelector("#title");
const Author = document.querySelector("#author");
const Pages = document.querySelector("#pages");
const Summary = document.querySelector("#summary");

// SIGNAL
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