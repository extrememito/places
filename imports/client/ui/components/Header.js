import React, {Component} from 'react'
import { Link, browserHistory  } from 'react-router'
import {createContainer} from 'meteor/react-meteor-data'

class Header extends Component {

  logout(){
    Meteor.logout((error)=>{
      if(error){
        console.log('dajaka error pri logoute');
      }
      browserHistory.push('/');
    })
  }

  getUser(){
    return(
      <div className="float-right">
        Signed as <Link to={'/user/'+Meteor.userId()}>{Meteor.user().emails[0].address}</Link> | <Link to="" onClick={this.logout}>Sign out</Link>
      </div>
    )
  }

  getForm(){
    return(
      <div className="float-right">
      <Link to="/login">Sign in</Link> | <Link to="/register">Create an account</Link>
      </div>
    )
  }

  getAccoutnsUi(){
    if(!this.props.ready) // return loggingIn
      return (
        <div className="float-right">Logging in...</div>
      );
    if(Meteor.user())//reutrn user
     return this.getUser.call(this);
    //else return form
    return this.getForm.call(this);
  }

  render() {
    return(
    <header>
      <div className="container" style={{padding: 10 + 'px' + 0}}>
        <div className="float-left">
          <Link to="/">Home</Link> | <Link to="/addplace">Add place</Link>
        </div>
        {this.props.logedIn ? this.getAccoutnsUi.call(this) : this.getAccoutnsUi.call(this)}
        <hr />
      </div>
    </header>
  );
  }
}

export default createContainer(()=>{
  return {
    ready: !Meteor.loggingIn(),
    logedIn: Meteor.user()
  }
}, Header);
