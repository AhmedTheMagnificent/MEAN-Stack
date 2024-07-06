import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  selectedListId: string | undefined;
  tasks: Task[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const listId = params['listId'];
      if (listId) {
        this.selectedListId = listId;
        this.taskService.getTasks(listId).subscribe(
          (tasks: Task[]) => {
            this.tasks = tasks;
          },
          error => {
            console.error('Error fetching tasks:', error);
          }
        );
      } else {
        console.warn('No listId found in route parameters');
      }
    });
  }

  onUpdateListClick(): void {
    console.log('Update list with id:', this.selectedListId);
    this.router.navigate(['/lists', this.selectedListId]);
  }
}
