// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [
    {
      // Das sind die Appium Einstellungen. Wir deployen die Anwendung vorher selbst auf dem Gerät und geben hier
      // den Namen des Packages und der MainActivity an. Appium kann die App auch automatisch auf dem Gerät
      // deployen, dann muss hier der Pfad zur APK angegeben werden.
      browserName: '',
      app: 'platforms/android/app/build/outputs/apk/debug/app-debug.apk',
      appPackage: 'de.gfa.GfAPlus',
      appActivity: 'de.gfa.GfAPlus.MainActivity',
      platformName: 'Android',
      platformVersion: '9.0',
      deviceName: 'Testdroid', // was hier steht ist egal, darf aber nicht leer sein
      autoAcceptAlerts: 'true',
      // Vorsicht bei der Rechtschreibung, ein groß geschriebenes 'V' verhinderte bei uns die Testausführung
      autoWebview: true,
      language: 'en',
      locale: 'US',
      autoWebviewTimeout: 20000,
      newCommandTimeout: 300000,
      fullReset: true,
      nativeWebScreenshot: true
    }
  ],
  maxSessions: 1,
  directConnect: false,
  seleniumAddress: 'http://localhost:4723/wd/hub',
  baseUrl: 'http://localhost/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    browser.baseUrl = 'http://localhost/';
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'e2e/report',
      docTitle: 'e2e_Report',
      preserveDirectory: false,
      jsonsSubfolder: 'jsons',
      screenshotsSubfolder: 'images',
      takeScreenShotsOnlyForFailedSpecs: true
   }).getJasmine2Reporter());
  }
};
