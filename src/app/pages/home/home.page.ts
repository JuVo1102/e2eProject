import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataResolverService } from 'src/app/services/data-resolver/data-resolver.service';
import { DbDataService } from 'src/app/services/db-data/db-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private data: any;
  public noteTitles: string[];

  constructor(
    private router: Router,
    private dbDataService: DbDataService,
    private dataresolver: DataResolverService,
    private route: ActivatedRoute) {
  }

  // Initializes the page and recieves email data from url and data from the database
  async ngOnInit() {
    try {
      this.data = this.dataresolver.resolve(this.route.snapshot);
      this.noteTitles = await this.dbDataService.getDbData();
      this.router.events.subscribe(async () => {
        this.noteTitles = await this.dbDataService.getDbData();
      });
    } catch (error) {
      throw error;
    }
  }

  // Navigation to the NewNote-page
  async NewNote() {
    try {
      if (this.data && this.data.email.length > 0) {
        this.router.navigateByUrl(`/newNote/${this.data.email}`);
      }
    } catch (error) {
      throw error;
    }
  }

  // Navigation to the NotesDetail-page
  async SelectNote(title: string) {
    try {
      if (title && title.length > 0 && this.data && this.data.email.length > 0) {
        this.dbDataService.setDbDataTitle(title);
        await this.dbDataService.setDbDataText(this.data.email, title);
        this.router.navigateByUrl(`/notes-detail`);
      }
    } catch (error) {
      throw error;
    }
  }
}
