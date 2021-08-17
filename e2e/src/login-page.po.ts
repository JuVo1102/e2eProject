import { browser, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './base-page.po';
export class LoginPage extends PageObjectBase {

    constructor() {
        super('app-login', '/login');
    }

    public async getLoginButtonText(): Promise<string> {
        const ionButton = this.getElement(`ion-button[type="submit"]`);
        await this.waitUntilVisible(ionButton);
        const buttonContent = await ionButton.getText();
        return buttonContent;
    }

    public async getRegistryButtonText(): Promise<string> {
        const ionButton = this.getElement(`ion-button[routerLink="/registry"]`);
        await this.waitUntilVisible(ionButton);
        const buttonContent = await ionButton.getText();
        return buttonContent;
    }
}
