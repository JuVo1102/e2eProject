import { threadId } from 'node:worker_threads';
import { browser, by, element, ElementFinder, ExpectedConditions, WebDriver } from 'protractor';

export class PageObjectBase {
  private path: string;
  protected tag: string;

  /**
   * 
   * @param tag element tag
   * @param path application path
   */
  constructor(tag: string, path: string) {
    this.tag = tag;
    this.path = path;
  }

  async load() {
    await browser.get(this.path);
    await this.waitUntilVisible();
    await browser.sleep(500);
  }

  rootElement() {
    return element(by.css(this.tag));
  }

  getElement(wantedElement: string) {
    return element(by.css(`${this.tag} ${wantedElement}`));
  }

  waitUntilInvisible() {
    return browser.wait(ExpectedConditions.invisibilityOf(this.rootElement()), 3000);
  }

  waitUntilPresent() {
    return browser.wait(ExpectedConditions.presenceOf(this.rootElement()), 3000);
  }

  waitUntilNotPresent() {
    return browser.wait(
      ExpectedConditions.not(ExpectedConditions.presenceOf(this.rootElement())),
      3000
    );
  }

  async waitUntilVisible(element?: ElementFinder) {
    if (element) {
      await browser.wait(ExpectedConditions.visibilityOf(element), 3000);
    }
    else {
      await browser.wait(ExpectedConditions.visibilityOf(this.rootElement()), 3000);
    }
  }

  async getTitle() {
    const wantedElement = this.getElement('ion-title');
    await this.waitUntilVisible(wantedElement);
    return wantedElement.getText();
  }

  async enterInputText(selectedElement: ElementFinder, text: string) {
    const inp = selectedElement.element(by.css('input'));
    await inp.sendKeys(text);
  }

  async enterTextareaText(selectedElement: ElementFinder, text: string) {
    const inp = selectedElement.element(by.css('textarea'));
    await inp.sendKeys(text);
  }

  async writeInput(input: string, text: string): Promise<void> {
    const ionTextfield = this.getElement(`ion-item ion-input[formControlName="${input}"]`);
    await browser.wait(ExpectedConditions.elementToBeClickable(ionTextfield), 4000);
    await ionTextfield.click();
    await this.enterInputText(ionTextfield, text);
  }

  async writeTextfield(input: string, text: string): Promise<void> {
    const ionTextfield = this.getElement(`ion-textarea[formControlName="${input}"]`);
    await browser.wait(ExpectedConditions.elementToBeClickable(ionTextfield), 4000);
    await ionTextfield.click();
    await this.enterTextareaText(ionTextfield, text);
  }

  async getInputText(input: string): Promise<string> {
    const ionTextfield = this.getElement(`ion-item ion-input[formControlName="${input}"]`);
    await browser.wait(ExpectedConditions.visibilityOf(ionTextfield), 4000);
    const inputContent = await ionTextfield.getAttribute("value");
    return inputContent;
  }

  async getTextfieldText(input: string): Promise<string> {
    const ionTextfield = this.getElement(`ion-textarea[formControlName="${input}"]`);
    await browser.wait(ExpectedConditions.visibilityOf(ionTextfield), 4000);
    const inputContent = await ionTextfield.getAttribute("value");
    return inputContent;
  }

  async getLabelText(id: string): Promise<string> {
    const wantedElement = this.getElement(id);
    this.waitUntilVisible(wantedElement);
    return wantedElement.getText();
  }

  async checkButtonClickable(buttonIdentifier: string): Promise<boolean> {
    const ionButton = this.getElement(`${this.tag}${buttonIdentifier}`);
    var clickable: boolean;
    try {
      await browser.wait(ExpectedConditions.elementToBeClickable(ionButton), 3000);
      clickable = true;
    }
    catch (error) {
      clickable = false;
    }
    return clickable;
  }
}
