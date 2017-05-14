import SimpleSchema from 'simpl-schema';

const LastUpdateSchema = new SimpleSchema({
  userId: {
    type:String,
    optional: true
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if(this.isUpdate) {
        if(this.siblingField('userId').isSet)
          return new Date();
      }
    },
    optional: true
  },
});

export default LastUpdateSchema;
