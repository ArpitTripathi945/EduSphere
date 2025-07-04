import { Component, ElementRef, OnInit, ViewChild  } from "@angular/core";
import { Course } from "../models/course";
import { CourseService } from "../services/course.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit{
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: string[] = [];
  selectedCategory = "All";
  searchText = "";
  selectedCourse: Course | null = null;

  @ViewChild("previewVideo") previewVideo!: ElementRef<HTMLVideoElement>;

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = data;

      // ✅ Dynamically extract unique categories
      const categorySet = new Set(data.map((course) => course.category));
      this.categories = ["All", ...Array.from(categorySet)];
    });
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesCategory =
        this.selectedCategory === "All" ||
        course.category === this.selectedCategory;
      const matchesSearch = course.title
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterCourses();
  }

  onSearchChange(): void {
    this.filterCourses();
  }

  openPreview(course: Course): void {
    this.selectedCourse = course;
    setTimeout(() => {
      this.previewVideo?.nativeElement.load();
    }, 100);
  }

  stopVideo(): void {
    const video = this.previewVideo?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }


 goToCourseDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
