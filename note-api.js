import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

let notes = [{
    noteid: '1',
    title: 'First Note',
    author: 'Daniel Stai',
    content: 'This is my very first note ever',
    date_created: '2022/10/28'
  },
  {
    noteid: '2',
    title: 'Second Note',
    author: 'Jack Sparrow',
    content: 'This is my second note',
    date_created: '2022/10/28'
  },
  {
    noteid: '3',
    title: 'Third Note',
    author: 'Aegon Targaryen',
    content: 'This is my second note',
    date_created: '2022/10/28'
    
  }

];

app.post('/note', (req, res)=>{
    const note = req.body

    console.log(note)
    notes.push(note)
    res.send('Note added to notebook')
})

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.get('/note/:noteid', (req, res)=>{
    const noteid = req.params.noteid

    for (let note of notes){
        if (note.noteid === noteid){
            res.json(note)
            return
        }
    }
    res.status(404).send('Note not found')
})

app.delete('/note/:noteid', (req, res)=>{
    const noteid = req.params.noteid

    notes = notes.filter(i =>{
        if (i.noteid != noteid){
            return true
        } 
        return false
    })
    res.send('Note has been deleted')
})


app.post('/note/:noteid', (req, res)=>{
    const noteid = req.params.noteid
    const newNote = req.body

    for(i=0; i<notes.length; i++){
        let note = notes[i]
        if (note.isbn === isbn){
            notes[i] = newNote
        }
    }
    res.send('Note has been edited')

})



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})


