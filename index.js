let handler = require('./dist/src/setFlagState/handler.js');

handler.handle({test: 'test'}, context, ((error, response) => {
    console.log(response);
}));