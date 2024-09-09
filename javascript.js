const myLibrary = [new Book("The Hobbit", "J.R.R. Tolkien", 295, "No")];
const booksContainer = document.querySelector('.books-container');

const newBookBtn = document.querySelector('.new-book-btn');
const newBookForm = document.querySelector('.new-book-form');

const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');
const readSelect = document.querySelector('.read-select');
const submitBtn = document.querySelector('.submit-button');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
    }
}

const displayForm = () => {
    newBookBtn.classList.toggle('hidden');
    newBookForm.classList.toggle('hidden');
}

const displayBooks = () => {
    booksContainer.innerHTML = '';
    let bookCounter = 0;
    myLibrary.forEach(book => {
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        bookInfo.setAttribute('data-index', bookCounter);

        const titleInfo = document.createElement('div');
        titleInfo.textContent = `Title: ${book.title}`;
        const authorInfo = document.createElement('div');
        authorInfo.textContent = `Author: ${book.author}`;
        const pagesInfo = document.createElement('div');
        pagesInfo.textContent = `Pages: ${book.pages}`;
        const readInfo = document.createElement('div');
        readInfo.textContent = `Read: ${book.read}`;

        const readBtn = document.createElement('button');
        readBtn.classList.add('read-btn');
        readBtn.textContent = "Read / Not Read";

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn')
        removeBtn.textContent = "Remove";

        const infoCardArr = [titleInfo, authorInfo, pagesInfo, readInfo, readBtn, removeBtn]; 
        infoCardArr.forEach(info => bookInfo.appendChild(info));
        
        booksContainer.appendChild(bookInfo);
        bookCounter++;
    });
}

const addBookToLibrary = (e) => {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readSelect.value;
    
    if (title && author && pages) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        console.log(myLibrary);
    }

    displayBooks();
    e.preventDefault();
}

const toggleRead = (targetNode) => {
    const book = myLibrary[targetNode.parentNode.getAttribute('data-index')];
    book.read === "No" ? book.read = "Yes" : book.read = "No";
    displayBooks();
}

const removeBookFromLibrary = (targetNode) => {
    if(targetNode.classList.contains('remove-btn')) {
        myLibrary.splice(targetNode.parentNode.getAttribute('data-index'), 1);
        displayBooks();
    }
}

displayBooks();

newBookBtn.addEventListener('click', displayForm);
submitBtn.addEventListener('click', addBookToLibrary);
booksContainer.addEventListener('click', (e) => toggleRead(e.target));
booksContainer.addEventListener('click', (e) => removeBookFromLibrary(e.target));
