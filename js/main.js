// =============>> HTML Elements
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteURL");
var bookForm = document.getElementById("bookform");
var btnSubmit = document.getElementById("btn-submit");
var bookInfoContainer = document.getElementById("Bookinfo");
var alertOverlay = document.getElementById("validationAlert");
var closeBtn = document.querySelector(".close-btn");

//  =============>> App variable
// local storage
if (localStorage.getItem("books") !== null) {
    var booksList = JSON.parse(localStorage.getItem("books"));
    displayBooks();
} else {
    var booksList = [];
}

// ###(Regex)
var nameRegex = /^[A-Za-z0-9]{3,}$/;
var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
//   =============>> function
// create
btnSubmit.addEventListener("click", function () {
    var isValid =
        validate(nameRegex, siteNameInput) && validate(urlRegex, siteUrlInput);
    if (isValid === true) {
        var book = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        };
        booksList.push(book);
        localStorage.setItem("books", JSON.stringify(booksList));
        displayBooks();
        resetValue()
    } else {
        showAlert();
    }
});
//Read
function displayBooks() {
    var cartona = ``;
    for (var i = 0; i < booksList.length; i++) {
        cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${booksList[i].name}</td>
        <td>
        <button type="button" class=" btn btn-visit"><a href="${booksList[i].url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a>
        </button>
        </td>
        <td>
        <button type="button" class="btn btn-delete" onclick="deleteBook(${i})"><i class="fa-solid fa-trash"></i>Delete</button>
        </td>
        </tr>
        `
    }
    bookInfoContainer.innerHTML = cartona;
}
//validation
function validate(regex, input) {
    if (regex.test(input.value)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
//Delete
function deleteBook(index) {
    booksList.splice(index, 1);
    displayBooks();
    localStorage.setItem("books", JSON.stringify(booksList));
}

//alert
function showAlert() {
    alertOverlay.classList.remove("d-none");
}
closeBtn.addEventListener("click", function () {
    alertOverlay.classList.add("d-none");
});
// clear inputs
function resetValue() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}