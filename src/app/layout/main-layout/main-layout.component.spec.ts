import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLayoutComponent } from './main-layout.component';

// Stub components
@Component({ selector: 'app-navbar', template: '' })
class NavbarStubComponent {}

@Component({ selector: 'app-footer', template: '' })
class FooterStubComponent {}

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainLayoutComponent,
        NavbarStubComponent,
        FooterStubComponent // ✅ Declare the stubs
      ],
      imports: [RouterTestingModule] // ✅ Import router module for <router-outlet>
    });
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
