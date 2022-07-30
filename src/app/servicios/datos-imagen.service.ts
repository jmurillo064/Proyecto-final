import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosImagenService {

  private objectSource = new BehaviorSubject<{}>({});

  $getObjectSource = this.objectSource.asObservable();

  constructor() { }

  senObjectSource(data: any){
    this.objectSource.next(data);
  }
}
