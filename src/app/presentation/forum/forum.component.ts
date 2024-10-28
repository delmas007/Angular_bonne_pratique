import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {environmentProd} from '../../../environments/environment.prod';
import {NgIf} from '@angular/common';
import {Forum} from '../../domains/interfaces/forum';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit{
  form!: FormGroup;
  forum:Forum ={
    name :"",
    description: ""

  }
  constructor(private baseService: BaseService ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required,Validators.minLength(5)])
    });
  }

  isInvalidateInput(input: AbstractControl<any>){
    return input.invalid && (input.touched || input.dirty) ;
  }

  saveData() {
    this.forum.name = this.form.value.name;
    this.forum.description = this.form.value.description
    this.baseService.create(environmentProd.endPoint.forums.create, this.forum).subscribe({
      next:(response: any)=>{
        console.log(response)
      },
      error:(error:any)=>{
        console.log(error)
      }
    });
  }

}
