/**
 * Created by shaochenlu on 3/7/17.
 */

import React from 'react';
import RichForm from './RichForm.react';

let wrapInput = (Element) => {
  //TODO check Element props first

  return class extends React.Component{

    constructor(props, context){
      super(props, context);
      context.parentForm.mountInput(this);
      this.state = {
        value: "",
      };
      this.format = new RegExp(props.format);
    }

    static contextTypes = {
      parentForm: React.PropTypes.instanceOf(RichForm),
    };

    static propTypes = {
      name: React.PropTypes.string.required,
      format: React.PropTypes.string,
      requiredErrorMsg: React.PropTypes.string,
      formatErrorMsg: React.PropTypes.string,
      required: React.PropTypes.bool,
    };

    /**
     * @param { Event } e
     */
    handleChange(e){

      const { parentForm } = this.context;
      const { name } = this.props;
      const value = e.currentTarget.value;

      parentForm.handleChildChange(name, value, this.checkValidity(value), e);
      this.setState({value});
    }

    checkValidity(value){
      const { required } = this.props;
      let trimmedValue = value.trim();
      if(!trimmedValue)
        return !required;
      return this.format.test(value);
    }

    render(){
      const { value, isTouched } = this.state;
      const { errMsg, showErrPhase } = this.props;

      let showErr = true;
      let validity =  this.checkValidity(value);

      if(showErrPhase === "touched")
        showErr = isTouched && !validity;
      else
        showErr = !validity;

      return (
        <Element
          onChange={(e) => this.handleChange(e)} value={value}
          showErr={showErr} errMsg={errMsg}
        />);
    }
  }
};

export default wrapInput;