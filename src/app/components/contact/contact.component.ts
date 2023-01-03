import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm!:FormGroup

constructor(private _contactService:ContactService, private _fb:FormBuilder){

}
ngOnInit():void{
this.contactForm = this._fb.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  message:['',Validators.required]
});



}

postForm():void{
  const firstName = this.contactForm.value.firstName
  const lastName = this.contactForm.value.lastName
  const email = this.contactForm.value.email
  const message = this.contactForm.value.message
  const formCords = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    message:message
  }
  this._contactService.postContact(formCords).subscribe((response:any)=>{
    console.log(response);
  })
  this.contactForm.reset()
};



};
