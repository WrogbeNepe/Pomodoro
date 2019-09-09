import React from 'react';
import CSS from './App.css';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 250,
      workTime: 1500,
      seconds: 1500,
      timerId: false,
      active: 'workTime'
    }

    this.playStop = this.playStop.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  
  updateTime() {
    this.setState(function(prevState, props) {
      const currentState = Object.assign(prevState);
      const stillActive = (prevState.seconds - 1) > 0;
      const nextTimer = prevState.active === 'workTime' ? 'breakTime' : 'workTime'

      currentState.seconds = stillActive ? currentState.seconds - 1 : currentState[nextTimer];
      currentState.active = stillActive ? currentState.active : nextTimer;
      if (this.timerID) {
        currentState.timerId = this.timerID;
      }
      return currentState;
    });
  }

  
  playStop() {
      if (this.state.timerId) {
        clearInterval(this.state.timerId);
        return this.setState({
          seconds: this.state.workTime,
          timerId: false,
          active: 'workTime'
        });
      }

      this.timerID = setInterval(() => this.updateTime(), 1000)
    }
    
  updateLength(timer, e) {
    if (this.state.timerId) {
      return false;
    }

    const state = Object.assign({}, this.state);
    state[timer] = e.target.value * 60;
    state.seconds = timer === 'workTime' ? e.target.value * 60 : state.seconds
    this.setState(state);
  }
  render() {
    const buttonString = this.state.timerId ? 'Stop' : 'Start';
    return (
      <div className="app">

        <Time active={this.state.active} seconds={this.state.seconds} />
        <Button action={this.playStop}>{buttonString}</Button>
        <Option value={this.state.workTime} timer="workTime" updateLength={this.updateLength.bind(this)}>Minutes of work</Option>
        <Option value={this.state.breakTime} timer="breakTime" updateLength={this.updateLength.bind(this)}>Minutes of break</Option>
      </div>
    )
  }
}

class Option extends React.Component {
  onChange (e) {
    e.preventDefault();
    this.props.updateLength(this.props.timer, e)
  }

  convertToMinutes (seconds) {
    return Math.floor(seconds / 60);
  }

  render() {
    return (
      <label className="input-group">
      {this.props.children}
      <input className="input-group__input" type="number" min="1" step="1" placeholder="Insert minutes" onChange={this.onChange.bind(this)} value={this.convertToMinutes(this.props.value)} />
      </label>
    )
  }
}

const Button = (props) => <button className="btn" onClick={props.action}>{props.children}</button>

class Time extends React.Component {
  twoDigits(num) {
    return num > 9 ? "" + num : "0" + num;
  }

  convertToHrMnSc(seconds) {
    const hr = this.twoDigits(Math.floor(seconds / 3600));
    const min = this.twoDigits(Math.floor((seconds % 3600) / 60));
    const sec = this.twoDigits(Math.floor(seconds % 3600 % 60));
    return `${hr}:${min}:${sec}`;
  };

  render() {
    let remainingTime = this.convertToHrMnSc(this.props.seconds);
    let activeTimer = this.props.active === 'workTime' ? 'It\'s time to work!' : 'Take a little break';

    return (
      <div className="timer">

        <p className="timer__description">{activeTimer}</p>
        <p className="timer__time">{remainingTime}</p>
      </div>
    )
  }
}

export default Pomodoro;
