import { Places, Images } from './collections'

const isAuthorized = (place, userId) => {
  if(!userId){
    return false;
  }
  //is root
  //to implement
  //is owner
  if(userId === place.ownerId){
    return true;
  }
  //is admin
  if(place.adminsIds.indexOf(userId)){
    console.log('je admin');
    return true;
  }
  return false //not root, owner, admin
}

if(Meteor.isServer){
    // ALL PLACES PUBLICATION, For main board
    Meteor.publish('placesBoardView', () => Places.find({},{
      fields: {
        'name': 1,
        'thumbnail': 1
      }
    }));

    // One Place
    Meteor.publish('singlePlaceView', (placeId) => {
      return Places.find({_id: placeId},{
        fields: {
          'name': 1,
          'descr': 1,
          'thumbnail': 1,
          'ownerId': 1, // only if owner
          'adminsIds': 1, //only if admin
          'images': 1
        }
      });
    });

    // One Place for editing
    Meteor.publish('editPlaceView', (placeId, userId) => {
      //Must Be Owner or Admin
      const place = Places.findOne({_id: placeId})
      if(place && isAuthorized(place, userId))
        return Places.find({_id: placeId});
      else
        return Places.find({_id: placeId},{
          fields: {
            'name': 1,
            'descr' : 1,
            'thumbnail': 1,
            'images': 1,
          }
        });
    });

    Meteor.publish('files.images.all', () => {
      return Images.find().cursor;
    });
}
