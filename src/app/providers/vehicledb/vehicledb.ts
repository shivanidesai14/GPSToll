import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { vehicle } from '../classes/classVehicle';


@Injectable()
export class VehicledbProvider {
  public url = 'http://localhost:3000/vehicles/';
  public url2 = 'http://localhost:3000/vehicle_user/';

  vcle: vehicle[] = [];
  constructor(public http: HttpClient) {

  }
  getVehicleByno(vno: string) {
      return this.http.get(this.url + vno);
  }
  getAllVehicle() {
      console.log('welcome to provider');
    return this.http.get(this.url);
  }
  getVehicleByUser(uid: number) {
    return this.http.get(this.url2 + uid);
  }
  addVehicle(vcle: any) {
    console.log(vcle);
    const body = JSON.stringify(vcle);
    return this.http.post(this.url, body, {headers: new HttpHeaders().set('Content-type' , 'application/json')});
  }

  deleteVehicleByUser(vehicle_no: number) {
    return this.http.delete(this.url + vehicle_no, {headers: new HttpHeaders().set('Content-type' , 'application/json')});
  }

}
