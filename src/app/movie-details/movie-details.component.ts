import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MovieService } from '../../services/movie.service'
import { AxiosError } from 'axios'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { LoadingComponent } from '../loading/loading.component'

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, LoadingComponent],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  public movie: any = null
  public error: string | null = null
  public genre: string = ''
  public duration: number = 120
  public director: string = 'John Doe'
  public releaseDate: string = '2025-05-01'
  public price: number = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMovie()
    this.setRandomGenre()
  }

  private async loadMovie() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'))

    try {
      const response = await MovieService.getMovieDetails(movieId)
      this.movie = response.data
    } catch (error: any) {
      const axiosError = error as AxiosError
      this.error = `${axiosError.code}: ${axiosError.message}`
    }
  }

  private setRandomGenre() {
    const genres = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Sci-Fi', 'Romance', 'Adventure']
    const randomIndex = Math.floor(Math.random() * genres.length)
    this.genre = genres[randomIndex]
  }
}
