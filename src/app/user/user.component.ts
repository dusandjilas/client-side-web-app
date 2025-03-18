import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { UserModel } from '../../models/user.model'
import { OrderModel } from '../../models/order.model'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'movieTitle', 'status', 'actions']

  public user: UserModel | null = null
  public bookedMovies: OrderModel[] = []

  constructor(private router: Router) {
    this.loadUser()
  }

  private loadUser() {
    this.user = UserService.getActiveUser()
    if (!this.user) {
      this.router.navigate(['/home'])
      return
    }
    this.bookedMovies = this.user.bookedMovies ?? []
  }

  markAsWatched(order: OrderModel): void {
    const movie = this.bookedMovies.find(m => m.id === order.id)
    if (movie) {
      movie.status = 'watched'
      this.updateUserData()
    }
  }

  reviewMovie(order: OrderModel): void {
    if (order.status === 'watched') {
      this.router.navigate(['/review', order.id])
    } else {
      alert('You can only review a movie after watching it.')
    }
  }

  removeMovie(order: OrderModel): void {
    this.bookedMovies = this.bookedMovies.filter(movie => movie.id !== order.id)
    this.updateUserData()
  }

  private updateUserData() {
    if (this.user) {
      this.user.bookedMovies = this.bookedMovies
      UserService.updateUser(this.user)
    }
  }
}
