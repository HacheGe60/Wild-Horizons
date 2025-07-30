import http from 'node:http';

const server = http.createServer((req, res) => {
    res.end('Hello from Server');
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});