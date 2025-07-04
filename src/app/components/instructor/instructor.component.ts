import { Component } from '@angular/core';
import { Instructor } from "src/app/models/instructor";
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent {
  instructor: Instructor[] = [];

  constructor(
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    this.instructorService.getInstructor().subscribe(
      (data) => {
        this.instructor = data;
      },
      (error) => {
        console.error('Error fetching instructors', error);
      }
    );
  }

 
  
}
