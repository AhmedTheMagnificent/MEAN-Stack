import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const listId = params['listId'];
      if (listId) {
        this.taskService.getTasks(listId).subscribe((tasks: any) => {
          this.tasks = tasks;
        }, error => {
          console.error('Error fetching tasks:', error);
        });
      } else {
        console.warn('No listId found in route parameters');
      }
    });

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    }, error => {
      console.error('Error fetching lists:', error);
    });
  }
}
