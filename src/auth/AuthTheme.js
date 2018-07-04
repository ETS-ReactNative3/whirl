import { StyleSheet } from 'react-native';
import { fonts } from '../theme';

/**
 * Styles used for the authorisation screens: SignIn, SignUp, ForgotPassword
 */

const AuthStyles = StyleSheet.create({
  title: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Billabong',
    fontSize: 65,
    fontWeight: '200',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowRadius: 0.3,
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  greeting: {
    textAlign: 'center',
    fontFamily: fonts.light,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'stretch'
  },
  inputLineContainer: {
    marginTop: 20,
    borderRadius: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ffffff'
  },
  button: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: fonts.bold,
    fontSize: 16,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  inputContainer: {
    marginTop: 20
  },
  spacer: {
    paddingTop: 20,
    margin: 20
  }
});

export { AuthStyles };
