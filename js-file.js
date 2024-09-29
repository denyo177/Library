
const myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.giveBookInfo = function() {
        let stringRead = "read";
        if(!this.read) stringRead = "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${stringRead}`;
    };
}

const hobbit = new Book("The Hobbit", "Tolkien", 299, false);
const breath = new Book("Breath", "James Nestor", 278, true);
const rule1 = new Book("Rule#1", "Phil Town", 413, true);

myLibrary.push(hobbit);
myLibrary.push(breath);
myLibrary.push(rule1);


function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead) {
    
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
}

 const bookContainer = document.querySelector(".bookContainer");


function displayLibrary() {
    while (bookContainer.firstChild) bookContainer.firstElementChild.remove();

    myLibrary.forEach((Book, i) => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        let bookInfo = document.createElement("p");
        bookInfo.id = "bookInfo";
        bookInfo.textContent = Book.giveBookInfo(); 
        bookCard.appendChild(bookInfo);
        bookCard.setAttribute("data-index", i);


        let button_reset = document.createElement("Button");
        button_reset.textContent = "Remove";
        button_reset.classList.add("resetButton");
        bookCard.appendChild(button_reset);

        let button_read = document.createElement("Button");
        if (Book.read) {
            button_read.textContent = "Not Read"
        }  else { 
            button_read.textContent = "Read"
        };
        button_read.classList.add("readButton");
        bookCard.appendChild(button_read);

        bookContainer.appendChild(bookCard);
        
    });

    const reset_buttons = document.getElementsByClassName("resetButton");

    Array.from(reset_buttons).forEach(function(res_button) {
        res_button.addEventListener("click", (event) => {
            myLibrary.splice(event.target.parentNode.dataset.index, 1);
            displayLibrary();
        });
    });

    const read_buttons = document.getElementsByClassName("readButton");

    Array.from(read_buttons).forEach(function(read_button) {
        read_button.addEventListener("click", (event) => {
            myLibrary[event.target.parentNode.dataset.index].toggleRead();
            displayLibrary();
        });
    });
}

function showForm() {
    document.getElementById("input-form").style.display = "block";
}


const submit_button = document.getElementById("submit-button");

submit_button.addEventListener("click", (event) => {
    
    event.preventDefault();

    const inp_title = document.getElementById("title").value;
    const inp_author = document.getElementById("author").value;
    const inp_pages = document.getElementById("pages").value;


    let haveRead = false;
    if (document.getElementById("read-yes").checked) haveRead = true;

    addBookToLibrary(inp_title, inp_author, inp_pages, haveRead);
    displayLibrary();

})

Book.prototype.toggleRead = function() {
    if (this.read) {
        this.read = false;
    } else if (!this.read) {
        this.read = true;
    } 
}








// s_button.addEventListener("click", (event) => {
//     console.log("hello test");
//     displayLibrary();
//     addBookToLibrary(title, author, pages, read);
//     event.preventDefault();
// })