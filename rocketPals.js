const fs = require('fs')
const path = require('path')

console.log(process.argv);

const shared = require('./shared');
const config = shared.readConfig();
let args = process.argv.slice(2);

let vars = `

// ========== ROCKETPALS ENVIROMENT =============
var ROCKETPALS = {};
ROCKETPALS.VERSION = "${args[0] || config.rocketPals.version}";
ROCKETPALS.FSCOLL  = "${args[1] || config.rocketPals.firestoreCollection}";

`;

function validateVariables() {
  console.log(`
  // ==============================================
  // ========== ROCKETPALS ENVIROMENT =============
  ROCKETPALS.VERSION = "${args[0] || config.rocketPals.version}";
  ROCKETPALS.FSCOLL  = "${args[1] || config.rocketPals.firestoreCollection}";
  // ==============================================
  `);
}

function addConfig(projectRoot) {
  return new Promise((resolve, reject) => {
    console.log("✔️ Adding RocketPals Enviroment Variables");
    var settingsLocation = path.resolve(projectRoot, '__settings__.js');
    var indexContents = fs.readFileSync(settingsLocation, 'utf-8');
    indexContents += vars;
    fs.writeFileSync(settingsLocation, indexContents);
    resolve(projectRoot);
  });
}

module.exports = {
  validateVariables,
  addConfig
}