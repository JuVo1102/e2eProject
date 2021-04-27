import { Component, OnInit } from '@angular/core';
import { DbDataService } from 'src/app/services/db-data/db-data.service';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.page.html',
  styleUrls: ['./notes-detail.page.scss'],
})
export class NotesDetailPage implements OnInit {

  private noteTitle: string;
  private noteText: string;

  constructor(
    private dbDataService: DbDataService
  ) { }
  // Initializes the page and recieves email data from the database
  async ngOnInit() {
    try {
      this.noteTitle = this.dbDataService.getDbDataTitle();
      this.noteText = this.dbDataService.getDbDataText();
    } catch (error) {
      throw error;
    }
  }
}
