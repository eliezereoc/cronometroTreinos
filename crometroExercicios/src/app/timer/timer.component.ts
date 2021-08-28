import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Exercise } from '../exercise';
import { TimerSErvice } from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy{

  interval: any;

  constructor(public ts: TimerSErvice) { }

  ngOnInit(): void {
    this.ts.restart();
  }
  
  start() {
    let lastTime = Date.now();

    if(!this.interval){
      this.interval = setInterval(() => {
        let currentTime = Date.now();
        let ellapsedTimeMs = currentTime - lastTime;
        lastTime = lastTime;
        this.ts.decrementTimeLeft(ellapsedTimeMs);      
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

  restart(){
    this.ts.restart();
  }
  next(){
    this.ts.next();
  }
}
