import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

apiLogin:string = 'http://localhost:7000/login'
apiRegister:string = 'http://localhost:7000/user'
apiUsers:string = 'http://localhost:7000/user'

  constructor(private _http:HttpClient) { }


  postLogin(user:any):Observable<any>{
    return this._http.post(this.apiLogin,user)
  };
  postRegister(newUser:any):Observable<any>{
    return this._http.post(this.apiRegister,newUser)
  };
  getusers():Observable<any>{
    return this ._http.get(this.apiUsers)
  };

  // updateUser(id:any,value:any):Observable<any>{
  //   return this._http.put(this.apiLogin +id,value)
  // }

    // nexter le token stocké dans localstorage venant du login  pour le  récupérer dans le profil
getToken(){
  const newTkn = localStorage.getItem('TOKEN')
  if(newTkn) {
    return newTkn;
  }
  return null
}
};
