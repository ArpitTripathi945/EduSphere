import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from '../models/instructor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private courseUrl = 'assets/instructor.json';
  constructor(private http : HttpClient) { }

  getCourses(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.courseUrl);
  }
}
