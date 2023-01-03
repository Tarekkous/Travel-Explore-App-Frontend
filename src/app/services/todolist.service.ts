import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodolistService {

apiList:string="http://localhost:7000/list/"
apiListOneUser:string="http://localhost:7000/allLists/"

  constructor(private _http:HttpClient) { }

getLists():Observable<any>{
  return this._http.get(this.apiList);
}
postLists(id:any ,newList:any):Observable<any>{
  return this._http.post(this.apiList + id , newList)
}
updateLists(id:any, modifiedList:any):Observable<any>{
  return this._http.put(`${this.apiList}${id}` , modifiedList)
}
getOneList(id:any):Observable<any>{
  return this._http.get(this.apiListOneUser + id);
}

};
