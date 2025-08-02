import http from 'node:http';
import { getDataFromDB } from './database/db.js';

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB();

    /*
    Challenge:
      1. Store our data in a const ‘destinations’.
      2. When a GET request is received to the ‘/api' endpoint, send our JSON stringified data.
        Think: What changes will you need to make to get this to work?
    */

    if (req.url === '/api' && req.method === 'GET') {
        res.end(JSON.stringify(destinations));
    }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
