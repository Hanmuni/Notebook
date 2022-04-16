let titles = [];
let notes = [];

let trashCanTitles = [];
let trashCanNotes = [];

loadNotes();

function addNote() {

    let title = document.getElementById('title-input').value;
    let note = document.getElementById('note-input').value;

    titles.push(title);
    notes.push(note);

    showNote();

    saveNote('title', titles);
    saveNote('note', notes);
    
    document.getElementById('title-input').value = ``;
    document.getElementById('note-input').value = ``;
    
}

function showNote() {

    document.getElementById('note').innerHTML = ``;

    for (let i = 0; i < titles.length; i++) {

        document.getElementById('note').innerHTML += `
        <div class="note">
        
        <p class="note-message">
        <b> ${titles[i]} </b> 
        <br>
        ${notes[i]} 
        <button onclick="deleteNote(${i})" class="delete-btn"><img src="img/delete.png"></button>
        
        </p>
        
        </div>
        `;
    }

}



function deleteNote(i) {
    trashCanTitles.push(titles[i]);
    trashCanNotes.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);


    
    showNote();

    saveNote('title', titles);
    saveNote('note', notes);
    
    saveNote('trashCanTitle', trashCanTitles);
    saveNote('trashCanNote', trashCanNotes);
}

function trashCan() {

    document.getElementById('trashcan-note').innerHTML = ``;

    document.getElementById('trashcan-note').innerHTML = `
    <div class="close-btn"> 
    <button onclick="closeTrashCan()"> Schließen </button>
    </div>
    `;

    for (let i = 0; i < trashCanTitles.length; i++) {

        document.getElementById('trashcan-note').innerHTML += `    

        <div class="note">
        
        <p class="note-message">
        <b> ${trashCanTitles[i]} </b> 
        <br>
        ${trashCanNotes[i]} 
        
        </p>
        
        </div>
        `;
    }
}

function closeTrashCan() {

    document.getElementById('trashcan-note').innerHTML = ``;

}

function saveNote(key, array) {

    localStorage.setItem(key, JSON.stringify(array));

}

function getNote(key) {

    return JSON.parse(localStorage.getItem(key));
}

function loadNotes() {
    titles = getNote('title') || [];
    notes = getNote('note') || [];
    trashCanTitles = getNote('trashCanTitle') || [];
    trashCanNotes = getNote('trashCanNote') || [];
}