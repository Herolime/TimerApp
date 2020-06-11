import React, { useState } from 'react';
import './App.css';

const SpeedControls = props => {
    const [selected, setSelected] = useState(1.0);
    const [speedOptions] = useState([1.0, 1.5, 2.0]);
    const handleClick = option => {
        setSelected(option);
        props.handleSpeed(option);
    }
    const speedSettings = speedOptions.map(option => 
        <button 
            key={option}
            onClick={() => handleClick(option)}
            style={option === selected ? {...selectedStyles} : {...notSelectedStyles}}> {`${option}X`} </button>);
    console.log(selected);
    return (
        <div className="SpeedControls">
            {speedSettings}
        </div>
    );
}

const notSelectedStyles = {
    flex: 3,
    fontFamily: "'Nunito', 'Open Sans', sans-serif",
    margin: '0 0 0 1em',
    padding: '0 1em 0 1em',
    backgroundColor: 'transparent',
    color: 'black',
    borderRadius: 0,
    border: '2px solid black',
    fontSize: '12px',
    width: '55px',
    height: '25px'
}

const selectedStyles = {
    flex: 3,
    fontFamily: "'Nunito', 'Open Sans', sans-serif",
    margin: '0 0 0 1em',
    padding: '0 1em 0 1em',
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: 0,
    border: '2px solid black',
    fontWeight: 600,
    fontSize: '14px',
    width: '55px',
    height: '25px'
}

export default SpeedControls;
