/**
 * Created by shaochenlu on 3/6/17.
 */

import React from 'react';

export default class RichForm extends React.Component{

  constructor(props){
    super(props);
    // {name, value, isValid}
    this.inputs = [];
    this.formValidity = false;
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


  /**
   *
   * @param { string } name The name of mutated input
   * @param { string }value The value of mutated input
   * @param { boolean }isValid
   * @param { Event } e
   *
   */
  handleChildChange(name, value, isValid, e){
    let input = null;

    input = this.inputs.find(i => i.name === name);
    if(!input){
      console.error(`No field of ${name} isn't found`);
      return;
    }

    input.value = value;
    input.isValid = isValid;

    let canSubmit = this.inputs.reduce((acc, i) => acc && i.isValid, true);
    this.emitStatus(this.state.canSubmit, canSubmit);
    this.setState({canSubmit});

    this.props.onChange(this.getData());
  }

  getData(){
    let data = {};
    this.inputs.forEach(i => data[i.name] = i.value);
    return data;
  }

  emitStatus(preStatus, nextStatus){
    if(preStatus && !nextStatus)
      this.props.onInvalid();
    else if(!preStatus && nextStatus)
      this.props.onValid();
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
  onValid: React.PropTypes.func.required,
  onInvalid: React.PropTypes.func.required,
  onChange: React.PropTypes.func.required,
};

