import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent }, // Default route
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent }
];
