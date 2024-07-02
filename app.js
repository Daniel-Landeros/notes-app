// process.argv = [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\DEV\\node-course\\notes-app\\app.js',
//     'add',
//     '--title=note1',
//     '--body=body1'
// ]
const chalk = require('chalk')
const yargs = require('yargs')
const notesUtils = require("./notes.js")


// Customize yargs version
yargs.version("1.1.0")

// create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notesUtils.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: "remove",
    describe: "Remove note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notesUtils.removeNote(argv.title)
    }
})

yargs.command({
    command: "list",
    describe: "List of all notes",
    handler() {
        notesUtils.listNotes()
    }
})

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notesUtils.readNote(argv.title)
    }
})


// console.log(process.argv)
// console.log(yargs.argv)

yargs.parse()