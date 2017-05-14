import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base'
import { Places, Images } from '../collections.js'

if(Meteor.isServer){
  const isOwner =  (placeId, userId) => Places.findOne(placeId).ownerId === userId;


  Meteor.methods({
    // Obj Example: {name: 'example', descr: 'example'}
    addNewPlace(obj, result){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      obj.ownerId = this.userId;
      return Places.insert(obj);

      // console.log('id: ' + id);
    },

    removePlace(){

    },

    updatePlace(placeId, obj){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      if( !isOwner(placeId, this.userId) ){
        throw new Meteor.Error('not-authorized');
      }
      obj.lastUpdate = { userId: this.userId };
      Places.update(placeId, {
        $set: {
          name: obj.name,
          descr: obj.descr,
          lastUpdate: obj.lastUpdate
        }
      })
    },

    addThumbnail(placeId, obj){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      if( !isOwner(placeId, this.userId) ){
        throw new Meteor.Error('not-authorized');
      }
      obj.lastUpdate = { userId: this.userId };
      Places.update(placeId, {
        $set: {
          thumbnail: obj,
          lastUpdate: { userId: this.userId }
        }
      });
    },

    removeThumbnail(placeId){
        if( !this.userId ){
          throw new Meteor.Error('not-authorized');
        }
        if( !isOwner(placeId, this.userId) ){
          throw new Meteor.Error('not-authorized');
        }
        const place = Places.findOne(placeId);
        if( !place )
          throw new Meteor.Error('no such place');
        const image = Images.findOne(place.thumbnail.imageId);
        if ( !image )
          throw new Meteor.Error('not such image');
        image.remove();
        Places.update(placeId, {
          $unset: {
            thumbnail: ""
          }
        })
    },

    updateThumbnail(placeId, obj){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      if( !isOwner(placeId, this.userId) ){
        throw new Meteor.Error('not-authorized');
      }
      obj.lastUpdate = { userId: this.userId };
      Places.update(placeId, {
        $set: {
          "thumbnail.name": obj.name,
          "thumbnail.descr": obj.descr,
          "thumbnail.lastUpdate": obj.lastUpdate,
          lastUpdate: obj.lastUpdate
        }
      })
    },

    isUser(email){
      const user = Accounts.findUserByEmail(email);
      if(user)
        return user._id;
      else
        return null
    },

    addAdmin(placeId, admindId){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      if( !isOwner(placeId, this.userId) ){
        throw new Meteor.Error('not-authorized');
      }
      //ci uzivatel existuje,
      //ci uz neni admin
      Places.update(placeId, {
        $push: {
          admins: adminId
        }
      });
    },

    removeAdmin(){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      if( !isOwner(placeId, this.userId) ){
        throw new Meteor.Error('not-authorized');
      }
    },

    addImage(placeId, obj){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      if( !isOwner(placeId, this.userId) ){
        throw new Meteor.Error('not-authorized');
      }
      obj.lastUpdate = { userId: this.userId };
      Places.update(placeId, {
        $set: {
          lastUpdate: obj.lastUpdate
        },
        $push: {
          images: obj
        }
      });
    },

    removeImage(placeId, imageId){
      if( !this.userId ){
        throw new Meteor.Error('not-authorized');
      }
      if( !isOwner(placeId, this.userId) ){
        throw new Meteor.Error('not-authorized');
      }
      const image = Images.findOne(imageId);
      if ( !image )
        throw new Meteor.Error('not such image');
      image.remove();
      Places.update(placeId, {
        $pull: {
          images:{
            imageId: imageId
          }
        }
      })
    }

  });

}

export default Places;
