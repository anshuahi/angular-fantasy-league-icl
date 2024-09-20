import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FantasyLeagueService } from '../../services/fantasy-league.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private fantasyLeagueService: FantasyLeagueService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },
      { validators: passwordMatchValidator }
    );
  }

  isFieldInvalid(field: string): boolean {
    return (
      this.signupForm.get(field)!.invalid &&
      (this.signupForm.get(field)!.dirty || this.signupForm.get(field)!.touched)
    );
  }
  passwordMismatchError(): boolean {
    const p = this.signupForm.errors?.['passwordMismatch'] && this.signupForm.get('confirm_password')?.touched;
    return p;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      this.fantasyLeagueService.signupUser(
        signupData.username, signupData.fullName,
        signupData.email, signupData.phone, signupData.password).subscribe(
          response => {
            if (response.status === 200) {
              this.fantasyLeagueService.setRegisterSuccessMessage();
              this.router.navigateByUrl("/login");
            }
          }
        );
    }
  }
  openRegistrationPage() {
    this.router.navigateByUrl("/signup");
  }
}

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');
  // console.log(password, confirmPassword);

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
}
