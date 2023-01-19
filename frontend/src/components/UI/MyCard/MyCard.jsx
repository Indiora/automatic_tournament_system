import React from 'react'
import Card from 'react-bootstrap/Card';
import classes from "./MyCard.module.css";


const MyCard = ({children, ...props}) => {

  return (
      <Card border="success" className={`${classes.cardForm}`} {...props}>
            {children}
      </Card>
  );
}

export default MyCard