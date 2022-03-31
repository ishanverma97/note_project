 
console.log("Welcome to notes app. This is app.js");
showNotes();/*for showing those notes which are already present*/

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");/*vo element jiska id addtxt hai usko lelia*/
  console.log(addTxt)
  let notes = localStorage.getItem("notes");/*we are asking for notes if already present*/
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); /*for converting string into javascript object*/
  }
  notesObj.push(addTxt.value); /*value of addtxt is pushed in notesObj*/
  localStorage.setItem("notes", JSON.stringify(notesObj));/*local storage understands only in terms of string, hence stringfy function*/
  addTxt.value = ""; /*we need a new blank space whereever notes are written*/
//   console.log(notesObj);
  showNotes();/*function for displaying already shown notes*/
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";/*html is a blank string*/
  notesObj.forEach(function(element, index) {
    html += ` 
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`; /*we want complete string in your notes, where all notes are saved*/
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
// for search operation

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;//for searching elements
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

