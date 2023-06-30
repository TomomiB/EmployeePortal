import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionDetailComponent } from './recognition-detail.component';

describe('RecognitionDetailComponent', () => {
  let component: RecognitionDetailComponent;
  let fixture: ComponentFixture<RecognitionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecognitionDetailComponent]
    });
    fixture = TestBed.createComponent(RecognitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
