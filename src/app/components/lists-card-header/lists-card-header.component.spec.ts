import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsCardHeaderComponent } from './lists-card-header.component';

describe('ListsCardHeaderComponent', () => {
  let component: ListsCardHeaderComponent;
  let fixture: ComponentFixture<ListsCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsCardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
