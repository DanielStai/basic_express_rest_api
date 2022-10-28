import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    "publish_date": "2014-12-14",
    "publisher": "No Starch Press",
    "numOfPages": 472,
},
{
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "publish_date": "2012-07-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 252,
},
{
    "isbn": "9781449365035",
    "title": "Speaking JavaScript",
    "author": "Axel Rauschmayer",
    "publish_date": "2014-02-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 460,
}];

app.post('/book', (req, res)=>{
    const book = req.body

    console.log(book)
    books.push(book)
    res.send('Book added to database')
})

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res)=>{
    const isbn = req.params.isbn

    for (let book of books){
        if (book.isbn === isbn){
            res.json(book)
            return
        }
    }
    res.status(404).send('Book not found')
})

app.delete('/book/:isbn', (req, res)=>{
    const isbn = req.params.isbn

    books = books.filter(i =>{
        if (i.isbn != isbn){
            return true
        } 
        return false
    })
    res.send('Book has been deleted')
})


app.post('/book/:isbn', (req, res)=>{
    const isbn = req.params.isbn
    const newBook = req.body

    for(i=0; i<books.length; i++){
        let book = books[i]
        if (book.isbn === isbn){
            books[i] = newBook
        }
    }
    res.send('Book has been deleted')

})



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})


