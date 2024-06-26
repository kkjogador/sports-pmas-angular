import { Component, Input, OnInit } from '@angular/core';
import { CadastroService } from '../../../services/cadastro.service';
import { PrismaSolic, PrismaUser } from '../../../types';
import { forkJoin, Observable } from 'rxjs';
import { SolicsListComponent } from '../../solics-list/solics-list.component';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [SolicsListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private cadastro: CadastroService
  ) {}

  @Input() user!: PrismaUser;
  solicUsers: PrismaUser[] = [];

  ngOnInit(): void {
    this.updateSolics();
  }

  updateSolics = () => {
    const solics = this.cadastro.searchByAdmin(this.user.id);

    solics.subscribe(listSolics => {
      this.solicUsers = [];

      const usersSolic = listSolics.map(({ userId }) => userId).map(this.cadastro.searchUserById);

      forkJoin(usersSolic).subscribe(users => 
        this.solicUsers = users.sort(({ id: idA }, { id: idB }) => idB - idA)
      );
    });
  }
}
