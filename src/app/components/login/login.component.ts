import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {


  userFormConnexion!: FormGroup;
  tkn!: any;
  user= new User()


  constructor(
    private _fb: FormBuilder,
    private Route: Router,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userFormConnexion = this._fb.group({
      email: [this.user.user_mail, Validators.required],
      password: [this.user.user_mdp, Validators.required],
    });
    // this.getApiUsers();
    // console.log(this.userFormConnexion.value);
  }
  onSubmit(): void {
    const inputValueMail = this.userFormConnexion.get('email')?.value;
    const inputValueMdp = this.userFormConnexion.get('password')?.value;
    // console.log(inputValue);
    var loginCords = { user_mail: inputValueMail, user_mdp: inputValueMdp };
    // subscribe to response of login
    this._userService.postLogin(loginCords).subscribe((response: any) => {
      try {
        console.log(response);
        this.tkn = response.accessToken;
        const objectUser = response
        // objet user(qui contient le token) stocké dans localstorage
        localStorage.setItem('userObj',JSON.stringify(objectUser) );
        //token stocké dans le localstorage
        localStorage.setItem('TOKEN',this.tkn );


        this.Route.navigate(['overview/home']);
      } catch (err) {
        this._snackBar.open('Wrong Mail Adress', 'Retry' ,{verticalPosition:'top'}); //dosent work ??
        console.log(err);
      }
    });
  }
  clickToRegister() {
    this.Route.navigate(['register']);
  }
}
