/*
https://developers.google.com/identity/branding-guidelines
*/
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import ButtonBase from 'material-ui/ButtonBase';
import actions from 'api/actions';

const styles = theme => ({
  root: {
    color: blueGrey[500],
    position: 'absolute',
    height: '100%',
    width: '100%',
    fontSize: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    textAlign: 'center',
    fontSize: '3.5rem',
    margin: '9px 5px 0 5px',
    '&:before': {
      content: '\'\\0041\'',
      display: 'inline-block',
      fontFamily: 'zonaextrema',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 1,
    }
  },
  slogan: {
    textAlign: 'center',
    marginBottom: 50,
  },
  google: {
    textAlign: 'center',
  },
});


const Login = ({ classes, login }) => (
  <div className={classes.root}>
    <div className={classes.logo} />
    <div className={classes.slogan}>track. analyze. learn.</div>
    <div className={classes.google}>
      <ButtonBase focusRipple onClick={login}>
        <img alt="Google Sign-in" src={`${process.env.PUBLIC_URL}/images/google_signin_buttons/web/1x/btn_google_signin_light_pressed_web.png`} />
      </ButtonBase>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({
    type: actions.LOGIN_USER
  }),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(Login));