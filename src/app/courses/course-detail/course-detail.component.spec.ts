import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailComponent } from './course-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['id', '1']]) }
          }
        },
        {
          provide: CourseService,
          useValue: {
            getCourses: () => of([])
          }
        }
      ]
    });

    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
