import React, { useState } from 'react';
import './App.css';

const CountdownSetter = props => {
    const [countdown, setCountdown] = useState(props.countdown);
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = event => {
        const {value} = event.target;
        handleErrors(value);
        setCountdown(value);
    }
    const handleErrors = inputValue => {
        const toNumber = Number.parseInt(inputValue);
        if (formErrors.length > 0) {
            const errorRemover = error => {
                const index = formErrors.indexOf(error);
                formErrors.splice(index, 1);
            };
            for (const error of formErrors) {
                if (!error.includes('positive')) {
                    if (Number.isInteger(toNumber) || !inputValue.includes('.')) {
                        errorRemover(error);
                    }
                } else {
                    if (inputValue > 0) {
                        errorRemover(error);
                    }
                }
            }
        } 
        if (!Number.isInteger(toNumber) || inputValue.includes('.')) {
            if (!formErrors.find(err => !err.includes('positive'))) {
                formErrors.push('Timer only accepts Intergers.');
            }
        }
        if (toNumber <= 0) {
            if (!formErrors.find(err => err.includes('positive'))){
                formErrors.push('Timer only accepts positive Intergers.') 
            }
        }
        setFormErrors(formErrors);
    }
    const handleClick = () => {
        if (formErrors.length > 0) {
            return;
        }
        props.handleCountdown(countdown);
    }

    return (
        <div className="CountdownSetter">
          <form  className="countdownForm" onSubmit={event => event.preventDefault()}>
            <label>
              Countdown:
            <input
              type="number"
              name="countdown"
              placeholder="(min)"
              className="countdownInput"
              value={countdown}
              onChange={handleChange} />
            </label>
            <button onClick={handleClick} className="countdownButton"> START </button>
          </form>
          {formErrors.map(error => <p style={{color: 'red'}}> {error} </p>)}
        </div>
    );
} 

export default CountdownSetter;
