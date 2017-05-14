import SimpleSchema from 'simpl-schema';

if(Meteor.isServer){

  // Accounts.config({
  //   forbidClientAccountCreation : true
  // });

  Accounts.validateNewUser((user) => {
    // ADD validation rules

    new SimpleSchema({
      _id: { type: String },
      emails: { type: Array },
      'emails.$': { type: Object },
      'emails.$.address': { type: String },
      'emails.$.verified': { type: Boolean },
      createdAt: { type: Date },
      services: { type: Object, blackbox: true }
    }).validate(user);
    // Return true to allow user creation to proceed
    return true;
  });

  Meteor.methods({
    createUsers(email, pass){
      Accounts.createUser({
        email: email,
        password: pass
      });
    }
  });
}
