module.exports = {
  indexHTMLDebugApp: {
    src : 'app/index.html', dest : 'tmp/result/index.html',
    options: { context: { dist: false, tests: false } }
  },
  indexHTMLDistApp: {
    src : 'app/index.html', dest : 'tmp/result/index.html',
    options: { context: { dist: true, tests: false } }
  },
  appHTMLDebugApp: {
    src : 'app/app.html', dest : 'tmp/result/app.html',
    options: { context: { dist: false, tests: false } }
  },
  appHTMLDebugTests: {
    src : 'app/app.html', dest : 'tmp/result/tests/app.html',
    options: { context: { dist: false, tests: true } }
  },
  appHTMLDistApp: {
    src : 'app/app.html', dest : 'tmp/result/app.html',
    options: { context: { dist: true, tests: false } }
  },
  appHTMLDistTests: {
    src : 'app/app.html', dest : 'tmp/result/tests/app.html',
    options: { context: { dist: true, tests: true } }
  }
};
