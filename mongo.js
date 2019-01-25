const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect(
//    process.env.MONGODB_URI,
//    {
//       //useNewUrlParser: true
//       // useMongoClient: true
//    }
// );
const Candle = require('./models/candle');
const Security = require('./models/security');

module.exports = {
   init: async () => {
      const ok = await mongoose.connect(
         process.env.MONGODB_URI,
         { useNewUrlParser: true }
      );
      return ok;
   },

   Securities: () => {
      return [new Security({ secId: 'IMOEX', board: 'SNDX', market: 'index' })];
   }
};
