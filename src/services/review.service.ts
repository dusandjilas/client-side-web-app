import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: { [orderId: number]: string } = {}

  getReview(orderId: number): string {
    return this.reviews[orderId] || ''
  }

  setReview(orderId: number, reviewText: string): void {
    this.reviews[orderId] = reviewText
  }
}
