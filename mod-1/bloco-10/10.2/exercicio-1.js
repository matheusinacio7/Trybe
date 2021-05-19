module.exports = uppercase = (str, callback) => {
  setTimeout(() => {
    callback(str.toUpperCase());
  }, 200);
};