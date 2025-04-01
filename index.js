const  express = require('express'); 
const  cors = require('cors');
const app = express(); 
const morgan = require('morgan');
const port = 80 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.get('/', (req, res) => {
    
    res.send({query:req?.query})
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



