import SimpleSchema from 'simpl-schema';
import LastUpdateSchema from './LastUpdateSchema';

const ImagesSchema = new SimpleSchema({
  imageId: String,
  uri: String,
  name: String,
  descr: String,
  lastUpdate: LastUpdateSchema
});

export default ImagesSchema;
