import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Lobby from '../src/Lobby';
import Game from '../src/Game';
import './App.css';
import '@radix-ui/themes/styles.css';

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            withCredentials: true, // Allow credentials (cookies)
            extraHeaders: {
                "my-custom-header": "abcd" // Example of passing custom headers
            }
        });

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Lobby socket={socket} />} />
                <Route path="/game/:roomId" element={<Game socket={socket} />} />
            </Routes>
        </Router>
    );
}

export default App;
