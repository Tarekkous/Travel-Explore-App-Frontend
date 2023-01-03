import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DescriptionServiceService } from 'src/app/services/description-service.service';
import { Description } from 'src/app/models/description';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDescriptionComponent } from '../../update-description/update-description.component';
import * as html2pdf from 'html2pdf.js'
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  inputTest!:any;
  Description = new Description();
  allDescriptions!:any;
  inputDesc !: FormGroup;
  task!:any;
  apiDescription:string='http://localhost:7000/description/'

  constructor(@Inject (MAT_DIALOG_DATA) public dataList:any , private _descService:DescriptionServiceService, private _fb:FormBuilder, private _http:HttpClient, private _dialog:MatDialog, private _dialogRef:MatDialogRef<any>){

  }

  //!PDF DOWNLOAD SETTINGS
  download(){
    var element = document.getElementById('todo-list');
    var opt = {
    margin:       1,
    filename:     'Todo-vacation.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();

  }


  ngOnInit():void{
    console.log(this.dataList);
    this.inputDesc = this._fb.group({
      description: ['',Validators.required],

    });



  //!METHODE GET
    this._descService.getOneDescription(this.dataList.todolist_id).subscribe((response:any)=>{
      console.log('objet Desc',response);
      this.allDescriptions = response
      this.allDescriptions.forEach((task: any) => {
        console.log(task.description);
        this.task = task
      });
    });

  };
  //!METHODE POST
  postTask(id:any,description:any):void{
    const inputText = this.inputDesc.value.description
    this.inputTest = this.inputDesc.value.description
    const inputObj = {description:inputText}
    console.log(inputText);
    this._descService.postDescription(id,description = inputObj).subscribe((Response:any)=>{
      console.log(Response);
    });
    this.inputDesc.reset()
    // rappel de methode GET pour pas avoir besoin de rafraichir la page à chaque ajout
    this._descService.getOneDescription(this.dataList.todolist_id).subscribe((response:any)=>{
      this.allDescriptions = response})
  };
  //!METHODE DELETE
  onDelete(id:Description):void{
    this._http.delete(this.apiDescription + id).subscribe();
    this.allDescriptions = this.allDescriptions.filter((desc:any)=> desc.detail_id !== id)
  };

  onOpenModal(desc:any):void{
    let modal = this._dialog.open(UpdateDescriptionComponent,{
      height : '150px',
      width : '300px',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
      data : desc

    })
  }
  onExit(){
    this._dialogRef.close()
  }



};
