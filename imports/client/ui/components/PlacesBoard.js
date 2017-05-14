import React, {Component} from 'react'
import {createContainer} from 'meteor/react-meteor-data';

import PlaceTile from './PlaceTile'
import { Places } from '../../../api/collections.js'

class PlacesBoard extends Component {
  render() {
    DocHead.setTitle("Places | Home");
    if(!this.props.ready){
      return(
        <div className="container">
          <img src="assets/balls.svg" />
        </div>
      );
    }
    return(
      <div className="container">
        {this.props.places.map((place)=>{
          return(
          <PlaceTile key={place._id} place={place} />
          )
        })}
      </div>
    );
  }
}

export default createContainer( (props)=>{
  let allPlacesSub = Meteor.subscribe('placesBoardView');
  let places = Places.find({}).fetch();
  return{
    ready: allPlacesSub.ready(),
    places: places
  }
}, PlacesBoard);
