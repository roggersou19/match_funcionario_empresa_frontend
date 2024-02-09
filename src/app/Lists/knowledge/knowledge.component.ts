import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { KnowledgeService } from '../../../services/knowledge.service';
import { Knowledge } from '../../../models/knowledge';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-knowledge',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './knowledge.component.html',
  styleUrl: './knowledge.component.css'
})
export class KnowledgeComponent {

  knowledges: Knowledge[] = [];

  constructor(private knowledgeService: KnowledgeService) { }

  async getKnowledges() {
    this.knowledges = await firstValueFrom(this.knowledgeService.getAll());
  }
  ngOnInit() {
    this.getKnowledges()
  }
}
