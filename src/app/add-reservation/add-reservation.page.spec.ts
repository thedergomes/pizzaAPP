import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddReservationPage } from './add-reservation.page';

describe('AddReservationPage', () => {
  let component: AddReservationPage;
  let fixture: ComponentFixture<AddReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
