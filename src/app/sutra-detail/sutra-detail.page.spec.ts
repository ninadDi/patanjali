import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SutraDetailPage } from './sutra-detail.page';

describe('SutraDetailPage', () => {
  let component: SutraDetailPage;
  let fixture: ComponentFixture<SutraDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SutraDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
