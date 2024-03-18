import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { MainComponent } from '../../components/main/main.component';
import { FormComponent } from '../../components/form/form.component';
import { FormTableComponent } from '../../components/form/form-table/form-table.component';
import { FormInputComponent } from '../../components/form/form-table/form-input/form-input.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { User } from '../../interfaces';
import { FormLinkComponent } from '../../components/form-link/form-link.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    BackButtonComponent,
    MainComponent,
    FormComponent,
    FormTableComponent,
    FormInputComponent,
    FormLinkComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private cadastro: CadastroService,
    private router: Router
  ) { }

  hasError: boolean = !1;
  errorMsg: string = 'Erro! CPF ou senha inválidas!';

  cpfValidator(control: AbstractControl) {
    const cpf = control.value;

    if (cpf && cpf.toUpperCase() == 'ROOT') return null;

    if (cpf.length < 11) return { 'invalidCPFLength': true };

    return null;
  }

  submitFunction = (res: any, _form: FormGroup) => {
    const that = this;
    const findedUser = this.cadastro.searchUser(res.cpf);

    this.hasError = !1;
    findedUser.subscribe((user: any) => {
      if (!user) {
        this.hasError = !0;
        return;
      };

      const { nome_comp } = user;
      const login = this.cadastro.loginUser({ ...res, nome_comp } as User);

      this.hasError = !1;
      login.subscribe({
        error() {
          that.hasError = !0;
        }, complete() {
          that.router.navigate(['/dashboard']);
        },
      });
    });
  };

  form = this.fb.group({
    cpf: ['', this.cpfValidator],
    password: ['', Validators.required]
  });
}
