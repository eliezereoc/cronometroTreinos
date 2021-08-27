import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy{

  @Input() exercises: Exercise[] = [];
  currentEx: number = 0;
  currentRep: number = 0;
  phase: number = 0;
  timeLeft: number = 0;
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.restart();
  }

  formatePhase(phase: number) {
    let retorno: string = '';
    
    switch (phase) {
      case 0:
        retorno = 'Preparação';
        break;
      case 1:
        retorno = 'Exercícios';
        break;
      case 2:
        retorno = 'Descanso';
        break;
    }
    return retorno;
  }

  restart() {
    this.currentEx = 0;
    this.currentRep = 0;
    this.phase = 0;
    const ex = this.exercises[this.currentEx];
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  next() {
   
    if(this.phase < 2) {
      this.phase++;    
    } else {
      const ex = this.exercises[this.currentEx];
      if(this.currentRep < ex.preparation - 1){
        this.currentRep++;
        this.phase = 1;
      } else {
        if(this.currentEx < this.exercises.length) {
          this.currentEx++;
          this.currentRep = 0;
          this.phase = 0;
        } else {
          return;
        }
      }
    }       
    this.timeLeft = this.getTimeOfCurrentPhase();  
  }

  getTimeOfCurrentPhase() {
    let retorno: number = 0;
    const ex = this.exercises[this.currentEx];
    switch (this.phase) {
      case 0:
        retorno = ex.preparation * 10;
        break;
      case 1:
        retorno = ex.duration * 10;
        break;
      case 2:
        retorno = ex.rest * 10;
        break;
    }
    return retorno;
  }

  start() {
    if(!this.interval){
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.next();
        }      
      }, 100); 
    }       
  }

  pause() {
    if(this.interval){
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  ngOnDestroy() {
    this.pause();
  }

  formatTimeLeft(time: number) {
    return (time / 10).toString();
  }

}
