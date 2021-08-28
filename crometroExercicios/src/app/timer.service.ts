import { Injectable } from '@angular/core'
import { Exercise } from './exercise';

@Injectable({
    providedIn: 'root'
})
export class TimerSErvice {

    exercises: Exercise[] = [{
        name: 'Abdominal',
        duration: 30,
        repetitions: 3,
        preparation: 15,
        rest: 20
    }];
    currentEx: number = 0;
    currentRep: number = 0;
    phase: number = 0;
    timeLeft: number = 0;

    restart() {
        this.currentEx = 0;
        this.currentRep = 0;
        this.phase = 0;
        this.timeLeft = this.getTimeOfCurrentPhase();
    }

    next() {
        if (this.phase < 2) {
            this.phase++;
        } else {
            const ex = this.exercises[this.currentEx];
            if (this.currentRep < ex.preparation - 1) {
                this.currentRep++;
                this.phase = 1;
            } else {
                if (this.currentEx < this.exercises.length) {
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

    decrementTimeLeft(ellapsedTimeMs: number) {
        if (ellapsedTimeMs >= this.timeLeft) {
            this.next();
        } else {
            this.timeLeft = this.timeLeft - ellapsedTimeMs;
        }
        
        
    }

    private getTimeOfCurrentPhase() {
        let retorno: number = 0;
        const ex = this.exercises[this.currentEx];
        switch (this.phase) {
            case 0:
                retorno = ex.preparation * 1000;
                break;
            case 1:
                retorno = ex.duration * 1000;
                break;
            case 2:
                retorno = ex.rest * 1000;
                break;
        }
        return retorno;
    }

    add(exercise: Exercise) {
        this.exercises.push(exercise);
    }

    delete(i: number) {
        this.exercises.splice(i, 1);
    }

}