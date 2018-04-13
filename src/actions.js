import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SHOW_SIGN_IN_CONFIRMATION_MODAL,
  SHOW_SIGN_UP_CONFIRMATION_MODAL,
  CONFIRM_SIGNUP,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE,
  CONFIRM_LOGIN,
  CONFIRM_LOGIN_SUCCESS,
  CONFIRM_LOGIN_FAILURE
} from './reducers/auth'

import { Alert } from 'react-native'
import { Auth } from 'aws-amplify'

function signUp() {
  return {
    type: SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err) {
  return {
    type: SIGN_UP_FAILURE,
    error: err
  }
}

export function createUser(username, password, given_name) {
  return (dispatch) => {
    dispatch(signUp())
    Auth.signUp({
      username,
      password,
      attributes: {
        given_name
      }
    })
    .then(data => {
      console.log('data from signUp: ', data)
      dispatch(signUpSuccess(data))
      dispatch(showSignUpConfirmationModal())
      setTimeout(() => {
        Alert.alert('Your signed up!', "Please verify your email address by following the link in the email sent to you. You must do this before using the app.")
      }, 0)

    })
    .catch(err => {
      console.log('error signing up: ', err)
      dispatch(signUpFailure(err))

      console.log('err msg: ', err.message)
      if (err.message == null) {
        errorMsg = err
      } else {
        errorMsg = err.message
      }

      if (errorMsg.replace(/\s+/g, '') === "Usernamecannotbeempty") {
        errorMsg = "Email address cannot be empty"
      }

      setTimeout(() => {
        Alert.alert('Error signing up', errorMsg)
      }, 0)
    });
  }
}

function logIn() {
  return {
    type: LOG_IN
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user: user
  }
}

function logInFailure(err) {
  return {
    type: LOG_IN_FAILURE,
    error: err
  }
}

export function authenticate(username, password) {
  return (dispatch) => {
    dispatch(logIn())
    Auth.signIn(username, password)
      .then(user => {
        dispatch(logInSuccess(user))
        dispatch(showSignInConfirmationModal())
      })
      .catch(err => {
        console.log('errror from signIn: ', err)
        dispatch(logInFailure(err))
        
        console.log('err msg: ', err.message)
        if (err.message == null) {
          errorMsg = err
        } else {
          errorMsg = err.message
        }

        if (errorMsg.replace(/\s+/g, '') === "Usernamecannotbeempty") {
          errorMsg = "Email address cannot be empty"
        }

        setTimeout(() => {
          Alert.alert('Error signing up', errorMsg)
        }, 0)
      });
  }
}

export function showSignInConfirmationModal() {
  return {
    type: SHOW_SIGN_IN_CONFIRMATION_MODAL
  }
}

export function showSignUpConfirmationModal() {
  return {
    type: SHOW_SIGN_UP_CONFIRMATION_MODAL
  }
}

export function confirmUserLogin(authCode) {
  return (dispatch, getState) => {
    dispatch(confirmLogIn())
    const { auth: { user }} = getState()
    console.log('state: ', getState())
    Auth.confirmSignIn(user, authCode)
      .then(data => {
        console.log('data from confirmLogin: ', data)
        dispatch(confirmLoginSuccess(data))
      })
      .catch(err => {
        console.log('error signing in: ', err)
        dispatch(confirmSignUpFailure(err))
      })
  }
}

function confirmLogIn() {
  return {
    type: CONFIRM_LOGIN
  }
}

function confirmLoginSuccess(user) {
  return {
    type: CONFIRM_LOGIN_SUCCESS,
    user
  }
}

function confirmLoginFailure() {
  return {
    type: CONFIRM_LOGIN_FAILURE,
    user
  }
}

export function confirmUserSignUp(username, authCode) {
  return (dispatch) => {
    // dispatch(confirmSignUp())
    dispatch(confirmSignUpSuccess())
    setTimeout(() => {
      Alert.alert('Is your email verified?', 'Once you have verified your email address you will be able to log in!')
    }, 0)
  }
}

function confirmSignUp() {
  return {
    type: CONFIRM_SIGNUP
  }
}

function confirmSignUpSuccess() {
  return {
    type: CONFIRM_SIGNUP_SUCCESS
  }
}

function confirmSignUpFailure(error) {
  return {
    type: CONFIRM_SIGNUP_FAILURE,
    error
  }
}
