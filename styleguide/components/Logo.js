const React = require('react')
// const logo = require('./logo.png')

const name = 'Kong'
const version = '1.0'

// const Logo = () => React.createElement(
//   'a',
//   {
//     className: 'rsg-logo',
//     href: 'https://github.com/everydayhero/constructicon',
//     target: '_blank'
//   },
//   React.createElement('span', { className: 'rsg-logo-name' }, capitalize(name)),
//   React.createElement('em', { className: 'rsg-logo-version' }, version)
// )

const Logo = () => {
  const x = document.createElement("IMG");
  x.setAttribute("src", "img_pulpit.jpg");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  x.setAttribute("alt", "The Pulpit Rock");
  return x
}

module.exports = Logo
