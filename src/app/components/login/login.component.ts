import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerMessage$ = this.fantasyLeagueService.registerMessage$;
  registerMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fantasyLeagueService: FantasyLeagueService
  ) { }

  ngOnInit(): void {
    // this.fantasyLeagueService.setRegisterSuccessMessage();
    this.loginForm = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.fantasyLeagueService.authenticated$.subscribe(a => {
      if (a) {
        this.router.navigate(['/']);
      }
    })
    this.registerMessage$.subscribe(message => {
      this.registerMessage = message;
      // console.log(this.registerMessage);
    })
  }

  onSubmit() {
    this.fantasyLeagueService.loginUser(this.loginForm.value.phone, this.loginForm.value.password);
  }

  openRegistrationPage() {
    this.router.navigateByUrl("/signup");
  }
}
