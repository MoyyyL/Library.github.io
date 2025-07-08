
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

//const lib = new manageLibrary();
//lib.addBook("the hobbit", "me", 198, "okay");


//* ---------------DOM management ------------------------
class DOMController {
    Library = new manageLibrary();
    
    formHandler() {
        const submit = document.querySelector("#send");
        submit.addEventListener("click", (e) => {
            e.preventDefault();
            const title = document.querySelector("#title");
            const author = document.querySelector("#author");
            const pages = document.querySelector("#pages");
            const summary = document.querySelector("#summary");

            
        })
    }
}