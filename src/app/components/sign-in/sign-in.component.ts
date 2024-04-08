import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  contactForm!: FormGroup
  private toastSvc = inject(ToastrService)
  //router: Router ='' , 
  userList: User[] = []
  private _userService = inject(UserService)
  private _router = inject(Router)
  private _errorService = inject(ErrorService)
  loading: boolean = false

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })


  }

  ngOnInit(): void {

  }

  enviar(event: Event) {
    event.preventDefault();
    console.log(this.contactForm.value)
  }

  hasErrors(field: string, typeError: string) {
    return this.contactForm.get(field)?.hasError(typeError) && this.contactForm.get(field)?.touched;
  }

  addUser(username: string, password: string, confirmPassword: string) {

    // validamos queingresen valores
    if (this.contactForm.get(username)?.value == '' || this.contactForm.get(password)?.value == '' || this.contactForm.get(confirmPassword)?.value == '') {
      this.toastSvc.error('Todos los campos son obligatorios', 'error')
      return
    }

    // validamos que las passwords sean iguales
    if (this.contactForm.get(password)?.value != this.contactForm.get(confirmPassword)?.value) {
      this.toastSvc.warning('Las passwords deben ser iguales', 'Alert')
      return
    }

    // creamos el objeto
    const user: User = {
      username: this.contactForm.get(username)?.value,
      password: this.contactForm.get(password)?.value
    }

    this.loading = true

    this._userService.signIn(user).subscribe({
      next: (v) => {
        
        this.toastSvc.success(`El usuario ${this.contactForm.get(username)?.value} fue registardo con exito`, 'Message')
        this._router.navigate(['/login'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.mssgError(e)
      },
      complete: () => console.info('compplete')
    })



  }





}
