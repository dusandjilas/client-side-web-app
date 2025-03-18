import { Injectable } from '@angular/core'
import axios from 'axios'

const API_KEY = '083e5a5fd626c9ed1732ee8123dae871'
const BASE_URL = 'https://api.themoviedb.org/3'

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Accept': 'application/json' }
})

@Injectable({ providedIn: 'root' })
export class MovieService {
  static async getTrendingMovies() {
    return client.request({
      url: '/trending/movie/week',
      method: 'GET',
      params: { 'api_key': API_KEY }
    })
  }

  static async searchMovies(query: string) {
    return client.request({
      url: '/search/movie',
      method: 'GET',
      params: { 'api_key': API_KEY, 'query': query }
    })
  }

  static async getMovieDetails(movieId: number) {
    return client.request({
      url: `/movie/${movieId}`,
      method: 'GET',
      params: { 'api_key': API_KEY }
    })
  }

  public updateReservationStatus(orderId: number, newStatus: 'reserved' | 'watched' | 'canceled'): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user?.bookedMovies) {
          let order = user.bookedMovies.find((o: any) => o.id === orderId)
          if (order) {
            order.status = newStatus
            localStorage.setItem('user', JSON.stringify(user))
            resolve()
          } else {
            reject('Order not found')
          }
        } else {
          reject('No user data found')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  public submitReview(movieId: number, review: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let users = JSON.parse(localStorage.getItem('users') || '[]')
        const activeUser = users.find((user: any) => user.email === localStorage.getItem('active'))

        if (activeUser?.bookedMovies) {
          let order = activeUser.bookedMovies.find((o: any) => o.movieId === movieId && o.status === 'watched')
          if (order) {
            order.review = review
            localStorage.setItem('users', JSON.stringify(users))
            resolve()
          } else {
            reject('Order not found or not marked as watched')
          }
        } else {
          reject('No user data found')
        }
      } catch {
        reject('Error saving review')
      }
    })
  }
}
