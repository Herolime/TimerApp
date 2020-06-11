import React from 'react';
import './App.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: props.minutes,
            speed: props.speed,
            ...initialState
        }
        this.interval = {};
        this.handleClick = this.handleClick.bind(this);
        this.playInterval = this.playInterval.bind(this);
        this.cancelInterval = this.cancelInterval.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.resetTimer) {
            const {minutes, speed, timerWasReset} = this.props;
            if (prevProps.speed !== speed && (minutes !== 0 && this.state.seconds !== 0)) {
                this.setState({speed: speed});
                this.cancelInterval();
                this.playInterval(speed);
            } else if (minutes !== this.state.minutes) {
                this.resetState();
                this.cancelInterval();
                this.setState({
                    minutes: minutes,
                    totalSeconds: minutes * 60
                });
                this.playInterval();
            }
            timerWasReset();
        }
        
    }

    handleClick(isPlaying) {
        if (isPlaying) {
            this.playInterval();
        } else {
            this.cancelInterval();
        }
    }

    playInterval(timerSpeed = this.state.speed) {
        this.setState({countingDown: true});
        this.interval = setInterval(() => {
            const { seconds, minutes, totalSeconds, elapsedTime} = this.state;

            if (minutes === 0 && seconds === 0) {
            this.resetState();
            this.setState({text: "Time's up!"})
            clearInterval(this.interval);
            }
            else {
                this.setState({
                    minutes: seconds === 0? minutes - 1 : minutes,
                    seconds: seconds === 0? 59 : seconds - 1,
                    halfwayThere: elapsedTime >= (totalSeconds / 2),
                    text: elapsedTime + 1 >= (totalSeconds / 2)? 'More than halfway there!' : '',
                    almostDone: (totalSeconds - elapsedTime) <= 20, 
                    elapsedTime: elapsedTime + 1
                });
            }
        }, (1000 / timerSpeed));
    }

    cancelInterval() {
        this.setState({countingDown: false});
        clearInterval(this.interval);
    }
    
    resetState() {
        this.setState({...initialState});
    }

    render() {
        const {text, almostDone, countingDown, totalSeconds, elapsedTime, minutes, seconds} = this.state; 
        return (
            <div className="Timer">
                {text? <p className="timerText"> {text}</p> : ''}
                    <div className="timerAndPlayback">
                        <h1 
                        style={{ ...countdownStyles, color: almostDone ? 'red': ''}}
                        className={countingDown && ((totalSeconds - elapsedTime) <= 10)? ' blink' : ''}>
                            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </h1>
                        <span className="playbackButton material-icons" onClick={() => this.handleClick(!countingDown)}>
                            {countingDown? 'pause_circle_outline' : 'play_circle_outline'}
                        </span>
                    </div>
            </div>
        );
    }
}

const initialState = {
    seconds: 0,
    countingDown: false,
    halfwayThere: false,
    almostDone: false,
    totalSeconds: 0,
    elapsedTime: 0,
    text: '',
};

const countdownStyles = {
    fontSize: '7em',
    margin: 0
}

export default Timer;