import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateDJprofilePage } from './create-djprofile.page';

describe('CreateDJprofilePage', () => {
  let component: CreateDJprofilePage;
  let fixture: ComponentFixture<CreateDJprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDJprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDJprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
