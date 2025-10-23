import { Component, HostListener } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <header class="menu-header" [ngClass]="{ 'scrolled': menuHeaderClass === 'scrolled' }">
      <nav>
        <span *ngFor="let option of menuOptions"
              [class.selected]="selectedOption === option"
              (click)="selectOption(option)"
              class="menu-link">
          {{ option }}
        </span>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  styles: [`
    /* Menu styles */
    .menu-header {
      width: 100%;
      padding: 32px 0 16px 0;
      text-align: center;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      font-family: 'frenchDemo', serif;
      backdrop-filter: blur(2px);
      transition: background 0.5s, padding 0.5s;
      overflow: hidden;
    }
    .scrolled {
      background: rgba(128, 0, 128, 0.95);
      padding: 8px 0 8px 0;
      backdrop-filter: blur(10px);
    }
    .menu-link {
      margin: 0 18px;
      font-size: 3rem;
      font-weight: 600;
      cursor: pointer;
      color: white;
      text-shadow: 2px 2px 12px rgba(0,0,0,0.85), 0 0 2px #000;
      transition: color 0.3s, border-bottom 0.3s, transform 0.3s ease;
      border-bottom: 2px solid transparent;
      padding-bottom: 4px;
      display: inline-block;
    }
    .menu-link.selected,
    .menu-link:hover {
      color: #ffd700;
      border-bottom: 2px solid #ffd700;
      transform: scale(1.1);
    }
    @media (max-width: 768px) {
      .menu-link {
        font-size: 2rem;
        margin: 0 8px;
      }
    }
  `]
})
export class AppComponent {
  title = 'laculture-ui';
  menuHeaderClass = '';
  menuOptions = ['Home', 'Recipes', 'Events', 'Map', 'About', 'Calendar'];
  selectedOption = this.menuOptions[0];

  @HostListener('window:scroll', []) 
  onScroll() {
    this.menuHeaderClass = window.scrollY > 0 ? 'scrolled' : '';
  }

  constructor(private router: Router) {}

  selectOption(option: string) {
    this.selectedOption = option;
    
    // Navigate to different pages based on menu selection
    switch (option) {
      case 'Home':
        this.router.navigate(['/']);
        break;
      case 'Recipes':
        this.router.navigate(['/recipes']);
        break;
      case 'Events':
        this.router.navigate(['/events']);
        break;
      case 'Map':
        this.router.navigate(['/map']);
        break;
      case 'About':
        // Add navigation when about page is created
        break;
      case 'Calendar':
        this.router.navigate(['/Calendar']);
    }
  }
}
