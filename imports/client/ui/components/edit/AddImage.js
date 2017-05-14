import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import {createContainer} from 'meteor/react-meteor-data';

import { Images } from '../../../../api/collections'
import { resizeAndCrop } from '../../../../utilities/resize'

class AddImage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      descr: '',
      thumbnail: '',

      errorName: false,
      errorDescr: false,
      errorServer: false,

      preview: false,
      processing: false,
      file: false
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
      errorName: false
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
      errorDescr: false
    });
    return descr;
  }

  removePreview(e){
    e.preventDefault();
    this.setState({
      preview: false
    })
  }

  checkImage(){
    if(!this.refs.file.files[0]){
      this.setState({
        errorImage: "Please select an image"
      });
      return false
    }
    const file = this.refs.file.files[0];
    if (file.type.indexOf("image") == -1) {
      this.setState({
        errorImage: "File must be an image"
      });
      this.refs.file.value = "";
      return false
    }
    if(file.size > 10 * 1024 * 1024) {
      this.setState({
        errorImage: "Image is too big. Max size is 5mb"
      });
      this.refs.file.value = "";
      return false
    }
    this.setState({
      errorImage: false
    });
    return file;
  }

  loadImage(e){
    e.preventDefault();
    const file = this.checkImage();
    if(!file){
      return false;
    }
    const name = file.name.split(".")[0] + ".png";
    if(this.props.crop){
      resizeAndCrop(file, {}, (result)=>{
        this.setState({
          preview: {
            data: result
          },
          file: {
            name: name,
            data: result,
          },
          processing: false
        });
      });
    this.setState({processing: true});
    }else{
      this.setState({
        file: {
          name: name,
          data: file,
        }
      });
    }
  }

  uploadImage(image){
    const promise = new Promise ((resolve, reject)=>{
      const upload = Images.insert({
              file: image.data,
              streams: 'dynamic',
              chunkSize: 'dynamic',
              fileName: image.name
            }, false);

      upload.on('end', function(error, fileObj) {
        if (error) {
          reject(error)
        } else {
          resolve(fileObj._id)
        }
      });
      upload.start();
    });
    return promise;
  }

  getImageUri(imageId){
    const promise = new Promise ((resolve, reject)=>{
      Meteor.call('getImageUri', imageId, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve({imageId, uri: result})
        }
      });
    });
    return promise;
  }

  save(e){
    e.preventDefault();
    const name = this.checkName();
    const descr = this.checkDescr();


    if(!this.state.file || !name || !descr){
      this.setState({
        errorServer: false
      });
      return false
    }
    this.uploadImage(this.state.file)
      .then(this.getImageUri)
      .then((result)=>{
        result.name = name;
        result.descr = descr;
        this.props.attachImage(result, (error)=>{
          if(error){
            this.setState({
              errorServer: 'Opps, something went wrong, try again later.'
            });
          }else{
            this.setState({
              name: '',
              descr: '',
            });
            this.refs.file.value = "";
          }
        })
      })
      .catch((error)=>{
        if(error){
          console.log(error);
        }
      });
  }

  getPreview(){
    return(
      <div className="preview">
        <h4>Preview:</h4>
        {this.state.preview
            ? (<img height='200' width='251' className="img-thumbnail" src={URL.createObjectURL(this.state.preview.data)} />)
            : (<img height='200' width='251' className="img-thumbnail" src="/assets/noimage.png" alt="No Image Available" />)
        }
        {this.state.processing ? <img src="/assets/balls.svg" /> : null}
      </div>
    )
  }

  render(){

    return(
      <form>
        <h4>{this.props.title}</h4>
        Name:
        <br/>
        <input ref="name" value={this.state.name} type="text" name="name" maxlength="255" onChange={this.checkName.bind(this)} />
        {this.state.errorName ? (<span> {this.state.errorName}<br/></span>)  : (<br/>)}
        Description: <br/>
        <input ref="descr" value={this.state.descr} type="text" name="descr" maxlength="255" onChange={this.checkDescr.bind(this)} />
        {this.state.errorDescr ? (<span> {this.state.errorDescr}<br/></span>)  : (<br/>)}
        <br/>
        {this.state.preview
            ? <br/>
            : (<input ref="file" type="file" name="file" onChange={this.loadImage.bind(this)} />)
        }
        {this.props.crop ? this.getPreview.call(this) : null}
        <br />
        {this.state.errorImage ? (<span> {this.state.errorImage}<br/></span>)  : (<br/>)}
        <button
          className="btn btn-default"
          type="submit"
          onClick={this.save.bind(this)}
          disabled={this.state.preview ? false : false}
          >{this.props.buttonText}
        </button>
        {this.state.preview
            ? (<span> or <button className="btn btn-danger" onClick={this.removePreview.bind(this)}>x</button><br /></span>)
            : <br/>
        }
      </form>
    )
  }
}

export default createContainer((props)=>{
  return {

  }
}, AddImage);
