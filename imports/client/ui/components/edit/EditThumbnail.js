import React, {Component} from 'react'
import { Link } from 'react-router'

import EditWrapper from '../../layouts/EditWrapper'
import { resizeAndCrop } from '../../../../utilities/resize'
import AddImage from './AddImage'

export default class EditThumbnail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.place.thumbnail ? this.props.place.thumbnail.name : '',
      descr: this.props.place.thumbnail ? this.props.place.thumbnail.descr : '',
      thumbnail: this.props.place.thumbnail ? this.props.place.thumbnail.uri : false,

      errorName: false,
      errorDescr: false,
      errorServer: false,

      loading: false,
      saved: false
    };
  }

checkName(event){
  //implement
  this.setState({name: this.refs.name.value});
  const name = this.refs.name.value.trim();
  if(name === ""){
    this.setState({
      errorName: "Please write valid name",
      saved: false
    });
    return false
  }
  this.setState({
    errorName: false,
    saved: false
  });
  return name;
}

checkDescr(event){
  //Implement
  this.setState({descr: this.refs.descr.value});
  const descr = this.refs.descr.value.trim();
  if (descr === ""){
    this.setState({
      errorDescr: "Please write valid description",
      saved: false
    });
    return false
  }
  this.setState({
    errorDescr: false,
    saved: false
  });
  return descr;
}

addThumbnail(image, callback){
  Meteor.call('addThumbnail', this.props.place._id, image, (error)=>{
    if(error){
      callback(error)
    }else{
      this.setState({
        name: image.name,
        descr: image.descr,
        thumbnail: image.uri
      })
    }
  });
}

thumbnailAdded(obj){
   this.setState({
     name: obj.name,
     descr: obj.descr,
     thumbnail: obj.uri
   })
}

removeThumbnail(e){
    e.preventDefault();
    Meteor.call('removeThumbnail', this.props.place._id, (error) =>{
      if(error){
        this.setState({
          errorServer: "Opps, something went wrong. Try again",
          loading: false,
          saved: false
        });
      }else{
        this.setState({
          thumbnail: false
        })
      }
    })
}

save(event){
  event.preventDefault();
  const name = this.checkName();
  const descr = this.checkDescr();
  const placeId = this.props.place._id;
  if(name && descr){
    //METEOR CALLL
    Meteor.call('updateThumbnail', placeId, {name, descr}, (error) => {
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
  const place = this.props.place;
  if(!this.state.thumbnail){
    return(
        <EditWrapper>
          <Link to={'/'+place._id}>
            <h2>{place.name}</h2>
          </Link>
          <h3>
            Thumbnail
          </h3>
          <AddImage attachImage={this.addThumbnail.bind(this)} title="Add Thumbnail:" buttonText="Add Thumbnail" crop={true}/>
        </EditWrapper>
    )
  }
  return(
    <EditWrapper>
      <Link to={'/'+place._id}>
        <h2>{place.name}</h2>
      </Link>
      <h3>
        Thumbnail  {this.state.saved ? (<span className="label label-success">Saved</span>) : null}
      </h3>
    {this.state.errorServer ? (<span> {this.state.errorServer}<br /></span>)  : null}
      {this.state.thumbnail
        ? (<img height='200' width='251'
                className="img-thumbnail"
                src={this.state.thumbnail}
                alt={this.state.descr}
                title={this.state.name}
          />)
        : null
      }
      <form name="updateThumbnail">
        Name:
        <br/>
        <input ref="name" value={this.state.name} type="text" name="name" maxlength="255" onChange={this.checkName.bind(this)} />
        {this.state.errorName ? (<span> {this.state.errorName}<br/></span>)  : (<br/>)}
        Description: <br/>
        <input ref="descr" value={this.state.descr} type="text" name="descr" maxlength="255" onChange={this.checkDescr.bind(this)} />
        {this.state.errorDescr ? (<span> {this.state.errorDescr}<br/></span>)  : (<br/>)}
        <br/>

    <button className="btn btn-default" type="submit" onClick={this.save.bind(this)}>Save Changes</button>
    {this.state.loading ? (<img src="/assets/balls.svg" />) : null }    <span> or </span>
    <button className="btn btn-danger" onClick={this.removeThumbnail.bind(this)}>Delete Thumbnail</button>
    <br /><br />
  </form>
    </EditWrapper>
  )
}
}
