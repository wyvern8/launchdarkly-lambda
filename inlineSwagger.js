const fs = require('fs');

let swaggerYaml = fs.readFileSync(__dirname + `/node_modules/launchdarkly-nodeutils/swagger.yaml`, 'utf-8').toString();
swaggerYaml = `module.exports.yaml = \`${escape(swaggerYaml)}\`;`;
fs.writeFileSync(__dirname + `/dist/src/setFlagState/swaggerYaml.js`, swaggerYaml);