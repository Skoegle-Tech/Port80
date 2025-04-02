const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const morgan = require('morgan');
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.post('/', (req, res) => {
    res.send({ query: req?.query });
});

app.post('/run', (req, res) => {
    let { command } = req.body;

    // OS-specific command handling
    if (process.platform === 'win32') {
        command = command.replace(/\b(ls)\b/g, 'dir'); // Replace 'ls' with 'dir'
        command = command.replace(/\b(cat)\b/g, 'type'); // Replace 'cat' with 'type'
    }

    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        return res.json({ stdout, stderr });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
