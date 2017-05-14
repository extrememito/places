import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'

import EditWrapper from '../../layouts/EditWrapper'

export default class EditBasic extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.place ? this.props.place.name : '',
      descr: this.props.place ? this.props.place.descr : '',
      errorName: false,
      errorDescr: false,
      errorServer: false,
      loading: false,
      saved: false
    };
  }

  checkName(event){
    //implement
    this.setState({
      name: this.refs.name.value,
      saved: false
    });
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

  checkDescr(event){
    //Implement
    this.setState({
      descr: this.refs.descr.value,
      saved: false
    });
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

  save(event){
    event.preventDefault();
    const name = this.checkName();
    const descr = this.checkDescr();
    const placeId = this.props.place._id;
    if(name && descr){
      //METEOR CALLL 
      Meteor.call('updatePlace', placeId, {name, descr}, (error) => {
        if(error){
          this.setState({
            errorServer: "Opps, something went wrong. Try again",
            loading: false,
            saved: false
          });
          return false;
        }else{
          this.setState({
            errorServer: false,
            loading: false,
            saved: true
          });
        }
      });
      this.setState({
        loading: true
      });
    }else{// Wrong name or descr. No server error and not saved
      this.setState({
        errorServer: false,
        saved: false
      });
      return false
    }
  }

  render(){
    const place = this.props.place
    return(
      <EditWrapper>
        <Link to={'/'+place._id}>
          <h2>{place.name}</h2>
        </Link>
        {this.state.errorServer ? (<span> {this.state.errorServer}</span>)  : (<br/>)}
        <form name="addPlace">
          Name:
          <br/>
          <input ref="name" value={this.state.name} className="form-control" type="text" name="name" maxlength="255" onChange={this.checkName.bind(this)} />
          {this.state.errorName ? (<span> {this.state.errorName}<br/></span>)  : (<br/>)}
          Description: <br/>
          <textarea ref="descr" value={this.state.descr} className="form-control" name="descr" rows="11" maxlength="2000" onChange={this.checkDescr.bind(this)} />
          {this.state.errorDescr ? (<span> {this.state.errorDescr}<br/></span>)  : (<br/>)}
          <br/>
          <button
              className="btn btn-default"
              type="submit"
              onClick={this.save.bind(this)}
              disabled={(this.state.errorDescr || this.state.errorName) ? true : false}
              >Save changes</button>
        {this.state.loading ? (<img src="/assets/balls.svg" />) : null }
        <span>  </span>
      {this.state.saved ? (<span className="label label-success">Saved</span>) : null}
        </form>
      </EditWrapper>
    )
  }
}
