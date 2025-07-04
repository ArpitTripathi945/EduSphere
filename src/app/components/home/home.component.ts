import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Course } from "../../models/course";
import { Testimonial } from "../../models/testimonial";
import { CourseService } from "../../services/course.service";
import { TestimonialService } from "../../services/testimonial.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("track") trackRef!: ElementRef;

  courses: Course[] = [];
  visibleCourses: Course[] = [];
  topRatedCourses: Course[] = [];
  visibleCount = 1;
  currentIndex = 0;
  isTransitioning = false;
  autoSlideInterval!: number; 
  isHovered = false;

  testimonials: Testimonial[] = [];
  currentTestimonial = 0;
  testimonialIntervalId!: number; 
  slideIntervalId!: number; 

  startIndex = 0;
  currentSlide = 0;
  slideWidth = 360;

  private track!: HTMLElement;

  constructor(
    private courseService: CourseService,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.visibleCount = this.getVisibleCount();
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

  @HostListener("window:resize")
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
        console.error("Failed to load courses");
      },
    });
  }

  private loadTestimonials(): void {
    this.testimonialService.getTestimonials().subscribe({
      next: (data: Testimonial[]) => {
        this.testimonials = data;
        this.testimonialIntervalId = setInterval(() => {
          this.currentTestimonial =
            (this.currentTestimonial + 1) % this.testimonials.length;
        }, 3000);
      },
      error: () => {
        console.error("Failed to load testimonials");
      },
    });
  }

  private setupAutoSlide(): void {
    this.slideIntervalId = setInterval(() => this.nextSlide(), 2500);
  }

  updateVisibleCourses(): void {
    this.visibleCourses = this.topRatedCourses.slice(
      this.startIndex,
      this.startIndex + this.visibleCount
    );

    if (this.visibleCourses.length < this.visibleCount) {
      const remaining = this.visibleCount - this.visibleCourses.length;
      this.visibleCourses = [
        ...this.visibleCourses,
        ...this.topRatedCourses.slice(0, remaining),
      ];
    }
  }

  nextSlide(): void {
    this.startIndex = (this.startIndex + 1) % this.topRatedCourses.length;
    this.updateVisibleCourses();
  }

  prevSlide(): void {
    this.startIndex =
      (this.startIndex - 1 + this.topRatedCourses.length) %
      this.topRatedCourses.length;
    this.updateVisibleCourses();
  }
}
