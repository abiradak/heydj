import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeaturePage } from './feature.page';

describe('FeaturePage', () => {
  let component: FeaturePage;
  let fixture: ComponentFixture<FeaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
