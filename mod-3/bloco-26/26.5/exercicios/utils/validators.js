export function validateEmail(email) {
  return /.+@.+\..+/.test(email);
}

export function validatePassword(password) {
  if (!/^[-+]?(\d+|Infinity)$/.test(password)) {
    return false;
  }

  if (password.length < 4 || password.length > 8) {
    return false;
  }

  return true;
}
