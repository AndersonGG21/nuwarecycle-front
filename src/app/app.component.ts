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

  items: any[] = [];

  selectedItem: any = {};

  suggestions: any[] = [];

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(
      (item) => event.query + '-' + item
    );
    console.log(this.selectedItem);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    const listItem = document.querySelectorAll('li');
    const menuBackdrop = document.querySelector(
      '#menu-backdrop'
    ) as HTMLDivElement;

    listItem.forEach((item) => {
      item.addEventListener('mouseenter', ({ target }: any) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        menuBackdrop.style.setProperty('--left', `${left}px`);
        menuBackdrop.style.setProperty('--top', `${top}px`);
        menuBackdrop.style.setProperty('--width', `${width}px`);
        menuBackdrop.style.setProperty('--alto', `${height}px`);
        menuBackdrop.style.visibility = 'visible';
        menuBackdrop.style.opacity = '1';
      });

      item.addEventListener('mouseleave', () => {
        menuBackdrop.style.visibility = 'hidden';
        menuBackdrop.style.opacity = '0';
      });
    });
  }
}
