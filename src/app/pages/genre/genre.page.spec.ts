import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenrePage } from './genre.page';

describe('GenrePage', () => {
  let component: GenrePage;
  let fixture: ComponentFixture<GenrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
