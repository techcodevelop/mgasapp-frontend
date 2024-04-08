import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //! permita que sea inicializada luego, ya sea en el construuctor o en OnInit
  loginForm!: FormGroup
  private toastSvc = inject(ToastrService)
  private _userService = inject(UserService)
  private _router = inject(Router)
  loading: boolean = false

  constructor(private formBuilder: FormBuilder, private _errorService: ErrorService) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  enviar(event: Event) {
    event.preventDefault();
    console.log(this.loginForm.value)
  }

  login(username: string, password: string) {

    //validamos que el usuario ingrese datos
    if (this.loginForm.get(username)?.value == '' || this.loginForm.get(password)?.value == '') {

      this.toastSvc.error('Todos los campos son obligatorios', 'error')
      return
    }

    const user: User = {
      username: this.loginForm.get(username)?.value,
      password: this.loginForm.get(password)?.value
    }

    this.loading=true
    this._userService.login(user).subscribe({
      next: (token) => {
        
        this.toastSvc.success(`El usuario ${this.loginForm.get(username)?.value} fue logueado correctamente`, 'Message')
        localStorage.setItem("token",token)
        console.log(token)
        this._router.navigate(['/dashboard'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.mssgError(e)
      },
      complete: () => console.info('complete')
    })

  }



}
