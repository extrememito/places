import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import {createContainer} from 'meteor/react-meteor-data';

import { Places } from '../../../../api/collections.js'
import Login from '../Login'
import EditBasic from './EditBasic'
import EditAdmins from './EditAdmins'
import EditGallery from './EditGallery'
import EditThumbnail from './EditThumbnail'

class Edit extends Component {
  constructor(props) {
    super(props);
    // TABS: basic, thubmanil, gallery, admins
    this.state = {
      tab: "basic"
    };
  }

  // should be more advanced because of redundancy
  isAuthorized(){
    if(this.props.place.ownerId)
      return true
    else
      return false

  }

  getContent(tab){
    if(tab === "basic")
      return(<EditBasic place={this.props.place}/>);
    if(tab === "thumbnail")
      return(<EditThumbnail place={this.props.place}/>);
    if(tab === "gallery")
      return(<EditGallery place={this.props.place} />);
    if(tab === "admins")
      return(<EditAdmins place={this.props.place}/>);
  }

  render() {
    DocHead.setTitle("Edit")
    // Waiting for user loggingIn
    if(!this.props.userReady){
      return(
        <div></div>
      )
    }
    // If not loged in redirect to login
    if(!Meteor.user()){
      return(
        <Login redirect={'/edit/'+ this.props.params.placeId} />
      )
    }
    //if sub not ready
    if(!this.props.subReady){
      return (
        <div className="container">Loading...</div>
      )
    }
    //place doesn not exists
    if(!this.props.place){
      return (
        <div className="container">No such place</div>
      )
    }

    // is authorized
    if(!this.isAuthorized()){
      return(
        <div className="container">Not authorized</div>
      );
    }

    const url = '/edit/' + this.props.params.placeId;
    const tabs = ['basic', 'thumbnail', 'gallery', 'admins'];
    let tab = this.props.params.tab ? this.props.params.tab : 'basic';
    tab = tabs.indexOf(tab) ? tab : 'basic';
    return(
      <div className="container">
        <ul className="nav nav-tabs">
          <li className={(tab === 'basic') ? 'active' : ''}><Link to={url}>Info</Link></li>
          <li className={(tab === 'thumbnail') ? 'active' : ''}><Link to={url+'/thumbnail'}>Thumbnail</Link></li>
          <li className={(tab === 'gallery') ? 'active' : ''}><Link to={url+'/gallery'}>Gallery</Link></li>
          <li className={(tab === 'admins') ? 'active' : ''}><Link to={url+'/admins'}>Admins</Link></li>
        </ul>
        {this.getContent(tab)} <br />
      </div>
    );
  }
}

export default createContainer((props)=>{
  // let authorized = false;
  let subReady = false
  let signlePlacesSub
  if(!Meteor.loggingIn() && Meteor.user()){
      signlePlacesSub = Meteor.subscribe('editPlaceView', props.params.placeId, Meteor.user()._id);
      subReady = signlePlacesSub.ready();
  }

  // let signlePlacesSub = Meteor.subscribe('editPlaceView', props.params.placeId);
  let place = Places.findOne({});
  return {
    subReady,
    userReady: !Meteor.loggingIn(),
    place: place
  }
}, Edit);
