import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  updateForm: FormGroup;
  returnUrl: string;
  hide = true;
  submitted = false;
  error: string;


  constructor() { }

  ngOnInit(): void {
  }

  get formFields() {
    return this.updateForm.controls;
  }
  
  onUpdate(): void {
    // TODO: implement this
    return;
  }

}
