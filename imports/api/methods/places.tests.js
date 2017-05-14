import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import Places  from './Places';

if (Meteor.isServer) {
  describe('Places', () => {
    describe('insert validation', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(()=>{
        Places.remove({});
      });

      it('can insert valid place', () => {
        Places.insert({
          name: "Meno",
          descr: "popis",
          lastUpdate: {
          },
          ownerId: userId
        });
        assert.equal(Places.find().count(), 1);
      });

      it('can add thumbnail', () => {
        taskId = Places.insert({
          name: "Meno",
          descr: "popis",
          lastUpdate: {
          },
          ownerId: userId
        });

        Places.update(taskId, {
          $set: {
            thumbnail: {
              name: "obrazok",
              descr: "popis",
              uri: "url",
              lastUpdate: {
              },
            },
            lastUpdate: {
            },
          }
        });
      });
      it('can not insert invalid place', () => {
        try{
          Places.insert({
            name: "Meno",
            descripton: "popis"
          });
        }catch(e){
          assert.equal(Places.find().count(), 0);
        }
      });
    });
    describe('methods', () => {
      Places.remove({});
      const userId = Random.id();
      let placeId;

      it('can add new place', ()=>{
        const addNewPlace = Meteor.server.method_handlers['addNewPlace'];
        const invocation = { userId };
        const obj = {
          name: "miro",
          descr: "nejaky popis"
        };
        placeId = addNewPlace.apply(invocation, [obj]);
        // console.log(Places.find().fetch());
        console.log(placeId);
      });

      it('can add thumbnail', ()=>{
        const addThumbnail = Meteor.server.method_handlers['addThumbnail'];
        const invocation = { userId };
        const obj = {
          name: "thubmanil",
          descr: "nejaky popis thumbnail",
          uri: "url"
        };
        addThumbnail.apply(invocation, [placeId, obj]);

      });
    });
  });
}
