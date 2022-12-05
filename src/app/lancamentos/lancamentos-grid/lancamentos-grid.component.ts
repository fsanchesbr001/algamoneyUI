import {Component, Input} from '@angular/core';
import {Lancamento} from "../lancamento";

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {
  @Input() lancamentos:Lancamento[] = [];
}
