import React from 'react';

const Button = ({size, tColor}) => {
    let fontSize = `${size}px`;
    let color = `${tColor}`;
    return (
        <button style={{fontSize, color}}>
            Click me
        </button>
    );
}

export default Button;