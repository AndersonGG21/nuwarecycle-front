import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bento-grid',
  templateUrl: './bento-grid.component.html',
  styleUrls: ['./bento-grid.component.css']
})
export class BentoGridComponent {

  private router = inject(Router);
  navigateToCategory(category: string): void {
    this.router.navigate(['/products'], { queryParams: { category: category } });
  }
}
