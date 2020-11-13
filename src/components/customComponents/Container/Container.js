import React from 'react'

import PropTypes from "prop-types";

import "./Container.css";

const Container = ({
  styleNumber,
  child,
  className,
}) => {
  
  const styles = ["containerV1", "containerV2"];
  
  return (
    <div className={`${styles[styleNumber]} ${className} my-container align-self-center`}>
      {child}
    </div>
  )
}


Container.propTypes = {
  styleNumber: PropTypes.number,
  child: PropTypes.node,
  className: PropTypes.string
};
Container.defaultTypes = {
  styleNumber: 0,
  child: null,
  className: '',
};


export default Container
