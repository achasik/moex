// const Candle = require('./models/candle');
const Axios = require('axios');

const axios = Axios.create({
   baseURL: 'http://iss.moex.com/iss',
   headers: {
      Accept: 'text/html, application/xhtml+xml, */*',
      'Accept-Language': 'en-US,en;q=0.7,ru;q=0.3',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
      'Accept-Encoding': 'gzip, deflate'
   },
   proxy: process.env.PROXY_HOST
      ? {
           host: process.env.PROXY_HOST,
           port: process.env.PROXY_PORT
        }
      : false
});

module.exports = {
   Candles: async (sec, from, start = 0) => {
      const url = candleUrl(sec, from, start);
      const res = await axios.get(url);
      const columns = res.data.history.columns;
      const data = res.data.history.data;
      const cursor = res.data['history.cursor'].data[0];
      let candles = data.map(row => {
         const close = rowElm(row, columns, 'CLOSE');
         return {
            date: Date.parse(rowElm(row, columns, 'TRADEDATE')),
            open: rowElm(row, columns, 'OPEN') || close,
            close: close,
            high: rowElm(row, columns, 'HIGH') || close,
            low: rowElm(row, columns, 'LOW') || close,
            value: rowElm(row, columns, 'VALUE'),
            security: sec
         };
      });
      return candles;
   }
};

function rowElm(row, columns, name) {
   const idx = columns.indexOf(name);
   if (idx === -1) throw `Column name not found ${name}`;
   return row[idx];
}
function candleUrl(sec, from, start) {
   // return `/history/engines/stock/markets/${sec.market}/boards/${sec.board}/securities/${sec.secId}/candleborders.json?from=${from}`;
   return `/history/engines/stock/markets/${sec.market}/securities/${sec.secId}/candleborders.json?from=${from}&start=${start}`;
}
