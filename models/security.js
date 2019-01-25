const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecuritySchema = new Schema(
   {
      secId: {
         type: String,
         unique: true,
         sparse: true
      },
      board: String,
      market: String,
      shortName: String,
      iSin: String,
      lotSize: Number
   },
   {
      timestamps: true,
      usePushEach: true
   }
);

const Security = mongoose.model('security', SecuritySchema);
module.exports = Security;
