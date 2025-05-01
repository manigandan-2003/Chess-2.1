import PropTypes from 'prop-types';
import '../components/ComponentsCss/GameBoard.css';

const DecorativeBox = ({ children, onDrop, onDragOver, className, ...props }) => {
    return (
        <div
            className={`decorative-box ${className || ''}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            {...props}
        >
            {children}
        </div>
    );
};

DecorativeBox.propTypes = {
    children: PropTypes.node.isRequired,
    onDrop: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default DecorativeBox;
