import { Component } from '@angular/core'
import { MovieService } from '../../services/movie.service'
import { NgFor, NgIf } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { UtilsService } from '../../services/utils.service'
import { LoadingComponent } from '../loading/loading.component'
import { RouterLink } from '@angular/router'
import { AxiosError } from 'axios'
import { FormsModule } from '@angular/forms' 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    LoadingComponent,
    RouterLink,
    FormsModule  
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public movies: any[] | null = null
  public filteredMovies: any[] | null = null
  public error: string | null = null
  public searchQuery: string = ''
  public selectedRating: string = ''

  constructor(public utils: UtilsService) {
    this.fetchTrendingMovies()
  }

  private fetchTrendingMovies() {
    MovieService.getTrendingMovies()
      .then(response => {
        this.movies = response.data.results
        this.filteredMovies = this.movies  
      })
      .catch((error: AxiosError) => this.error = `${error.code}: ${error.message}`)
  }

  
  filterMovies() {
    if (!this.movies) return

    let filtered = this.movies

    
    if (this.searchQuery) {
      filtered = filtered.filter(movie => movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }

    
    if (this.selectedRating) {
      filtered = filtered.filter(movie => movie.vote_average >= parseFloat(this.selectedRating))
    }

    this.filteredMovies = filtered
  }
}
