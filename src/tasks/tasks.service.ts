import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [] 

    async getAllTasks(): Promise<Task[]> {
        return this.tasks;
    }

    createTask(title: string, description: string) : Task {
        const task: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatusById(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);

        if(!task){
            return null;
        }

        task.status = status;

        return task;
    }
}

