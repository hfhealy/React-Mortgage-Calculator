import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  /* A constructor method to initialize the state of the app. Here you will need to add a property for each input field to the state object and set their initial values. Then, return to your HTML and add a value attribute to each editable input element in your HTML to bind these elements to their respective properties on the state object. */
  constructor(props) {
    super(props);
    this.state = {balance: '', rate: '', term: 0, output: false};
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  /*A function to update state values when an input changes, using event binding. Once this is in place, return to your HTML and add an onChange event to each of the input elements that calls this new method.*/

  handleChange(event) {
    this.setState({[event.target.name]: parseFloat(event.target.value) || 0});
  }

  /* A calculate function to determine the mortgage payment and then set state to bind the result to the div with an id of output as a string like this: "$1945.09 is your payment". This function should accept 3 parameters: balance, rate, and term. Finally, return to your HTML and add an onClick event to this button that calls the calculate function while passing the state object as an argument. */
  calculate() {
    const {term, balance, rate} = this.state;
    let r = rate/100/12;
    let n = term*12;
    let a = Math.pow(r+1, n) * r * balance;
    let b = Math.pow(r+1, n) - 1;
    let answer = a/b
    let result = answer.toFixed(2)
    this.setState({output: `$${result} is your monthly payment`})
  }

  
  render() {
    return (
      
      <div id="form">
      <h3>Mortgage Calculator</h3>
      <div id="img"></div>
      {/* <img src={./images/house-emoji.png}> */}
      <div id="boxes">
        <label>Loan Balance</label>
        <input type="number" name="balance" defaultValue={this.state.balance} onChange={this.handleChange} placeholder="0" />
        <br/>
        <label>Interest Rate (%)</label>
        <input type="number" name= "rate" defaultValue={this.state.rate} onChange={this.handleChange} placeholder="0" step="0.01" />
        <br/>
      </div>
        <label>Loan Term (Years) </label>
        <select onChange={this.handleChange} name="term" value={this.state.term}>
          <option>Select Term</option>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <br/>
      
      <button type="submit" name="submit" onClick={this.calculate}>Calculate</button>
      <br/>
      <div id="output" name="output" onClick={this.calculate}>{this.state.output}</div>
      <br/>
      </div>
    );
  }
}
