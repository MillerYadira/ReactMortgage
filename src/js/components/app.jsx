import React, { Component } from 'react';
import FormInput from './FormInput';
import Denominations from './Denominations';

// Add the denominationConfig here, which includes the denomination names and values
const denominationConfig = [
  { name: 'twenties', value: 2000 },
  { name: 'tens', value: 1000 },
  { name: 'fives', value: 500 },
  { name: 'ones', value: 100 },
  { name: 'quarters', value: 25 },
  { name: 'dimes', value: 10 },
  { name: 'nickels', value: 5 },
  { name: 'pennies', value: 1 },
];

class App extends Component {
  state = {
    amountDue: '',
    amountReceived: '',
    changeDue: 0,
    additionalOwed: null,
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0,
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0
  };

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  calculateChange = () => {
    const { amountDue, amountReceived } = this.state;
    let totalChange = Math.round(amountReceived * 100) - Math.round(amountDue * 100);

    if (totalChange < 0) {
      // Reset all denomination counts to zero when money is owed
      return this.setState({
        additionalOwed: Math.abs(totalChange / 100),
        changeDue: null,
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
      });
    }

    // Proceed with normal change calculation
    this.setState({ additionalOwed: null, changeDue: totalChange / 100 });

    const results = {};
    denominationConfig.forEach(({ name, value }) => {
      results[name] = Math.floor(totalChange / value);
      totalChange -= results[name] * value;
    });

    this.setState(results);
  };

  render() {
    const { amountDue, amountReceived, changeDue, additionalOwed, twenties, tens, fives, ones, quarters, dimes, nickels, pennies } = this.state;

    const denominations = {
      Twenties: twenties,
      Tens: tens,
      Fives: fives,
      Ones: ones,
      Quarters: quarters,
      Dimes: dimes,
      Nickels: nickels,
      Pennies: pennies
    };

    return (
      <div className="container">
        <header className="text-center mb-4">
          <h1>Change Calculator</h1>
        </header>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Enter Information</h5>
                <FormInput amountDue={amountDue} amountReceived={amountReceived} handleInputChange={this.handleInputChange} calculateChange={this.calculateChange} />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className={`alert ${changeDue !== null ? 'alert-success' : 'alert-danger'} text-center`}>
                  {changeDue !== null
                    ? `The total change due is $${changeDue.toFixed(2)}`
                    : additionalOwed !== null
                      ? `You owe an additional $${additionalOwed.toFixed(2)}`
                      : 'No change yet, enter amounts above'}
                </div>

                <Denominations denominations={denominations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
