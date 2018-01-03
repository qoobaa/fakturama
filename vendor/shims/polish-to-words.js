(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['polishToWords'],
      __esModule: true,
    };
  }

  define('polish-to-words', [], vendorModule);
})();
