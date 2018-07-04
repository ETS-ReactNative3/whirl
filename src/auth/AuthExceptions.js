const Exceptions = {
  UserNotFoundException: 'User not found.'
};

export function AuthExceptions(exception) {
  let msg = '';
  if (typeof exception === 'string') {
    msg = exception;
  } else if (exception.code) {
    msg = exception.code;
  } else {
    msg = JSON.stringify(exception);
  }

  console.log(msg);

  return Exceptions[msg];
}
