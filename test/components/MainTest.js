/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
import React from 'react/addons';
import ReactDOM from 'react-dom';
const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Main from 'components/Main';

describe('MainComponent', () => {
  let MainComponent;
  let component;
  let el;

  beforeEach(() => {
    MainComponent = createComponent(Main);
    component = TestUtils.renderIntoDocument(MainComponent);
    el = React.findDOMNode(component);
  });

  it('should have its component name as default className', () => {
    expect(MainComponent.props.className).to.equal('index');
  });

  it('should calculate correct', () => {
    let content = `FirstName,LastName,Salary,SuperRate,PayPeriod
    David,Rudd,60050,9%,01 March – 31 March`;

    let result = [{"name":"David undefined","payPeriod":"01 March – 31 March",
                   "grossIncome":5004,"netIncome":null,"super":450}];

    let inputText = el.querySelector("#inputValue");
    let outputText = el.querySelector("#output");
    let submitButton = el.querySelector('#submit');

    inputText.value = content;
    submitButton.click();

    expect(outputText.value).to.equal(JSON.stringify(result));
  });
});
