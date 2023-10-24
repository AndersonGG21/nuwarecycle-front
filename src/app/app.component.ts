import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'nuwarecycle-front';

  constructor(private primengConfig: PrimeNGConfig) {}


  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }
}
