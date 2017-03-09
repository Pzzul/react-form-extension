/**
 * Created by shaochenlu on 3/6/17.
 */

import React from 'react';

export default class RichForm extends React.Component{

  constructor(props){
    super(props);
    this.inputs = [];
  }

  getChildContext(){
    return {
      parentForm: this
    }
  }

  //Register the input
  mountInput(input){
    const { name } = input.props;

    if(this.inputs.find(i => i.name === name)){
      console.error("Duplicate field name");
      return;
    }

    this.inputs.push({
      name, value: "", isValid: false,
    })
  }

  unmountInput(input){
    const { name } = input.props;

    let index = this.inputs.findIndex(i => i.name === name);

    if(index  === -1){
      console.error(`input with name ${name} isn't found`);
      return;
    }

    this.inputs.splice(index, 1);
  }


  /**
   *
   * @param { string } name The name of mutated input
   * @param { string }value The value of mutated input
   * @param { string }errType The type of error
   * @param { Event } e
   *
   */
  handleChildChange(name, value, errType, e){
    let input = this.inputs.find(i => i.name === name);

    if(!input){
      console.error(`No field of ${name} isn't found`);
      return;
    }

    input.value = value;
    input.isValid = true;

    input.isValid = !errType;

    this.props.onChange(this.inputs);
  }

  render(){
    return (
      <form>
        {this.props.children}
      </form>
    );
  }
}

RichForm.childContextTypes = {
  parentForm: React.PropTypes.instanceOf(RichForm),
};

RichForm.propTypes = {
  onChange: React.PropTypes.func
};

