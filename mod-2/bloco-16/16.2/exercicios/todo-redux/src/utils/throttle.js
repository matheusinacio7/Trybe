const throttle = (original, limit) => {
  let waiting = false;

  return function() {
    if (!waiting) {
      original.apply(this, arguments);
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};

export default throttle;
