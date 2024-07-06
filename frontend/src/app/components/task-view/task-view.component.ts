import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = [];
  selectedListId?: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

    this.taskService.getLists().subscribe(
      (lists: List[]) => {
        this.lists = lists;
      },
      error => {
        console.error('Error fetching lists:', error);
      }
    );
  }

  onTaskClick(task: Task): void {
    this.taskService.complete(task).subscribe(
      () => {
        console.log('Task completed successfully');
        task.completed = !task.completed;
      },
      error => {
        console.error('Error completing task:', error);
      }
    );
  }

  onDeleteListClick(): void {
    if (this.selectedListId) {
      this.taskService.deleteList(this.selectedListId).subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/lists']);
          // Optionally, perform any additional actions after deletion
        },
        error => {
          console.error('Error deleting list:', error);
        }
      );
    }
  }
}
