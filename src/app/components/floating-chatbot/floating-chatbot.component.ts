// floating-chatbot.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-chatbot',
  templateUrl: './floating-chatbot.component.html',
  styleUrls: ['./floating-chatbot.component.css']
})
export class FloatingChatbotComponent {
  isMenuOpen: boolean = false; // Variable para controlar el estado del menú

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Cambiar el estado del menú al hacer clic en el botón
  }
}