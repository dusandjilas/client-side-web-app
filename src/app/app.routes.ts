import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component'
import { MovieBookingComponent } from './movie-booking/movie-booking.component'
import { UserComponent } from './user/user.component'
import { ReviewComponent } from './review/review.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'movie/:id', component: MovieDetailsComponent },
    { path: 'movie/:id/book', component: MovieBookingComponent },
    { path: 'user', component: UserComponent },
    { path: 'review/:orderId', component: ReviewComponent },
    { path: '**', redirectTo: '' }
]
