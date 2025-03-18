import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReviewService } from '../../services/review.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewText: string = ''
  orderId: number = 0

  constructor(private reviewService: ReviewService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['orderId']
      this.reviewText = this.reviewService.getReview(this.orderId)
    })
  }

  submitReview(): void {
    this.reviewService.setReview(this.orderId, this.reviewText)
    this.router.navigate(['/user'])
  }
}
