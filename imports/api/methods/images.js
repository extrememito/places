import { Images } from '../collections'

if(Meteor.isServer){
  Meteor.methods({

    getImageUri(imageId){
      const image = Images.findOne({_id: imageId})
      // const link = image.link();
      // console.log(link);
      // return link
      if (image){
        return image.link();
      }else{
        throw new Meteor.Error('no such image');
      }
    }
  });
}
