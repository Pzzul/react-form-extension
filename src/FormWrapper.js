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
      const { format } = props;
      this.format = format ? new RegExp(format) : null;
    }

    componentDidMount(){
      const { parentForm } = this.context;
      const { defaultValue, name } = this.props;

      if(defaultValue) {
        this.setState({value: defaultValue});
        parentForm.handleChildChange(name, defaultValue, this.checkValidity(defaultValue), null);
      }
    }

    static contextTypes = {
      parentForm: React.PropTypes.instanceOf(RichForm),
    };

    static propTypes = {
      name: React.PropTypes.string.isRequired,
      format: React.PropTypes.string,
      requiredErrorMsg: React.PropTypes.string,
      formatErrorMsg: React.PropTypes.string,
      required: React.PropTypes.bool,
      defaultValue: React.PropTypes.string,
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

    /**
     *
     * @param { string } value
     * @returns { string | null } type of error. If no error, return null.
     */
    checkValidity(value){
      const { required } = this.props;
      let trimmedValue = value.trim();
      if(!trimmedValue && required)
        return "requiredErrorMsg";
      if(trimmedValue && this.format && !this.format.test(value))
        return "formatErrorMsg";
      return null;
    }

    componentWillUnmount(){
      let { parentForm } =  this.context;
      parentForm.unmountInput(this);
    }

    render(){
      const { value } = this.state;

      let hasErr = false, errMsg = "";
      let errType = this.checkValidity(value);

      if(errType){
        hasErr = true;
        errMsg = this.props[errType];
      }

      return (
        <Element
          onChange={(e) => this.handleChange(e)} value={value}
          hasErr={hasErr}  errMsg={errMsg}
        />);
    }
  }
};

export default wrapInput;