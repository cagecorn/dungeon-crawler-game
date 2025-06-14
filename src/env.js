(function(global){
  function isTestEnvironment(){
    return typeof navigator !== 'undefined' && navigator.userAgent &&
      /Node\.js|jsdom/i.test(navigator.userAgent);
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isTestEnvironment };
    global.isTestEnvironment = isTestEnvironment;
  } else {
    global.isTestEnvironment = isTestEnvironment;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
