import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CourseService } from '../services/course.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  const mockCourses = [
    {
      id: 1,
      title: 'Python for Beginners',
      category: 'Programming',
      instructor: 'John Doe',
      rating: 4.8,
      price: 999,
      hours: 18.6,
      exercises: 72,
      thumbnail: 'https://articles.geekster.in/wp-content/uploads/2024/03/7-4.png',
      video: 'https://videos.pexels.com/video-files/6963744/6963744-hd_1920_1080_25fps.mp4',
      description: 'Learn Python from scratch with hands-on examples and mini projects designed for absolute beginners.'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        {
          provide: CourseService,
          useValue: {
            getCourses: () => of(mockCourses)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    expect(component.courses.length).toBe(1);
    expect(component.courses[0].title).toBe('Python for Beginners');
  });

  it('should filter courses by category', () => {
    component.onCategoryChange('Programming');
    expect(component.filteredCourses.length).toBe(1);
  });

  it('should open preview and set selectedCourse', () => {
    component.openPreview(mockCourses[0]);
    expect(component.selectedCourse).toEqual(mockCourses[0]);
  });
});
