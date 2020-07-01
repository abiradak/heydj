import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditdjprofilePage } from './editdjprofile.page';

describe('EditdjprofilePage', () => {
  let component: EditdjprofilePage;
  let fixture: ComponentFixture<EditdjprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdjprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditdjprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
