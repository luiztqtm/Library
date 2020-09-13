let myLibrary = []
const addButton = document.getElementById('addButton');
const cancelButton = document.getElementById('cancelButton');
const bookList = document.querySelector('#bookList');
const submitButton = document.getElementById('add');
const form = document.getElementById('newbook-form');


addButton.addEventListener('click', showForm);
cancelButton.addEventListener('click', hideForm);
submitButton.addEventListener('click', submitBook);

bookList.onclick = e => {
    if(e.target.classList.contains('removeBtn')){
        removeBook(e);
    } else if (e.target.classList.contains('statusBtn')) {
        changeStatus(e);
    }
}

//OBJECT CONSTRUCTOR
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

Book.prototype.info = function (){
    let result =  `${this.title}. By ${this.author}, ${this.pages} pages`;
    return result;
}

Book.prototype.toggleStatus = function () {
    if (this.read == 'Read') {
        this.read = 'Not Read'; 
    } else if (this.read == 'Not Read') {
        this.read = 'Read'; 
    }
}

//FORM FUNCTIONS 

function showForm() {
    form.style.display="block"
}
function hideForm() {
    form.reset();
    form.style.display="none"
}

function submitBook(){
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    let newRead = document.getElementById('read').value;
    if (newTitle == ""|| newAuthor == "" || newPages == ""|| newRead == ""){
        alert('Form fields must be filled with valid data');
    } else {
        // let newBook = new Book(newTitle, newAuthor, newPages, newRead);
        // createBook(newBook);
        createBook(newTitle, newAuthor, newPages, newRead)
        form.reset()
    }
}

//LIBRARY DISPLAY
function renderLibrary() {
   bookList.innerHTML = " ";
   myLibrary.forEach(element => {
       updateLibrary(element)
})
}

function updateLibrary(element) {
    const listEntry = document.createElement('li');
    const index = myLibrary.indexOf(element);
    const newReadStatus = document.createElement('button');
    const newRemoveBtn = document.createElement('button');
    const lineBreak = document.createElement('br');

    listEntry.id = index;
    newReadStatus.setAttribute("class","statusBtn");
    newReadStatus.textContent = element.read;
    newRemoveBtn.setAttribute("class","removeBtn");
    newRemoveBtn.textContent = 'Remove';
    let text = document.createTextNode(element.info());
    listEntry.appendChild(text);
    listEntry.appendChild(lineBreak);
    listEntry.appendChild(newReadStatus);
    listEntry.appendChild(newRemoveBtn);
    bookList.appendChild(listEntry)
}

//ADD, REMOVE AND UPDATE FUNCTIONS

function createBook (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
    setStorage();
    renderLibrary();
}

function removeBook(e) {
    let index = e.target.parentNode.id;
    myLibrary.splice(index, 1);
    setStorage();
    renderLibrary();
}

function changeStatus(e) {
    let index = e.target.parentNode.id;
    myLibrary[index].toggleStatus();
    setStorage();
    renderLibrary();
}

// LOCAL STORAGE
function setStorage () {
    localStorage.setItem('mylibrary', JSON.stringify(myLibrary));
}

function loadStorage() {
    if (localStorage.getItem('mylibrary')){
        let storedLibrary = JSON.parse(localStorage.getItem('mylibrary'));
        storedLibrary.forEach((book) => createBook(book.title, book.author, book.pages, book.read))
    }
}

loadStorage();