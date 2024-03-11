import { Component } from '@angular/core';
import { CadastrosHeaderComponent } from '../../../components/cadastros-header/cadastros-header.component';
import { MainComponent } from '../../../components/main/main.component';
import { FormCadastroComponent } from '../../../components/form-cadastro/form-cadastro.component';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CadastrosHeaderComponent, MainComponent, FormCadastroComponent],
  templateUrl: './funcionario.component.html'
})
export class FuncionarioComponent {
}