import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as invalid when fields are empty on submit', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should login and navigate if correct credentials are provided', () => {
    const testUser = { email: 'test@example.com', password: '123456' };
    localStorage.setItem('loggedInUser', JSON.stringify(testUser));

    component.loginForm.setValue(testUser);
    component.onSubmit();

    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  
});
