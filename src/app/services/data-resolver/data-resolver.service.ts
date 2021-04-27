import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../route-data/route-data.service';

@Injectable({
  providedIn: 'root'
})

// Service to recieve data from current url
export class DataResolverService {

  constructor(private dataService: DataService) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    try {
      if(route) {
        let id = route.paramMap.get('id');
        return this.dataService.getData(id);
      }
    } catch (error) {
      throw error;
    }
  }
}
