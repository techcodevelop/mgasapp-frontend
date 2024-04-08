import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{


  private router = inject(Router)

  ngOnInit(){
    //throw new Error('Method not implemented.');
  }


  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
