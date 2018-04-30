import React from 'react'
import PropTypes from 'prop-types'
import logo from './logo.png'

export function LogoRenderer({children}) {
  return <img src={logo} width="150" alt={children} />;
}

LogoRenderer.propTypes = {
  children: PropTypes.node,
}

export default LogoRenderer;
