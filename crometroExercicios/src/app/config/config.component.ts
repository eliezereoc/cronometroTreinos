import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  exercises: Exercise[] = [];

  exercise: Exercise = {
    name: '',
    duration: 30,
    repetitions: 3,
    preparation: 15,
    rest: 30,
  };

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.exercises.push(this.exercise);
    this.exercise = {...this.exercise, name: ''};
  }

  delete(i: number){
    this.exercises.splice(i, 1);
  }

}
