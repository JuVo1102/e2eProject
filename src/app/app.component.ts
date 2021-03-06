import { Component } from '@angular/core';
import firebase from 'firebase';
import { firebaseEnvironment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    firebase.initializeApp(firebaseEnvironment.firebase);
  }
}
