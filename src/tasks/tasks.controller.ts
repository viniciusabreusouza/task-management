import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto.title, createTaskDto.description);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id') id: string,
        @Body('status') status: TaskStatus) : Task {
        return this.tasksService.updateTaskStatusById(id, status);
    }
}
