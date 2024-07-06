import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';
import { List } from './models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private webReqService: WebRequestService) { }

  createList(title: string): Observable<List> {
    return this.webReqService.post<List>('lists', { title });
  }

  getLists(): Observable<List[]> {
    return this.webReqService.get<List[]>('lists');
  }

  createTask(title: string, listId: string): Observable<Task> {
    return this.webReqService.post<Task>(`lists/${listId}/tasks`, { title });
  }

  getTasks(listId: string): Observable<Task[]> {
    return this.webReqService.get<Task[]>(`lists/${listId}/tasks`);
  }

  complete(task: Task): Observable<any> {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, { completed: !task.completed });
  }

  deleteList(id: string){
    return this.webReqService.delete(`lists/${id}`);
  }
}
