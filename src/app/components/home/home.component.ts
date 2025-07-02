import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Testimonial } from 'src/app/models/testimonial';
import { CourseService } from 'src/app/services/course.service';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  testimonials: Testimonial[] = [];
  currentIndex: number = 0;
  currentTestimonial: Testimonial = { text: '', author: '' };

  courses: Course[] = [
    {
      id: 1,
      title: 'Python for Beginners',
      category: 'Programming',
      instructor: 'John Doe',
      rating: 4.8,
      thumbnail: 'https://tse4.mm.bing.net/th?id=OIP.3CKXZu5gEkf60AkAYP7CvQHaE8&pid=Api&P=0&h=180',
      video: '',
      description: 'Learn Python from scratch with hands-on examples and mini projects designed for absolute beginners.'
    },
    {
      id: 3,
      title: 'React Mastery',
      category: 'Web Development',
      instructor: 'Alex Johnson',
      rating: 4.9,
      thumbnail: 'https://ict-trainings.com/blog/wp-content/uploads/2023/07/react-technology-480x270.jpg',
      video: '',
      description: 'Master React.js with hooks, components, state management, and real-world project integration.'
    },
    {
      id: 9,
      title: 'Cloud Computing with AWS',
      category: 'Cloud',
      instructor: 'Priya Nair',
      rating: 4.8,
      thumbnail: 'https://wallpaperaccess.com/full/5650215.jpg',
      video: '',
      description: 'Understand the basics of cloud computing and start using AWS services like EC2, S3, and Lambda.'
    }
  ];

  constructor(private testimonialService: TestimonialService) {}

  slideIndex: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.next();
    }, 3000);

    this.testimonialService.getTestimonials().subscribe(data => {
      this.testimonials = data;
      if (this.testimonials.length > 0) {
        this.currentTestimonial = this.testimonials[this.currentIndex];
        setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
          this.currentTestimonial = this.testimonials[this.currentIndex];
        }, 3000);
      }
    });
  }

  next() {
    this.slideIndex = (this.slideIndex + 1) % this.courses.length;
  }

  prev() {
    this.slideIndex = (this.slideIndex - 1 + this.courses.length) % this.courses.length;
  }

  getVisibleCourses(): Course[] {
    const result: Course[] = [];
    for (let i = 0; i < 3; i++) {
      result.push(this.courses[(this.slideIndex + i) % this.courses.length]);
    }
    return result;
  }
}
