import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {environmentProd} from '../../../environments/environment.prod';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit{

  constructor(private baseService: BaseService) { }


  /*saveData() {
    console.log(this.baseService.create(environmentProd.endPoint.forums.create, {name: 'test'}));
  }*/

  ngOnInit(): void {
    console.log("mon log est : ",{name: 'test'});
  }
}
