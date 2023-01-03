import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiContact:string="http://localhost:7000/contact"

  constructor(private _http:HttpClient) { }

  postContact(formInfos:any):Observable<any>{
    return this._http.post(this.apiContact,formInfos)
  }
}
