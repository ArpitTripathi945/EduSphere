import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "src/app/models/course";
import { CourseService } from "src/app/services/course.service";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
  
})
export class CourseDetailComponent {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.courseService.getCourses().subscribe((courses) => {
        this.course = courses.find((c) => c.id === id);
      });
    }
  }
}
