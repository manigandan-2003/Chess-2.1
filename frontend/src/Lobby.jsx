import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Lobby = ({ socket }) => {
    const [roomId, setRoomId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const createRoom = () => {
        socket.emit('createRoom', (response) => {
            console.log('Create room response:', response);
            const { roomId, error } = response; // Removed player
            if (error) {
                setError(error);
            } else {
                navigate(`/game/${roomId}`);
            }
        });
    };
    
    const joinRoom = () => {
        if (!roomId) {
            setError('Please enter a Room ID');
            return;
        }
    
        socket.emit('joinRoom', roomId, (response) => {
            console.log('Join room response:', response);
            const { roomId, error } = response; // Removed player
            if (error) {
                setError(error);
            } else {
                navigate(`/game/${roomId}`);
            }
        });
    };

    return (
        <div>
            <button onClick={createRoom}>Create Room</button>
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
            />
            <button onClick={joinRoom}>Join Room</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

Lobby.propTypes = {
    socket: PropTypes.object.isRequired,
};

export default Lobby;
