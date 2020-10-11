import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hide: boolean;

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // Hide navbar on signin page and display on other pages
    this.router.events.subscribe((e) => {
      if (e instanceof ActivationEnd) {
        const endUrl = e.snapshot.routeConfig.path;

        const menuElement = document.getElementById('header-menu');
        if(endUrl === 'signin') {
          return this.renderer.addClass(menuElement, 'hide-menu');
        }

        return this.renderer.removeClass(menuElement, 'hide-menu');
      }
    });
  }
}
