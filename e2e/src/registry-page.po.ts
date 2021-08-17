import { PageObjectBase } from './base-page.po';
export class RegistryPage extends PageObjectBase {

    constructor() {
        super('app-registry', '/registry');
    }

    public async getRegistryNotification(id: string): Promise<string> {
        const ionLabel = this.getElement(`ion-label${id}`);
        await this.waitUntilVisible(ionLabel);
        const labelContent = await ionLabel.getText();
        return labelContent;
    }
}
