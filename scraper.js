const mongo = require('./mongo');
const moex = require('./moex');
const Security = require('./models/security');
const Candle = require('./models/candle');

const MOEX_START_DATE = '2003-01-01';

async function updateImoex() {
   let imoex = await Security.findOne({ secId: 'IMOEX' });
   if (!imoex) {
      imoex = new Security({ secId: 'IMOEX', board: 'SNDX', market: 'index', shortName: 'Индекс Мосбиржи' });
      await imoex.save();
   }
   const secs = await moex.Candles(imoex, MOEX_START_DATE);
   if (secs && secs.length > 0) await Candle.insertMany(secs);
   return true;
}

async function scrape() {
   let ok = await mongo.init();
   ok = await updateImoex();
   return ok;
}

scrape()
   .then(() => {
      console.log('Done');
   })
   .catch(err => {
      console.log(err);
   });
