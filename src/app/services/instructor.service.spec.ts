import { TestBed } from '@angular/core/testing';
import { InstructorService } from './instructor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorService', () => {
  let service: InstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

