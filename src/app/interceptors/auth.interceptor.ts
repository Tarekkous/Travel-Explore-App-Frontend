import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  backApi = "http://localhost:7000/";

  constructor(private userService:UserService , private _snackBar:MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     console.log('request auth interceptor', request.url)
    //  on récupére le token
     const token = this.userService.getToken()
    //  si la requête contient l'API du back-end on la clone et on insère le token
     if (request.url.includes(this.backApi)) {
      const dolly = request.clone({
        headers:request.headers.set('Authorization', `Bearer ${token}`)})
        return next.handle(dolly).pipe(
          catchError((error: HttpErrorResponse) => {
            let message = ''
                    switch (error.status){
                    case 400: message = 'Bad Request'
                    break
                    case 401: message = 'Unauthorized'
                    break
                    case 403: message = 'Forbidden'
                    break
                    case 405: message ='E-mail already exist'
                    break
                    case 404: message ='Not Found'
                    break

                    }
                    this._snackBar.open(message, 'ok', {verticalPosition:'top'})
                    return next.handle(dolly)
                  })
        )
     }
    return next.handle(request);
  }
};
