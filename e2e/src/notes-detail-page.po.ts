import { browser, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './base-page.po';
export class notesDetailPage extends PageObjectBase {

    constructor() {
        super('app-notes-detail', 'notes-detail');
    }

    async getTextfieldContent() {
        const textArea = this.getElement("ion-textarea");
        await browser.wait(ExpectedConditions.elementToBeClickable(textArea), 4000);
        return await textArea.getText();
    }
}
