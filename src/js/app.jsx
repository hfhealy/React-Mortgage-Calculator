import React from 'react';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {balance: '', rate: '', term: 0, output: false};
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  /*handleChange to update state values when an input changes. 
  Add an onChange to the HTML event to each of the input elements 
  that calls handleChange function.*/

  handleChange(event) {
    this.setState({[event.target.name]: parseFloat(event.target.value) || 0});
  }

  /* Calculate function to determine the mortgage payment and then 
  set state to bind the result to the div with an id of output 
  as a string. Add an onClick event to the button that calls 
  the calculate function while passing the state object as an argument. */
  
  calculate() {
    const {term, balance, rate} = this.state;
    let monthlyInterestRate = rate/100/12;
    let numberOfPayments = term*12;
    let a = Math.pow(monthlyInterestRate+1, numberOfPayments) * monthlyInterestRate * balance;
    let b = Math.pow(monthlyInterestRate+1, numberOfPayments) - 1;
    let monthlyMortgagePayment = a/b
    this.setState({output: `$${monthlyMortgagePayment.toFixed(2)} is your monthly payment`})
  }

  
  render() {
    return (
      
      <div id="form">
      <h3>Mortgage Calculator</h3>
      <div id="img"></div>
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
