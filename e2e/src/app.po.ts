import { browser, by, element } from 'protractor';
import { PageObjectBase } from './base-page.po';

export class AppPage extends PageObjectBase {

  constructor() {
    super('ion-app', '');
  }

  async load() {
    browser.waitForAngularEnabled(false);
    await super.load();
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
