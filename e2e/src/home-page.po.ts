import { PageObjectBase } from './base-page.po';
export class HomePage extends PageObjectBase {

    constructor() {
        super('app-home', '/home/:id');
    }
}
