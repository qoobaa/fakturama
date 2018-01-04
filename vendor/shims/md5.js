(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['md5'],
      __esModule: true,
    };
  }

  define('md5', [], vendorModule);
})();
