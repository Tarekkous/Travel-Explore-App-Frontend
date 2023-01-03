import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  Api: string = 'http://localhost:7000/user/';
  user = new User();
  userCord!: FormGroup;
  objUser!: any;
  objUserGetted!:any;
  todolistId!:number;
  objetDesc!:any;
  constructor(
    private _fb: FormBuilder,
    private Route: Router,
    private _snackBar: MatSnackBar,
    private _http: HttpClient,
    private _userService: UserService,

  ) {}
  ngOnInit(): void {
    this.userCord = this._fb.group({
      firstName: this.user.user_firstName,
      lastName: this.user.user_lastName,
      email: [this.user.user_mail, Validators.required],
      password: [this.user.user_mdp, Validators.required],
      street: [''],
      city: [''],
      state: [''],
      zipCode: [''],
    });

    this.objUser = JSON.parse(localStorage.getItem('userObj') as any);
    console.log(this.objUser);

    //!TOKEN BUT NOT USED YET
    // const TOKEN = localStorage.getItem('token')
    // console.log(TOKEN);
    //!!!!!!!!!!!!!!!!! GET METHODE (localstorage is used instead of get method ) =>
    this._userService.getusers().subscribe((response: any) => {
      console.log(response[0]);
      this.objUserGetted = response[0]
    });


  }

  onUpdate(id: number, value: any) {
    // send Values of Form to Model User
    // this.userCord = Object.assign(this.user, this.userCord.value);
    // console.log(this.userCord);

    // update coords
    const firstname = this.userCord.value.firstName;
    const lastname = this.userCord.value.lastName;
    const email = this.userCord.value.email;
    const password = this.userCord.value.password;
    var newUser = {
      // authorization : this.objUser.accessToken,

      user_firstName: firstname,
      user_lastName: lastname,
      user_mail: email,
      user_mdp: password,
    };

    this._http.put(this.Api + id, (value = newUser)).subscribe();
    window.location.href = "/overview/profil"

  };
  onDelete(id:User){
    this._http.delete(this.Api + id).subscribe();
    this.Route.navigate(['login'])
  }
  onCancel(){
    this.Route.navigate(['overview/home'])

  }
}
