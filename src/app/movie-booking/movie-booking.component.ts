import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MovieService } from '../../services/movie.service'
import { UserService } from '../../services/user.service'
import { MovieModel } from '../../models/movie.model'
import { OrderModel } from '../../models/order.model'
import { NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-movie-booking',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.css']
})
export class MovieBookingComponent {
  public movie?: MovieModel
  public price: number = 0
  public imageUrl: string = ''
  public ticketCount: number = 1
  public selectedRow: string = ''

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    MovieService.getMovieDetails(id)
      .then(response => {
        this.movie = response.data
        this.imageUrl = this.movie?.poster_path
          ? 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path
          : 'https://via.placeholder.com/500x750'
        this.price = this.getRandomPrice()
      })
      .catch(error => console.error("Error fetching movie details:", error))
  }

  private getRandomPrice(): number {
    return Math.floor(Math.random() * (2000 - 500 + 1)) + 500
  }

  public async bookMovie(): Promise<void> {
    const user = UserService.getActiveUser()
    if (!user) {
      alert("You must be logged in to book a ticket!")
      this.router.navigate(['/login'])
      return
    }

    if (!this.movie) {
      console.error("Movie not found!")
      return
    }

    if (this.ticketCount < 1 || !this.selectedRow) {
      alert("Please select a valid number of tickets and a row.")
      return
    }

    console.log(`Booking confirmed for: ${this.movie.title}`)
    alert(`Successfully booked: ${this.movie.title}`)

    const order: OrderModel = {
      id: this.movie.id,
      movieId: this.movie.id,
      movieTitle: this.movie.title,
      status: "reserved",
      pricePerItem: this.price,
      count: this.ticketCount,
      row: this.selectedRow,
      createdAt: new Date().toISOString()
    }

    const bookingSuccess = UserService.bookMovie(order)
    if (!bookingSuccess) {
      console.error("Failed to book the movie.")
      return
    }

    alert(`Successfully booked: ${this.movie.title}`)
  }
}
