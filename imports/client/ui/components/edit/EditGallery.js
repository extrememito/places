import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'

import EditWrapper from '../../layouts/EditWrapper'
import AddImage from './AddImage'

export default class EditGallery extends Component{
  constructor(props) {
  super(props);
  this.state = {

  };
}

addImage(image, callback){
  Meteor.call('addImage', this.props.place._id, image, (error)=>{
    if(error){
      console.log(error);
      callback(error);
    }else{
      callback(false);
    }
  });
}

removeImage(imageId){
  Meteor.call('removeImage', this.props.place._id, imageId, (error)=>{
    if(error){
      console.log(error);
    }else{
      console.log('success');
    }
  })
}

getImageLine(image){
  let date = moment(image.lastUpdate.updatedAt).format('DD.MM.YYYY, HH:mm:ss');
  return (
    <tr key={image.imageId}>
      <td>{image.name}</td>
      <td>{image.descr}</td>
      <td>{date}</td>
      <td><button
              className="btn btn-danger"
              onClick={this.removeImage.bind(this, image.imageId)}
              >Remove
          </button></td>
    </tr>)
}

render(){
  const place = this.props.place;
  return(
    <EditWrapper>
      <Link to={'/'+place._id}>
        <h2>{place.name}</h2>
      </Link>
      <h3>Gallery</h3>
      <AddImage
        attachImage={this.addImage.bind(this)}
        title="Add Image:"
        buttonText="Add Image"
        crop={false}
      />
      <h4>Images:</h4>
      <table className="table table-hover table-bordered">
        <tbody>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Added At</th>
          <th>Action</th>
        </tr>
        {place.images ? place.images.map(this.getImageLine.bind(this)) : null}
      </tbody>
      </table>
    </EditWrapper>
  )
}
}
