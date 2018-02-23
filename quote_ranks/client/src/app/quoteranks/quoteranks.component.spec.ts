import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteranksComponent } from './quoteranks.component';

describe('QuoteranksComponent', () => {
  let component: QuoteranksComponent;
  let fixture: ComponentFixture<QuoteranksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteranksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteranksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
