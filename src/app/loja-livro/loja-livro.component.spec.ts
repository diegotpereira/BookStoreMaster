import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaLivroComponent } from './loja-livro.component';

describe('LojaLivroComponent', () => {
  let component: LojaLivroComponent;
  let fixture: ComponentFixture<LojaLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaLivroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
