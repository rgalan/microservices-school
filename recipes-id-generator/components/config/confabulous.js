const path = require('path');

module.exports = ({ confabulous } = {}) => {

  const Confabulous = confabulous || require('confabulous');
  const loaders = Confabulous.loaders;
  let config;

  const start = (cb) => {
    if (config) return cb(null, config);

    new Confabulous()
      .add(config => loaders.require({ path: path.join(process.cwd(), 'config', 'default.js'), watch: true }))
      .add(config => loaders.require({ path: path.join(process.cwd(), 'config', `${process.env.SERVICE_ENV}.js`), mandatory: false }))
      .add(config => loaders.require({ path: path.join(process.cwd(), 'secrets', 'secrets.json'), watch: true, mandatory: false }))
      .add(config => loaders.args())
      .on('loaded', cb)
      .on('error', cb)
      .end(cb);
  };

  return { start };
};
