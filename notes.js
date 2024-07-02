const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch (errorMsg) {
        return []
    }
}

const saveNotes = notes => {
    const stringNotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json', stringNotes)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    debugger
    const duplicateNote = notes.find(note => note.title === title)

    // const duplicateNotes = notes.filter(note => note.title === title) // Filtered just duplicates

    if (!duplicateNote) {
        notes.push({title: title, body: body})
        saveNotes(notes)
        const msg = chalk.green.inverse("New note added!")
        console.log(msg)
    } else {
        const msg = chalk.red.inverse("Note title taken!")
        console.log(msg)
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const foundNote = notes.find(note => note.title === title) // Filtered just duplicate note

    if (foundNote) {
        const idx = notes.indexOf(foundNote)
        const deleteCount = 1

        notes.splice(idx, deleteCount) // Removing note
        saveNotes(notes)

        const msg = chalk.green.inverse("Removed Note!")
        console.log(msg)

    } else {
        const msg = chalk.red.inverse("No note found!")
        console.log(msg)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    const message = chalk.inverse.white.underline("Your Notes");
    const logNote = note => console.log(note.title);
    // const logNote = function(note) { same as line above
    //     console.log(note.title)
    // }

    console.log(message)
    notes.forEach(logNote)
}

const readNote = title => {
    const notes = loadNotes()
    const foundNote = notes.find(note => note.title === title)
    if (foundNote) {
        console.log(chalk.inverse.white.underline(foundNote.title))
        console.log(foundNote.body)
    }
    else {
        const msgError = chalk.red.inverse("No note found!")
        console.log(msgError)
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}