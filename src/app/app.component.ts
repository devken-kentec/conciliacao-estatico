import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private router = inject(Router);

  title = 'conciliacao';
  public ngOnInit(): void {
    //this.router.navigate(['/filtro']);
  }
}
