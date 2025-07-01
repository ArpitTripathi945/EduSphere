import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

 private testimonialUrl = 'assets/testimonials.json';

  constructor(private http: HttpClient) {}

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.testimonialUrl);
  }
}
