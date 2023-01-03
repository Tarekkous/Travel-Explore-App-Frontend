import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lists } from 'src/app/models/lists';
import { TodolistService } from 'src/app/services/todolist.service';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionComponent } from 'src/app/modals/description-modal/description/description.component';
import { DescriptionServiceService } from 'src/app/services/description-service.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})

export class ListsComponent {

  Lists= new Lists()
  allLists!:any;
  newList !:FormGroup
  objUser!:any;
  deleteApi:string="http://localhost:7000/list/"
  deleteApiAllDesc:string="http://localhost:7000/description/"

  constructor(private _http:HttpClient , private _todolistService:TodolistService, private _fb:FormBuilder, private _dialog:MatDialog) { }

  ngOnInit() {
    this.newList = this._fb.group({
      listAdded : [this.Lists.list_title, Validators.required],
      listModified : [this.Lists.list_title, Validators.required]

    })
    this.objUser = JSON.parse(localStorage.getItem('userObj') as any);
    console.log(this.objUser.loginUser);
    //!methode pour GET toutes les listes de tout les users
  //  this._todolistService.getLists().subscribe((lists:Lists)=>{
  //   console.log(lists);
  //   this.allLists = lists
  //  });
    //!methode pour GET toutes les listes du user connecté(UNIQUE)
   this._todolistService.getOneList(this.objUser.loginUser.user_id).subscribe((data:Lists)=>{
    console.log(data);
    this.allLists = data


   });
   let monImage: string = '';


  };
//! ADD INPUT BAR TO ALLOW US TO ADD LIST
addList(){
this.allLists.push({"liste_title":""})
}
//! POST LIST
validateList(id:any,newList:any){
  const inputList = this.newList.value.listAdded
  console.log(inputList);
  const listObj = {list_title:inputList}
  this._todolistService.postLists(id, newList = listObj ).subscribe((response:any)=>{
    console.log(response);
  });
  this.newList.reset()
  // window.location.href = "/overview/lists"
  // solution pour rafraichir la page sans utiliser de filter
  this._todolistService.getOneList(this.objUser.loginUser.user_id).subscribe((data:Lists)=>{
    console.log(data);
    this.allLists = data
   });
};
//!DELETE LIST
deleteList(id1:any,id2:any){
  this._http.delete(`${this.deleteApi}${id1}/${id2}`).subscribe();
console.warn(`list with list id : ${id1} has been deleted`);
this.allLists = this.allLists.filter((list:any) => list.todolist_id !== id1);

};
//!UPDATE LIST
updateList(id:any,titleUpd:any){
  const inputList = this.newList.value.listModified
  console.log(inputList);
  const listModified = {list_title:inputList}
  this._todolistService.updateLists( id, titleUpd = listModified).subscribe((response:Lists)=>{
    console.log(response);
  });
  // solution pour rafraichir la page sans utiliser de filter
  this._todolistService.getOneList(this.objUser.loginUser.user_id).subscribe((data:Lists)=>{
    console.log(data);
    this.allLists = data
   });
   this.newList.reset();
};

onOpenModal(list:any):void{
let modal = this._dialog.open(DescriptionComponent, {
  width:'800px',
  height:'800px',
  enterAnimationDuration:'500ms',
  exitAnimationDuration: '500ms',
  data : list,
});

};

};
