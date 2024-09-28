import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const SNOWMAN_IMAGE = '..\\assets\\icons\\snowman image.jpg';
const SUN_IMAGE = '..\\assets\\icons\\sun.jpg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  inputTemperature: number = 0;
  imageSrc: string = SUN_IMAGE;
  temperatureSubject$ = new BehaviorSubject<number>(80);
  private destroy$ = new Subject<void>(); // Used to manage unsubscriptions

  ngOnInit() {
    this.temperatureSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((temperature) => {
        this.imageSrc = temperature >= 50 ? SUN_IMAGE : SNOWMAN_IMAGE;
      });
  }

  setTemperature() {
    this.temperatureSubject$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input, 10); // Parsing input as base-10 integer
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
