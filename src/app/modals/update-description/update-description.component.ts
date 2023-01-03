import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Description } from 'src/app/models/description';
import { DescriptionServiceService } from 'src/app/services/description-service.service';
@Component({
  selector: 'app-update-description',
  templateUrl: './update-description.component.html',
  styleUrls: ['./update-description.component.scss']
})


export class UpdateDescriptionComponent {
Description = new Description()
updateInput!:FormGroup;

constructor(@Inject (MAT_DIALOG_DATA) public data:any, private _fb:FormBuilder, private _descService:DescriptionServiceService){}

ngOnInit():void{
  console.log(this.data.todolist_id);


  this.updateInput = this._fb.group({
    taskUpdate:[this.Description.description,Validators.required]
  })
};
  //!METHODE UPDATE

  onUpdate(id:any , description:any):void{
  const value = this.updateInput.value.taskUpdate
  console.log(value);
  const newValueDesc = {description : value}

    this._descService.updateDescription(id,description = newValueDesc).subscribe((response:any)=>{
      console.log(response);
    });
    this.updateInput.reset()
    window.location.href = "/overview/lists"

  };

};
