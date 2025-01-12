import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoQuestaoComponent } from './banco-questao.component';

describe('BancoQuestaoComponent', () => {
  let component: BancoQuestaoComponent;
  let fixture: ComponentFixture<BancoQuestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoQuestaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancoQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
