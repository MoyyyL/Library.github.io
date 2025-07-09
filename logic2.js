
class Book {
    constructor (title, author, pages, summary) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._summary = summary;
        this._read = false; // calls read
        this._id = crypto.randomUUID(); // asigns an unique id
    };
    // title getter
    get title() {
        return this._title;
    }
    
    // author getter
    get author() {
        return this._author;
    }
    
    // pages getter
    get pages() {
        return this._pages;
    }

    // summary getter y setter
    get summary() {
        return this._summary;
    }

    // getter unique id
    get id() {
        return this._id;
    }

    // read Getter y setter
    get read() {
        return this._read;
    }
    set read(val) {
        return this._read = val;
    }
}

class manageLibrary {
    _library = [];

    get getLibrary() {
        return this._library;
    }

    addBook(title, author, pages, summary) {
        let nthBook = new Book(title, author, pages, summary);
        this._library.push(nthBook);
    }

    delBook(id) {
        const idx = this._library.findIndex(e => e.id === id);
        this._library.splice(idx, 1)
    }

    updateBook(val, id = this._library[0].id) {
        const idx = this._library.findIndex(e => e.id === id);
        this._library[idx].read = val;
        return "changed";
    }
}

//* ---------------DOM management ------------------------
class DOMController {
    Library = new manageLibrary();
    
    formHandler(event) {
        event.preventDefault();
        console.log("handled")

        const title = document.querySelector("#title")
        const author = document.querySelector("#author")
        const pages = document.querySelector("#pages")
        const summary = document.querySelector("#summary")

        const valTitle = title.value;
        const valAuthor = author.value;
        const valPages = pages.value;
        const valSummary = summary.value;
        
        this.Library.addBook(valTitle, valAuthor, valPages, valSummary)
        this.renderBook()
    }

    renderBook() {
        const actuallLibrary = this.Library.getLibrary;
        const table = document.querySelector(".library__books");
        const domBook = document.createElement("div");
        const button = document.createElement("button");
        
        domBook.classList.add("book");
        domBook.dataset.id = actuallLibrary[actuallLibrary.length - 1].id;        
        button.textContent = actuallLibrary[actuallLibrary.length - 1].title;
        
        domBook.appendChild(button);
        table.appendChild(domBook);
    }

    eraseBook(id) {
        this.Library.delBook(id);
        const table = document.querySelector(".library__books");
        const domDelBook = document.querySelector(`.book[data-id="${id}"]`)
        table.removeChild(domDelBook);
    }

    readBook(val, id) {
        this.Library.updateBook(val, id);
    }

    manageDialog(id) {
        const actuallLibrary = this.Library.getLibrary;
        const dialog = document.querySelector(".library__book-info");

        const specificBook = actuallLibrary.find(element => element.id === id);
        
        console.log(specificBook)
        const read = (specificBook.read === false) ? "Not Read" : "Read";
        
        dialog.innerHTML = `
                <button>X</button>
                
                <h3>Title:</h3>
                <p class="book-title">${specificBook.title}</p>
                
                <h3>Author:</h3>
                <p class="book-author">${specificBook.author}</p>
                
                <h3>Pages</h3>
                <p class="book-pages">${specificBook.pages}</p>
                
                <h3>Summary</h3>
                <p class="book-summary">${specificBook.summary}</p>
                
                <button class="book-read" data-id="${specificBook.id}">${read}</button>
                <button class="book-delete" data-id="${specificBook.id}">Delete</button>
            `;
        
        const delButton = document.querySelector(".book-delete");
        delButton.addEventListener("click", () => {
            this.eraseBook(delButton.dataset.id);
            dialog.close();
        })

        const readButton = document.querySelector(".book-read");
        readButton.addEventListener("click", () => {
            const value = !specificBook.read;
            this.readBook(value ,readButton.dataset.id)
            readButton.textContent = (specificBook.read === false) ? "Not read" : "Read";
            console.log(specificBook)
        })

        const closeButton = document.querySelector("button")
        closeButton.addEventListener("click", () => dialog.close())
        dialog.showModal();
    }
}
const control = new DOMController();

const submit = document.querySelector("#send");
submit.addEventListener("click", (e) => {
    control.formHandler(e);
});

const table = document.querySelector(".library__books");
table.addEventListener("click", (e) => {
    const bookElement = e.target.closest(".book");
    
    console.log(bookElement.dataset.id)

    if (bookElement) {
        control.manageDialog(bookElement.dataset.id);
    }
})