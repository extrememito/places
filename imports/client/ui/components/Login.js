import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'


 class Login extends Component {
  constructor(props) {
    super(props);
    this.props.redirect = this.props.redirect ? this.props.redirect : '/'
  }

  submit(event){
    event.preventDefault();
    const email = this.refs.email.value.trim();
    const pass = this.refs.pass.value;
    Meteor.loginWithPassword(email, pass, (error)=>{
      if(error){
        this.setState({
          errorServer: 'Oops, something went wrong. Try again'
        })
        return false
      }
      browserHistory.push(this.props.redirect);
    })
  }

  render() {
    if(!this.props.ready)
      return null;

    if(Meteor.user())
      browserHistory.push('/')

    DocHead.setTitle("Sign in");
    return(
      <div className="container">
        <h3>Sign in</h3><br/>
      <form name="login">
		        Your Email<br/>
          <input ref="email" type="email" name="email" maxlength="255" /><br/><br/>
            Password<br/>
          <input ref="pass" type="password" name="password" maxlength="255" /><br/><br/>
        <button className="btn btn-default" onClick={this.submit.bind(this)}>Sign in</button>
	     </form>
      </div>
    );
  }
}

export default createContainer((props)=>{
  return{
    ready: !Meteor.loggingIn()
  }
}, Login);
