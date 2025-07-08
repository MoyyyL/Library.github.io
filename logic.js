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

// DEFAULT FUNCTIONS FOR THE DEFAULT BOOK
const showButton = document.querySelector(".book button");
showButton.addEventListener("click", () => {
    dialog_book_buttons(library[0]);
    dialog.showModal();
})

// CLOSE DIALOG
const closeButton = document.querySelector(".library__book-info button");
closeButton.addEventListener("click", () => {
    dialog.close();
})

// READ / UNREAD BUTTON
const readButton = document.querySelector(".book-read");
readButton.addEventListener("click", () => {
    const button_id = readButton.dataset.id; // GETS THE CURRENT ID OF THE BUTTON
    let asd = library.find((element) => element.id == button_id); // COMPARES THE ARRAYS IDS WITH OWN
    if (asd.read === false) { // CHANGES THE VALUE AND TEXTCONTENT
        asd.read = true;
        readButton.textContent = "read";
    }
    else if (asd.read === true) {
        asd.read = false;
        readButton.textContent = "unread";
    }
});

// DELETE BUTTON
const deleteButton = document.querySelector(".book-delete");
deleteButton.addEventListener("click", () => {
   const delButton_id = deleteButton.dataset.id; // GETS THE CURRENT ID
   const elpepe = document.querySelector(".library__books") // SELECTS WHERE WE APPEND THE BOOKS (THE FATHER DIV)
   const tilin = document.querySelector(`.book[data-id = "${delButton_id}"]`); // SELECTS THE CURRENT BOOK.ELEMENT (THE SON DIV)
   elpepe.removeChild(tilin); // REMOVES
   
   let delIDX = library.findIndex((element) => element.id == delButton_id);
   library.splice(delIDX, 1); // REMOVES FROM THE ARRAY
   dialog.close();
});

//* FUNCTIONS -----------------------------------------------

// GENERATES ID, CREATES THE BOOK OBJECT AND PUSHES IN THE ARRAY
function addToLibrary(title = "", author = "", pages = 0, summary = "") {
    let id = crypto.randomUUID();
    let read = false;

    const nthBook = new Book(id, title, author, pages, summary, read)
    library.push(nthBook);
}

// CONSTRUCTOR OF BOOKS
//class Book {
    constructor (id, title, author, pages, summary, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.summary = summary;
        this.read = read;
    }
}
// SELECTS THE LAST BOOK IN ARRAY AND CALL FUNCTION
function array_books() {
    const last = library[library.length - 1];
    displayBook(last);
}

// DISPLAY THE BOOK IN THE DOM
function displayBook(lastBook) { // lastBook is the array element
    const name = lastBook.title;
    const library_books = document.querySelector(".library__books");
    const book_div = document.createElement("div");
    const book_button = document.createElement("button");

    book_button.textContent = name; //title of the book
    book_div.classList.add("book");
    book_div.appendChild(book_button);
    book_div.dataset.id = lastBook.id; // giving ID to the div .book
    
    library_books.appendChild(book_div);

    book_button.addEventListener("click", () => {
        dialog_book_buttons(lastBook); // asigning functionality to the buttons
    })
}

// EDITS THE DIALOG WITH THE INFO OF THE PRESSED BOOK
function dialog_book_buttons(element) {
    const innerDialog = document.querySelector(".library__book-info");

    const book_title = document.querySelector(".book-title");
    const book_author = document.querySelector(".book-author");
    const book_pages = document.querySelector(".book-pages");
    const book_summary = document.querySelector(".book-summary");

    book_title.textContent = element.title;
    book_author.textContent = element.author;
    book_pages.textContent = element.pages;
    book_summary.textContent = element.summary;

    //asigns id and initial value to the read-button
    const book_read = document.querySelector(".book-read");
    book_read.dataset.id = element.id;
    book_read.textContent = (element.read == false) ? "unread" : "read"; 

    // asigns id to the delete-button
    const book_delete = document.querySelector(".book-delete");
    book_delete.dataset.id = element.id;

    innerDialog.showModal();
}