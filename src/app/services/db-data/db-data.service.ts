import { Injectable } from '@angular/core';
import { DbService } from '../db-service/db-service.service';


@Injectable({
    providedIn: 'root'
})

// Service to manage data from the database between routing
export class DbDataService {

    private titles: string[];
    private title: string;
    private text: string;

    constructor(
        private DbService: DbService
    ) { }

    async setDbDataTitles(email: string) {
        try {
            if (email) {
                const titles = await this.DbService.getUserNoteTitles(email);
                if (titles) {
                    this.titles = titles;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    setDbDataTitle(title: string) {
        if (title) {
            this.title = title;
        }
    }

    getDbDataTitle() {
        if (this.title && this.title.length > 0) {
            return this.title;
        }
    }

    async setDbDataText(email: string, title: string) {
        if (email && email.length > 0 && title && title.length > 0) {
            try {
                this.text = await this.DbService.getUserNoteText(email, title);
            } catch (error) {
                throw error;
            }
        }        
    }

    getDbDataText() {
        if(this.text.length > 0) {
            return this.text;
        }
    }

    getDbData(): string[] {
        if(this.titles.length > 0) {
            return this.titles;
        }
    }
}
