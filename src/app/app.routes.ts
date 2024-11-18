import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateNewTeamComponent } from './components/create-new-team/create-new-team.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { GlobalLeaderboardComponent } from './components/global-leaderboard/global-leaderboard.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent }, // Default route
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'create-new-team/:id', component: CreateNewTeamComponent },
    {
        path: 'leaderboard/:id', component: LeaderboardComponent
    },
    {
        path: 'global-leaderboard', component: GlobalLeaderboardComponent
    }
];
