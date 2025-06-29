//* FUNCTIONS -----------------------------------------------
let library = [];

// constructor de los objetos libro
function Book(id, title, author, pages, summary, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.summary = summary;
    this.read = read;
}

// Genera el id y asigna todos los valores al nuevo objeto libro
// Despues agrega el nuevo objeto libro al array
function addToLibrary(title = "", author = "", pages = 0, summary = "") {
    let id = crypto.randomUUID();
    let read = false;

    const nthBook = new Book(id, title, author, pages, summary, read)
    library.push(nthBook);
}

//todo FUNCION QUE VA A DESPLEGAR EL LIBRO EN LA UI
function displayBook(arrayElement) {
    
}



//! DIALOG ------------------------------------------------------

const dialog = document.querySelector(".library__book-info");
const showButton = document.querySelector(".book button");
const closeButton = document.querySelector(".library__book-info button");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});


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
    console.log(library);
})