// components/Character.jsx
import PropTypes from 'prop-types';
import '../components/ComponentsCss/Character.css';

// Import images for Player A
import pawnAImg from '../assets/pawn.png';
import hero1AImg from '../assets/hero1.png';
import hero2AImg from '../assets/hero2.png';

// Import images for Player B
import pawnBImg from '../assets/pawnp2.png';
import hero1BImg from '../assets/hero1p2.png';
import hero2BImg from '../assets/hero2p2.png';

const Character = ({ type, player, position, onDragStart }) => {
    const getCharacterImage = () => {
        if (player === 'A') {
            switch (type) {
                case 'Pawn':
                    return pawnAImg;
                case 'Hero1':
                    return hero1AImg;
                case 'Hero2':
                    return hero2AImg;
                default:
                    return '';
            }
        } else if (player === 'B') {
            switch (type) {
                case 'Pawn':
                    return pawnBImg;
                case 'Hero1':
                    return hero1BImg;
                case 'Hero2':
                    return hero2BImg;
                default:
                    return '';
            }
        }
    };

    return (
        <div
            className="character"
            draggable
            onDragStart={(event) => onDragStart(event, position)}
        >
            <img src={getCharacterImage()} alt={`${player} ${type}`} />
        </div>
    );
};

Character.propTypes = {
    type: PropTypes.oneOf(['Pawn', 'Hero1', 'Hero2']).isRequired,
    player: PropTypes.oneOf(['A', 'B']).isRequired,
    position: PropTypes.string.isRequired,
    onDragStart: PropTypes.func.isRequired,
};

export default Character;
