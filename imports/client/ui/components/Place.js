import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import {createContainer} from 'meteor/react-meteor-data';
import { Carousel } from 'react-bootstrap';

import { Places } from '../../../api/collections.js'

 class Place extends Component {

  getImages(){
    if(this.props.place.images){
      const loadImage = (image)=>{
         return(
           <Carousel.Item>
             <img src={image.uri} />
           </Carousel.Item>
         )
      }
      return (
        <Carousel indicators={false}>{this.props.place.images.map(loadImage)}</Carousel>
      )
    }else{
      return null;
    }
  }

  render() {
    if(!this.props.ready){
      return (
        <div></div>// LOADING
      )
    }

    if(!this.props.place){  //// Place doesn't exist
      return(
        <div className="container">No such place</div>
      )
    }

    const place = this.props.place;
    let owner = false;

    if(this.props.ready && Meteor.user())
      {
        if(Meteor.user()._id === place.ownerId){
            owner = true;
        }
      }

    return(
      <div className="container">
        <div className="blog-post col-sm-6">
          <h2 className="blog-title">
            {place.name+' '}
          { owner ?
            (<Link className="btn btn-default" to={"/edit/"+place._id}>Edit</Link>)
            : null
          }
          </h2>
          { place.thubmanil ?
            (<img className="img-thumbnail" alt="" src="" width="500" height="250"/>)
            : null
          }
          <article>
            {place.descr}
          </article>
        </div>
        <div className="col-sm-12">
        <h3>Gallery:</h3>
        {this.getImages.call(this)}
        </div>
      </div>
  );
  }
}

export default createContainer((props)=>{
  let signlePlacesSub = Meteor.subscribe('singlePlaceView', props.params.placeId);
  let place = Places.findOne({});
  return {
    ready: signlePlacesSub.ready() && !Meteor.loggingIn(),
    place: place
  }
}, Place);
