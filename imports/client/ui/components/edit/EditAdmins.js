import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'

import EditWrapper from '../../layouts/EditWrapper'
import LoadingAnimation from '../../layouts/LoadingAnimation'
import { validEmail } from '../../../../utilities/inputValidators'

export default class EditAdmins extends Component{
  constructor(props) {
  super(props);
  this.state = {
    email: '',
    errorEmail: false,
    loading: false
  };
}

isUser(email){
  const promise = new Promise ((resolve, reject)=>{
    Meteor.call('isUser', email, (error, result)=>{
      resolve(result);
      if(error){
        reject(error)
      }
    });
  });
  return promise
}

checkEmail(e){
  const email = this.refs.email.value;
  this.setState({
    email: email
  });
  email.trim();
  if (!validEmail(email)){
    return false
  }
  if(this.isUser(email)
    .then((result)=>{
      if(result){
        this.setState({
          errorEmail: ""
        })
        return true;
      }else{
        this.setState({
          errorEmail: "User doesn't exist"
        });
        return false
      }
    })
    .catch((error) => false))
    return true;
  else
    return false;
}

save(event){
  event.preventDefault();
  const email = this.refs.email.value.trim();
  if (!validEmail(email)){
    this.setState({
      errorEmail: "Please enter valid email"
    })
    return false
  }
  if(!this.checkEmail()){
    console.log('email check fails');
    return false
  }
  if(!this.state.errorEmail === ""){
    console.log('still error');
    return false
  }
  console.log('vsicko v poradku ');


}

render(){
  const place = this.props.place
  return(
    <EditWrapper>
      <Link to={'/'+place._id}>
        <h2>{place.name}</h2>
      </Link>
      <h3>Admin Controls</h3>
      <h4>Add Admin:</h4>
      {this.state.errorServer ? (<span> {this.state.errorServer}</span>)  : null}
      <form name="addAdmin">
        Email:
        <br/>
      <input ref="email" value={this.state.email} required="true"  type="email" name="email" maxlength="255" onChange={this.checkEmail.bind(this)} />
      {this.state.errorEmail ? (<span> {this.state.errorEmail}<br/></span>)  : (<br/>)}
        <br/>
      <button ref="submit" className="btn btn-default" type="submit" onClick={this.save.bind(this)}>Add Admin</button>
      {this.state.loading ? <LoadingAnimation /> : null }
      </form>
      <h4>Admins:</h4>
      <table className="table table-hover table-bordered">
        <tbody>
        <tr>
          <th>User</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>placeholder</td>
          <td><button className="btn btn-danger">Remove</button></td>
        </tr>
      </tbody>
      </table>
    </EditWrapper>
  )
}
}
