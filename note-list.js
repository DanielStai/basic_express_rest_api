const setEditModal = (noteid) => {
    // Get information about the book using isbn
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/note/${noteid}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title,
        author,
        content,
    } = note;

    // Filling information about the book in the form inside the modal
    document.getElementById('noteid').value = noteid;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('content').value = content;

    // Setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/note/${noteid}`;
}

const deleteNote = (noteid) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/note/${noteid}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

const loadNotes = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:4000/notes", false);
    xhttp.send();
    const notes = JSON.parse(xhttp.responseText)

    for (let note of notes) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${note.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${note.noteid}</h6>

                        <div>Author: ${note.author}</div>
                        <div>Content: ${note.content}</div>
                        <div>Date Created: ${note.date_created}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editNoteModal" onClick="setEditModal(${note.noteid})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('notes').innerHTML = document.getElementById('notes').innerHTML + x;
    }
}

loadNotes();