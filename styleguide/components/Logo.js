import React from 'react'
import PropTypes from 'prop-types'
import logo from './logo.png' // Tell Webpack this JS file uses this image

export function LogoRenderer({children}) {
  return <img src={logo} width="150" alt={children} />;
}

LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default LogoRenderer;
