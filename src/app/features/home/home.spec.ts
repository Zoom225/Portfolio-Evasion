import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the StockFlow demo and source links', () => {
    const stockflowProject = component.projects.find(
      (project) => project.titleKey === 'project.stockflowTitle'
    );

    expect(stockflowProject?.links).toEqual({
      demo: 'https://gestions-stock-demo.vercel.app/',
      backend: 'https://github.com/Zoom225/stockflow-backend',
      frontend: 'https://github.com/Zoom225/stockflow-frontend'
    });
  });
});
