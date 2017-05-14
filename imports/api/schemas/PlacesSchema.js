import SimpleSchema from 'simpl-schema';
import ImagesSchema from './ImagesSchema'
import LastUpdateSchema from './LastUpdateSchema'

const PlacesSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
    max: 255
  },
  descr: {
    type: String,
    optional: false
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  lastUpdate: {
    type: LastUpdateSchema,
    optional: true
  },
  thumbnail: {
    type: ImagesSchema,
    optional: true
  },
  images:{
    type: Array,
    optional: true
  },'images.$': { type: ImagesSchema },
  ownerId: {
    type: String,
    optional: false
  },
  adminsIds:{
    type: Array,
    optional: true
  },'adminsIds.$': { type: String },


});

export default PlacesSchema;
