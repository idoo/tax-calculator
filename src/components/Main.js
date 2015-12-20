require('normalize.css');
require('styles/App.css');

import React from 'react';
import CSV2JSON from 'libs/csv-to-json'
import TaxCalculator from 'libs/tax-calculator'

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: null, outputValue: null};
  }

  calculate() {
    let data = CSV2JSON(this.state.inputValue);

    if (typeof data !== 'undefined' && data.length > 0) {
      let result = this.makeCalculation(data);
      this.setState({outputValue: JSON.stringify(result)});
    } else {
      throw 'Invalid input data';
    }
  }

  makeCalculation(data) {
    let result = [];
    data.forEach(function(item) {
      let grossIncome = Math.round(item.Salary / 12);
      let incomeTax = TaxCalculator(item.Salary);
      let superRate = parseInt(item.SuperRate.replace('%', '')) * 0.01;

      result.push({
        name: item.FirstName + ' ' + item.SecondName,
        payPeriod: item.PayPeriod,
        grossIncome: grossIncome,
        incomeTax: incomeTax,
        netIncome: grossIncome - incomeTax,
        super: Math.round(grossIncome * superRate)
      });
    });
    return result;
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    let inputValue = this.state.inputValue;
    let outputValue = this.state.outputValue;

    return (
      <div className='index'>
        <h1 className='title'>Calculator</h1>

        <div className='wrap'>
          <label className='label'>Input (CSV)</label>
          <textarea id='inputValue'
                    className='text'
                    placeholder='Input'
                    onChange={this.handleChange.bind(this)}
                    value={inputValue}>
            </textarea>
        </div>

        <div className='wrap'>
          <label className='label'>Output (JSON)</label>
          <textarea id='output'
                    className='text'
                    placeholder='Output'
                    value={outputValue}>
          </textarea>
        </div>

        <div className='wrap'>
          <button className='btn'
                  id="submit"
                  onClick={this.calculate.bind(this)}>
            Calculate
          </button>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
