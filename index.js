const  express = require('express'); 
const  cors = require('cors');
const app = express(); 
const morgan = require('morgan');
const port = 3000

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
app.post('/', (req, res) => {
    
    res.send({query:req?.query})
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



