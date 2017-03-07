/**
 * Created by shaochenlu on 3/7/17.
 */

import React from 'react';
import RichForm from './RichForm.react';

/**
 * The wrapped element must have following properties:
 * onChange: func
 * value: string
 * showErr: bool
 * errMsg: string
 *
 */

let wrapInput = (Element) => {
  //TODO check Element props first
  //TODO check properties in options

  return class extends React.Component{

    constructor(props, context){
      super(props, context);
      context.parentForm.mountInput(this);
      this.state = {
        value: "",
        isTouched: false,
      };
      this.format = new RegExp(props.format);
    }

    static contextTypes = {
      parentForm: React.PropTypes.instanceOf(RichForm),
    };

    static propTypes = {
      name: React.PropTypes.string.required,
      format: React.PropTypes.string,
      errMsg: React.PropTypes.errMsg,
      afterTouchedShowErr: React.PropTypes.bool,
      required: React.PropTypes.bool,
    };

    /**
     *
     * @param e: Event
     */
    handleChange(e){

      const { parentForm } = this.context;
      const { name } = this.props;
      const value = e.currentTarget.value;

      parentForm.handleChildChange(name, value, this.checkValidity(value), e);
      this.setState({value});
    }

    handleBlur(e){
      this.setState({isTouched: true});
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

      return <Element onChange={(e) => this.handleChange(e)} value={value} showErr={showErr} errMsg={errMsg} onBlur={e => this.handleBlur(e)}/>;
    }
  }
};

export default wrapInput;