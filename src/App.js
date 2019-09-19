import React from 'react';
import Pomodoro from './pomodoro';
import Header from './header';
import CSS from './App.css';

class App extends React.Component {
  render(){
  return(
    <div className='App-header'>
    <Header />
    <Pomodoro />
    </div>
  )
}
}
export default App;
