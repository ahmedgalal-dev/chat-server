import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log("new Web Socket client connected");

    ws.on('message', async (message) => {
        const jsonMessage = JSON.parse(message);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(jsonMessage));
            }
        })
    })
    ws.on('close', (e) => console.log('Client Disconnected', e.toString()));
})
server.listen(5000, () => console.log(`server listening at port ${5000}`));