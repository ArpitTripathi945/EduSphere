import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../models/course';
import { Testimonial } from '../../models/testimonial';
import { CourseService } from '../../services/course.service';
import { TestimonialService } from '../../services/testimonial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('track') trackRef!: ElementRef;

  courses: Course[] = [];
  visibleCourses: Course[] = [];
  topRatedCourses: Course[] = [];
  visibleCount: number = this.getVisibleCount();
  startIndex: number = 0;
  isTransitioning: boolean = false;

  testimonials: Testimonial[] = [];
  currentTestimonial: number = 0;

  testimonialIntervalId: any;
  slideIntervalId: any;

  private track!: HTMLElement;
  private readonly TRANSITION_DURATION = 600;

  constructor(
    private courseService: CourseService,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadTestimonials();
    this.setupAutoSlide();
  }

  ngAfterViewInit(): void {
    this.track = this.trackRef.nativeElement as HTMLElement;
  }

  getVisibleCount(): number {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  @HostListener('window:resize')
  onResize(): void {
    const newVisibleCount = this.getVisibleCount();
    if (newVisibleCount !== this.visibleCount) {
      this.visibleCount = newVisibleCount;
      this.updateVisibleCourses();
    }
  }

  private loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;

        this.topRatedCourses = [...data]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

        this.updateVisibleCourses();
      },
      error: () => {
        console.error('Failed to load courses');
      }
    });
  }

  private loadTestimonials(): void {
    this.testimonialService.getTestimonials().subscribe({
      next: (data: Testimonial[]) => {
        this.testimonials = data;
        this.testimonialIntervalId = setInterval(() => {
          this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
        }, 3000);
      },
      error: () => {
        console.error('Failed to load testimonials');
      }
    });
  }


  private setupAutoSlide(): void {
    this.slideIntervalId = setInterval(() => this.nextSlide(), 2500);
  }

  updateVisibleCourses(): void {
    this.visibleCourses = [];
    for (let i = 0; i < this.visibleCount; i++) {
      const index = (this.startIndex + i) % this.topRatedCourses.length;
      this.visibleCourses.push(this.topRatedCourses[index]);
    }

    this.track.style.transition = "none";
    this.track.style.transform = "translateX(0)";
    this.track.offsetHeight;


  }

  nextSlide(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const moveBy = this.track.offsetWidth / this.visibleCount;
    const firstCard = this.track.children[0].cloneNode(true);
    this.track.appendChild(firstCard);

    this.track.style.transition = "transform 0.8s ease";
    this.track.style.transform = `translateX(-${moveBy}px)`;

    setTimeout(() => {
      this.track.style.transition = "none";
      this.track.removeChild(this.track.children[0]);
      this.track.style.transform = "translateX(0)";
      this.startIndex = (this.startIndex + 1) % this.topRatedCourses.length;
      this.isTransitioning = false;
    }, 800);
  }

  prevSlide(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    this.startIndex = (this.startIndex - 1 + this.topRatedCourses.length) % this.topRatedCourses.length;
    this.updateVisibleCourses();

    const moveBy = this.track.offsetWidth / (this.visibleCount + 1);
    this.track.style.transition = "none";
    this.track.style.transform = `translateX(-${moveBy}px)`;

    setTimeout(() => {
      this.track.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      this.track.style.transform = "translateX(0)";
    }, 50);

    setTimeout(() => {
      this.isTransitioning = false;
    }, 850);
  }


}
