import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataResolverService } from 'src/app/services/data-resolver/data-resolver.service';
import { DbDataService } from 'src/app/services/db-data/db-data.service';
import { DbService } from 'src/app/services/db-service/db-service.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {

  public data: any;
  notesForm: FormGroup;

  constructor(
    private formbBuilder: FormBuilder,
    private dbService: DbService,
    private router: Router,
    private dbDataService: DbDataService,
    private dataresolver: DataResolverService,
    private route: ActivatedRoute
  ) {
    // Formgroup
    this.notesForm = this.formbBuilder.group({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    })
  }

  // Initializes the page and recieves email data from url
  ngOnInit() {
    this.data = this.dataresolver.resolve(this.route.snapshot);
  }

  // Function to create a new note on the database via the dbService
  async CreateNewNote() {
    try {
      await this.dbService.writeUserNoteData(this.data.email, this.notesForm.value.title, this.notesForm.value.text);
      await this.dbDataService.setDbDataTitles(this.data.email);
      this.router.navigateByUrl(`/home/${this.data.email}`);
    } catch (error) {
      throw (error);
    }
  }
}
