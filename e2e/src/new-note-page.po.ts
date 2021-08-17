import { PageObjectBase } from './base-page.po';
export class newNotePage extends PageObjectBase {

    constructor() {
        super('app-new-note', '/newNote/:id');
    }
}
