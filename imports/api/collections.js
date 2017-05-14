import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

import PlacesSchema from './schemas/PlacesSchema';


const Places = new Mongo.Collection('places');
Places.attachSchema(PlacesSchema);

const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  storagePath :'/Users/Miro/Documents/MeteorProjects/uploads',
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});


export { Places, Images };
