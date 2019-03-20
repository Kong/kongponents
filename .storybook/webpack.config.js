/**
 * Extending storybook's default webpack config
 */
const path = require("path");

module.exports = async ({ config }) => {

  /* Remove svg from file loader */
  const rule_file_loader = config.module.rules.find(
    rule => rule.loader && rule.loader.indexOf('file-loader') > -1
  )
  rule_file_loader.test = RegExp(rule_file_loader.test.toString().replace('|svg', ''))
  
  config.module.rules.push(
    {
      test: /\.svg$/,
      loader: 'raw-loader'
    }
  );

  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post'
  })

  return config;
};
