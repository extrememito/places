import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import Login from './Login'

export default class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorName: false,
      errorDescr: false,
      errorServer: false,
      loading: false
    };
  }

  checkName(){
    const name = this.refs.name.value.trim();
    if(name === ""){
      this.setState({
        errorName: "Please write valid name"
      });
      return false
    }
    this.setState({
      errorName: false
    });
    return name;
  }

  checkDescr(){
    const descr = this.refs.descr.value.trim();
    if (descr === ""){
      this.setState({
        errorDescr: "Please write valid description"
      });
      return false
    }
    this.setState({
      errorDescr: false
    });
    return descr;
  }

  addPlace(event){
    event.preventDefault();
    const name = this.checkName();
    const descr = this.checkDescr();
    let placeId;
    if(name && descr){
       placeId = Meteor.call('addNewPlace', {name, descr}, (error, result) => {
         if(error){
           this.setState({
             errorServer: "Opps, something went wrong. Try again",
             loading: false
           });
           return false
         }
         if(result){
           browserHistory.push('/'+result);
           return true;
         }
       });
       this.setState({
         loading: true
       });
    }else{
      this.setState({
        errorServer: false
      });
      return false
    }
  }

  render() {
    if(!Meteor.user()){
        return ( <Login redirect='/addplace' />)
    }

    DocHead.setTitle("Add Place");
    return(
      <div className="container">

           <h3>Add new place</h3>
         {this.state.errorServer ? (<span> {this.state.errorServer}</span>)  : (<br/>)}
         <form name="addPlace">
               Name:
               <br/>
             <input ref="name" className="form-control" type="text" name="name" maxlength="255" onChange={this.checkName.bind(this)} />
           {this.state.errorName ? (<span> {this.state.errorName}<br/></span>)  : (<br/>)}
           <br/>
              Description: <br/>
            <textarea ref="descr" className="form-control" name="descr" rows="11" maxlength="2000" onChange={this.checkDescr.bind(this)}></textarea>
          {this.state.errorDescr ? (<span> {this.state.errorDescr}<br/></span>)  : (<br/>)}
          <br/>
          <button className="btn btn-default" type="submit" onClick={this.addPlace.bind(this)}>Add</button>
          {this.state.loading ? (<img src="assets/balls.svg" />) : null }
           </form>
       </div>
  );
  }
}
