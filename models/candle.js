const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandleSchema = new Schema(
   {
      date: Date,
      open: Number,
      close: Number,
      high: Number,
      low: Number,
      value: Number,
      volume: Number,
      security: {
         type: Schema.Types.ObjectId,
         ref: 'security'
      }
   },
   {
      timestamps: true,
      usePushEach: true
   }
);

const Candle = mongoose.model('candle', CandleSchema);
module.exports = Candle;
