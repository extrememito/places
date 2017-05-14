import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import { validEmail } from '../../../utilities/inputValidators'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorEmail: false,
      errorPass: false,
      errorPassRepeat: false,
      errorServer: false
    };
  }

  checkEmail(event){
    const email = this.refs.email.value.trim()
    if (!validEmail(email)){
      this.setState({
        errorEmail: "Please enter valid email"
      });
      return false
    }
    // if ( !je dostuny ){
    //   this.setState({
    //     errorEmail: email + " is already registered"
    //   });
    //   return false
    // }
    this.setState({
      errorEmail: false
    });
    return email;
  }

  checkPass(){
    const pass =this.refs.pass.value;
    if(pass.length < 3){
      this.setState({
        errorPass: "Password must be at least 3 characters long"
      });
      return false
    }
    this.setState({
      errorPass: false
    });
    return pass;
  }

  checkPassRepeat(){
    const passRepeat = this.refs.passRepeat.value;
    const pass = this.checkPass();
    if(!(pass === passRepeat)){
      this.setState({
        errorPassRepeat: "Password doesn't match"
      });
      return false
    }
    this.setState({
      errorPassRepeat: false
    });
    return true
  }

  submit(event){
    event.preventDefault();
    const email = this.checkEmail();
    const pass = this.checkPass();
    if(email && pass && this.checkPassRepeat()){
      Meteor.call('createUsers', email, pass, (error)=>{
        if(error){
          this.setState({
            errorServer: 'Oops, something went wrong. Try again'
          })
          return false;
        }
        Meteor.loginWithPassword(email, pass, (error)=>{
          if(error){
            this.setState({
              errorServer: 'Oops, something went wrong. Try again'
            })
            return false
          }
          browserHistory.push('/')
        })
      })

    }else{
      this.setState({
        errorServer: false
      })
    }
  }


  render() {
    DocHead.setTitle("Sign up")
    return(
      <div className="container">
        <h3>Create new account</h3>
      {this.state.errorServer ? (<span>  {this.state.errorServer}</span>): (<br/>)}
        <form>
		      Your Email:<br/>
        <input ref="email" type="email" name="email" maxlength="255" onBlur={this.checkEmail.bind(this)}/>
      {this.state.errorEmail ? (<span>{this.state.errorEmail}</span>) : null}
      <br/><br />
          Password:<br/>
        <input ref="pass" type="password" name="password" maxlength="255" onBlur={this.checkPass.bind(this)} />
        {this.state.errorPass ? (<span>  {this.state.errorPass}</span>): null}<br/><br/>
          Repeat password:<br/>
        <input ref="passRepeat" type="password" name="password_repeat" maxlength="255" onChange={this.checkPassRepeat.bind(this)} />
      {this.state.errorPassRepeat ? (<span>  {this.state.errorPassRepeat}</span>): null}<br/><br/>
    <button className="btn btn-default" onClick={this.submit.bind(this)}>Sign up</button>
	     </form>
      </div>
    );
  }
}
