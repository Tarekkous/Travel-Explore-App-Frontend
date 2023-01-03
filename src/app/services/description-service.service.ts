import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptionServiceService {


apiAllDescription:string='http://localhost:7000/description'
apiDescription:string='http://localhost:7000/description/'


  constructor(private _http:HttpClient) { }

getDescription():Observable<any>{
  return this._http.get(this.apiAllDescription);
};

getOneDescription(id:any):Observable<any>{
  return this._http.get(`${this.apiDescription}${id}`)
};
postDescription(id:any,description:any):Observable<any>{
  return this._http.post(`${this.apiDescription}${id}`, description);
};
updateDescription(id:any,description:any):Observable<any>{
  return this._http.put(`${this.apiDescription}${id}`,description);
};





}
