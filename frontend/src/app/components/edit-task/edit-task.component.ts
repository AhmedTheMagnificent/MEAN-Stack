import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskId: string | undefined;
  listId!: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['taskId'];
      this.listId = params['listId'];
    });
  }

  updateTask(title: string): void {
    if (this.listId && this.taskId && title) {
      this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
        this.router.navigate(['/lists', this.listId]);
      });
    } else {
      console.warn('List ID, Task ID, or title is missing');
    }
  }
}
