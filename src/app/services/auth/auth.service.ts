import { Injectable } from "@angular/core";
import firebase from 'firebase';
import { authParameter } from 'src/app/models/authparameter';

@Injectable({
  providedIn: 'root'
})

// Service for authentification processes on firebase
export class AuthService {

  constructor(){}

  doRegister(value: authParameter){
    try {
      if (value.email && value.password) {
        return new Promise<any>((resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
          .then(
            res => resolve(res),
            err => reject(err))
        });        
      }
    } catch (error) {
      throw error;
    }   
  }

  doLogin(value: authParameter){
    try {
      if (value.email && value.password) {
        return new Promise<any>((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(
            res => resolve(res),
            err => reject(err))
        });
      }
    } catch (error) {
      throw error;
    }   
  }

	doLogout(){
    try {
      return new Promise(() => {
        firebase.auth().signOut()
        }).catch((error) => {
          throw(error);
        });   
    } catch (error) {
      throw error;
    }     
  }
}