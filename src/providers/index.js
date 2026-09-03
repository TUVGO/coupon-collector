const demo = require("./demo");
const providers = new Map([[demo.name, demo]]);

function getProvider(name) {
  const provider = providers.get(name);
  if (!provider) {
    const error = new Error(`Unknown provider: ${name}`);
    error.code = "PROVIDER_NOT_FOUND";
    throw error;
  }
  return provider;
}

module.exports = { getProvider };

