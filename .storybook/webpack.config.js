/**
 * Extending storybook's default webpack config
 */
const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  /* Remove svg from file loader */
  const rule_file_loader = defaultConfig.module.rules.find(
    rule => rule.loader && rule.loader.indexOf('file-loader') > -1
  )
  rule_file_loader.test = RegExp(rule_file_loader.test.toString().replace('|svg', ''))
  
  defaultConfig.module.rules.push(
    {
      test: /\.svg$/,
      loader: 'raw-loader'
    }
  );

  return defaultConfig;
};
