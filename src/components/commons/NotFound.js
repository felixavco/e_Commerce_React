import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{margin: "3rem 0"}}>
      <h1 style={{fontSize: "15rem"}} className="center-align">404</h1>
      <h5 style={{margin: "1.5rem 0"}} className="center-align">PAGE NOT FOUND</h5>
      <h6 className="center-align"><Link to="/">Go To Home</Link></h6>
    </div>
  )
}

export default NotFound
