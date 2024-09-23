import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SutrasPage } from './sutras.page';

describe('SutrasPage', () => {
  let component: SutrasPage;
  let fixture: ComponentFixture<SutrasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SutrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
