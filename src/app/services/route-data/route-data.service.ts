import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

// Service to handle userdata between routing
export class DataService {

  private data = [];

  constructor() { }

  setData(id, data) {
    if (id && data) {
      this.data[id] = data;
    }
  }

  getData(id) {
    if (id) {
      return this.data[id];
    }
  }
}
