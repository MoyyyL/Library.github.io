const theHobbit = new Book(1, "The Hobbit", "J.R.R Tolkien", 295, "pretty ass book tbh",false);
let library = [theHobbit];

//* FORM --------------------------------------------------
// GETTING DATA
const Title = document.querySelector("#title");
const Author = document.querySelector("#author");
const Pages = document.querySelector("#pages");
const Summary = document.querySelector("#summary");

// SEND BUTTON
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

//* DIALOG ------------------------------------------------------
const dialog = document.querySelector(".library__book-info");

// FUNCIONALIDADES AL PRIMER LIBRO
const showButton = document.querySelector(".book button");
showButton.addEventListener("click", () => {
    dialog_book_buttons(library[0]);
    dialog.showModal();
})

// BOTON DE CERRADO PARA EL DIALOG
const closeButton = document.querySelector(".library__book-info button");
closeButton.addEventListener("click", () => {
    dialog.close();
})

// BOTON COMPARTIDO DE LEIDO
const readButton = document.querySelector(".book-read"); // selecciona el boton en el DOM
readButton.addEventListener("click", () => {
    const button_id = readButton.dataset.id; // Extrae el id del objeto
    let asd = library.find((element) => element.id == button_id); // compara los id del array con el propio y retorna el objeto
    if (asd.read === false) { // edita el contenido y valor del objeto
        asd.read = true;
        readButton.textContent = "read";
    }
    else if (asd.read === true) {
        asd.read = false;
        readButton.textContent = "unread";
    }
});

// BOTON ELIMINAR
const deleteButton = document.querySelector(".book-delete"); //selecciona delete buton en el DOM
deleteButton.addEventListener("click", () => {
   const delButton_id = deleteButton.dataset.id; // extrae su ID
   const elpepe = document.querySelector(".library__books") // selecciona el elemento padre
   const tilin = document.querySelector(`.book[data-id = "${delButton_id}"]`); // selecciona el elemento .book a eliminar
   elpepe.removeChild(tilin); // lo remueve
   
   let delIDX = library.findIndex((element) => element.id == delButton_id);
   library.splice(delIDX, 1); // lo elimina del array
   dialog.close();
});

//* FUNCTIONS -----------------------------------------------

// GENERA ID, CREA EL OBJETO, AGREGA AL ARRAY
function addToLibrary(title = "", author = "", pages = 0, summary = "") {
    let id = crypto.randomUUID();
    let read = false;

    const nthBook = new Book(id, title, author, pages, summary, read)
    library.push(nthBook);
}

// CONSTRUCTOR de los objetos libro
function Book(id, title, author, pages, summary, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.summary = summary;
    this.read = read;
}

// SELECCIONA EL LIBRO MAS RECIENTE
function array_books() {
    const last = library[library.length - 1];
    displayBook(last);
}

// SELECCIONA DOM, AGREGA EL LIBRO AL DOM, ASIGNA FUNCION A LOS BOTONES
function displayBook(lastBook) { // lastbook is the array element
    const name = lastBook.title;
    const library_books = document.querySelector(".library__books"); //father
    const book_div = document.createElement("div"); //son
    const book_button = document.createElement("button");

    book_button.textContent = name; //title of the book
    book_div.classList.add("book");
    book_div.appendChild(book_button);
    book_div.dataset.id = lastBook.id; // giving ID to the div .book
    
    library_books.appendChild(book_div);

    book_button.addEventListener("click", () => {
        dialog_book_buttons(lastBook);
    })
}

// EDITS THE DIALOG WITH THE INFO OF THE PRESSED BOOK
function dialog_book_buttons(element) {
    // selecciona el DOM
    const innerDialog = document.querySelector(".library__book-info");

    const book_title = document.querySelector(".book-title");
    const book_author = document.querySelector(".book-author");
    const book_pages = document.querySelector(".book-pages");
    const book_summary = document.querySelector(".book-summary");

    //Edita el DOM
    book_title.textContent = element.title;
    book_author.textContent = element.author;
    book_pages.textContent = element.pages;
    book_summary.textContent = element.summary;

    //Asigna id del elemento al boton y asigna valor inicial
    const book_read = document.querySelector(".book-read");
    book_read.dataset.id = element.id;
    book_read.textContent = (element.read == false) ? "unread" : "read"; 

    // Asigna el mismo id al .book
    const book_delete = document.querySelector(".book-delete");
    book_delete.dataset.id = element.id;

    innerDialog.showModal();
}