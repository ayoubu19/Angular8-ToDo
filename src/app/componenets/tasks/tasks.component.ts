import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  showForm = false ;
  editform = false  ;
  searchText = '' ;

  myTask:Task = {
   label : '' ,
   completed :false
 };
 tasks : Task[] = [] ;
 resultTasks : Task[] = [] ;
  constructor(private taskService:TaskService) { }

  ngOnInit() {

    this.getTasks();
  }

  getTasks(){

    this.taskService.findAll()
        .subscribe(data => {
          this.resultTasks = this.tasks = data ;


        });
  }

  onDeleteTask(taskId){
    this.taskService.delete(taskId)
      .subscribe( () => {

        this.tasks = this.tasks.filter(task => task.id != taskId );



      });
  }


  onSubmit(){
   this.taskService.persist(this.myTask)
       .subscribe( task => {

         this.tasks = [task , ...this.tasks];

         this.reset();
         this.showForm = !this.showForm ;

       });

  }

  reset(){
    this.myTask = {
      label : '' ,
      completed :false
    }

  }

  toggleCompleted(task){

    this.taskService.completed(task.id , task.commpleted)
        .subscribe( () => {

          task.completed = !task.completed ;

          });
  }

  editTask(task){
    this.showForm=!this.showForm ;
    this.myTask=task ;
    this.editform = !this.editform ;

  }

  onUpdate(){
    this.taskService.update(this.myTask)
        .subscribe(task =>{
          this.reset();
          this.editform=!this.editform ;
          this.showForm = !this.showForm ;
        }) ;

  }

  searchTasks(){


    this.resultTasks = this.tasks.filter(task => task.label.includes(this.searchText));


  }





}
