import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private _userService:UserService, private _snackbar:MatSnackBar, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this._userService.getToken();
      if (token) {
        return true;
      } else {
        this._snackbar.open('vous devez être authentifié pour accéder à cette page', 'ok' ,{verticalPosition:'top'})
        return this.router.navigate(['/']);
      }
  }

}
