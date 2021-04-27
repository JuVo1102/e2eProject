import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { databaseCount } from 'src/app/models/databaseCount';



@Injectable({
  providedIn: 'root'
})

// Service to manage data on the database (reading / writing)
export class DbService {

  database = firebase.database();

  constructor() { }

  async writeUserNoteData(email: string, noteTitle: string, noteText: string) {
    try {
      if (email && email.length > 0) {
        var count: databaseCount = {
          title: 'title',
          count: 0
        };
        var databaseCount: databaseCount = await firebase.database().ref('users/' + email.substring(0, email.length - 3) + '/count').once('value').then(datasnapshot => {
          return datasnapshot.val();
        });
        if (databaseCount) {
          count.count = databaseCount.count;
        }
        else {
          count.count = 0;
        }
        await this.database.ref('users/' + email.substring(0, email.length - 3) + `/notes/${noteTitle}`).set({
          title: noteTitle,
          text: noteText
        });
        await this.database.ref('users/' + email.substring(0, email.length - 3) + '/count').set({
          count: count.count + 1
        })
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserNoteTitles(email: string): Promise<string[]> {
    try {
      if (email && email.length > 0) {
        // Titles
        var noteTitles: string[] = await firebase.database().ref('users/' + email.substring(0, email.length - 3) + '/notes')
          .once('value').then(datasnapshot => {
            var data = datasnapshot.val();
            if (data) {
              const titles: string[] = Object.keys(data);
            return titles;
            }
            else {
              return [];
            }
          });
        return noteTitles;
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserNoteText(email:string, title:string): Promise<string> {
    try {
      if(email && email.length > 0 && title && title.length > 0) {
        var noteText: string = await firebase.database().ref('users/' + email.substring(0, email.length - 3,) + '/notes' + `/${title}`)
        .once('value').then(datasnapshot => {
          var data = datasnapshot.val();
          const text: string = data.text;
          return text;
        });
        return noteText;
      }
    } catch (error) {
      throw error;
    }
  }
}

