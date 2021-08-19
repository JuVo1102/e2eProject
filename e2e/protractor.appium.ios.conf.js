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
      // Das sind die Appium Einstellungen. Wir geben hier
      // den Namen des Packages und der MainActivity an. Appium kann die App auch automatisch auf dem Gerät
      // deployen, dann muss hier der Pfad zur APK angegeben werden.
      browserName: '',
      app: 'platforms/ios/build/emulator/MyApp.app',
      appPackage: 'io.e2e.project',
      appActivity: 'io.e2e.project.MainActivity',
      platformName: 'ios',
      platformVersion: '14.5',
      automationName: 'XCUITest',
      deviceName: 'iPhone 11', // Angabe des Emulators ist wichtig
      udid: "BEBC694C-27EB-4775-8EC7-1EC2033327DB",
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
  baseUrl: 'ionic://localhost/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    browser.baseUrl = 'ionic://localhost/';
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
