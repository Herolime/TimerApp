import React from 'react';
import './App.css';
import CountdownSetter from './CountdownSetter';
import Timer from './Timer';
import SpeedControls from './SpeedControls';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      speed: 1.0,
      resetTimer: false
    };
    
    this.handleCountdown = this.handleCountdown.bind(this);
    this.handleSpeed = this.handleSpeed.bind(this);
    this.timerWasReset = this.timerWasReset.bind(this);
  }

  handleCountdown(countdown) {
    this.setState({
      minutes: countdown ? countdown : 0,
      resetTimer: true
    });
  }

  handleSpeed(speed) {
    this.setState({speed: speed, resetTimer: true});
  }

  timerWasReset() {
    this.setState({resetTimer:false});
  }

  render() {
    const {minutes, speed, resetTimer} = this.state;
    return (
      <div className="App">
        <CountdownSetter handleCountdown={this.handleCountdown} />
        <Timer 
          minutes={minutes}
          speed={speed}
          timerWasReset={this.timerWasReset}
          resetTimer={resetTimer}
        />
        <SpeedControls 
          selected={speed}
          handleSpeed={this.handleSpeed}/>
  
      </div>
    ); 
  }
}

export default App;
