import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-right',
  templateUrl: './side-bar-right.component.html',
  styleUrls: ['./side-bar-right.component.scss']
})
export class SideBarRightComponent {
  constructor(private _router:Router){

  }
  ngOnInit():void{
    console.log(localStorage.getItem('TOKEN'));
}
onDisconnect(){
  localStorage.clear()
  this._router.navigate(['/login'])
}
}
