import {React, useState} from "react";
import Eye from './Eye'; 
import Lock from './Lock'; 
import Input from './Input'; 
import classes from './login.module.css';

function Background(props) {
  const [isVisible, setVisible] = useState(true);

  const styles = {
    Visible: {
      background: '#26c9c3',
      color: '#17124a',
      type: 'text'
    },
    notVisible: {
      backgroundColor: '#17124a',
      color: '#26c9c3',
      type: 'password'
    },
  };

  return (
   
    <div className={classes.in} style={isVisible ? styles.Visible : styles.notVisible}>
      <Lock fillColor={isVisible ? styles.Visible.color : styles.notVisible.color} />
      <div className={classes.line} />
      <Input
        fillColor={isVisible ? styles.Visible.backgroundColor : styles.notVisible.backgroundColor}
        color={isVisible ? styles.Visible.color : styles.notVisible.color}
        type={isVisible ? styles.Visible.type : styles.notVisible.type}
        name={props.name} 
        value={props.value} 
        onChange={props.onChange} 
        placeholder={props.placeholder}
        id={props.id}
      />
      <Eye
        fillColor={isVisible ? styles.Visible.color : styles.notVisible.color}
        handleClick={() => setVisible(!isVisible)}
      />
    </div>
  );
}

export default Background;
