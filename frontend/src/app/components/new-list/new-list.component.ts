import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent {
  constructor(private taskService: TaskService, private router: Router) {}
  createList(title:string){
    this.taskService.createList(title).subscribe((list: List) => {
    console.log(list);
    this.router.navigate(['/lists', list._id]);
    })
  }
}
