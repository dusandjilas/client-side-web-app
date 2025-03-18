export interface MovieModel {
  id: number
  title: string
  description: string
  genre: string
  duration: number
  director: string
  actors: string[]
  releaseDate: string
  showTimes: { date: string; time: string }[]
  price: number
  currency: string
  reviews: { reviewText: string; rating: number }[]
  averageRating: number
  poster_path: string
  imageUrl?: string
}
