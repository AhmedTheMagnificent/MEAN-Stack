import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../models/task.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  selectedListId: string | undefined;
  tasks: Task[] = [];
  listForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder
  ) { 
    this.listForm = this.fb.group({
      title: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const listId = params['listId'];
      console.log('Route parameters:', params); // Log route parameters for debugging
      if (listId) {
        this.selectedListId = listId;
        this.fetchTasks(listId); // Fetch tasks for the selected list
      } else {
        console.warn('No listId found in route parameters');
      }
    });
  }

  fetchTasks(listId: string): void {
    this.taskService.getTasks(listId).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        console.log('Tasks fetched successfully:', tasks); // Log fetched tasks for debugging
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onUpdateListClick(title: string): void {
    console.log(this.selectedListId, title);
    if (this.selectedListId && title) {
      this.taskService.updateList(this.selectedListId, title).subscribe(
        () => {
          console.log('List updated successfully');
          this.router.navigate(['/lists', this.selectedListId]); // Navigate to the list view after update
        },
        error => {
          console.error('Error updating list:', error);
        }
      );
    } else {
      console.warn('No selected list to update or title is empty');
    }
  }

  onDeleteListClick(): void {
    if (this.selectedListId) {
      this.taskService.deleteList(this.selectedListId).subscribe(
        () => {
          console.log('List deleted successfully');
          this.router.navigate(['/']); // Navigate to the home page after delete
        },
        error => {
          console.error('Error deleting list:', error);
        }
      );
    } else {
      console.warn('No selected list to delete');
    }
  }
}
