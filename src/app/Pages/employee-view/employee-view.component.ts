import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employees.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Employee } from '../../../models/employee';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { Knowledge } from '../../../models/knowledge';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../Components/delete-dialog/delete-dialog.component'
import { MatOption, MatSelect } from '@angular/material/select';
import { KnowledgeService } from '../../../services/knowledge.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatInputModule, RouterLink, RouterLinkActive, MatButtonModule, ReactiveFormsModule, MatGridListModule, MatListModule, MatSelect, MatOption],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent {

  id!: number;
  employee!: Employee;
  employeeKnowledge!: any;
  matchingKnowledge!: any;

  knowledgeOptions!: Knowledge[]

  employeeForm: any;
  knowledgeForm: any;

  cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  telephonePattern = /^\(\d{2}\)\s\d{8,9}$/;

  constructor(private employeeService: EmployeeService, private knowledgeService: KnowledgeService, private route: ActivatedRoute, private builder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.setEmployeeID()
    this.setEmployee(this.id)
    this.setEmployeeKnowledge(this.id)
    this.setKnowledges()
    this.setMatchingKnowledge(this.id)

    this.knowledgeForm = this.builder.group({
      name: this.builder.control('', Validators.required),
      
    })

  }

  async setMatchingKnowledge(id: number){
    this.matchingKnowledge = await firstValueFrom(this.employeeService.getMatchingCompanySkills(id));
    console.log(this.matchingKnowledge)
  }

  setEmployeeID() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  async setKnowledges(){
    this.knowledgeOptions = await firstValueFrom(this.knowledgeService.getAll());
  }

  async setEmployee(id: number) {
    this.employee = await firstValueFrom(this.employeeService.get(id));

    this.employeeForm = this.builder.group({
      name: this.builder.control(this.employee.name, Validators.required),
      email: this.builder.control(this.employee.email, [Validators.required, Validators.email]),
      document: this.builder.control(this.employee.document, [
        Validators.required,
        Validators.pattern(this.cpfPattern)
      ]),
      telephone: this.builder.control(this.employee.telephone, [
        Validators.required,
        Validators.pattern(this.telephonePattern)
      ])
    })
  }

  async setEmployeeKnowledge(id: number) {
    this.employeeService.getKnowledge(id).subscribe((knowledge) => {
      this.employeeKnowledge = knowledge
    });
  }

  saveEmployee() {

    this.employeeForm.value.id = this.employee.id


    const employeeData: Employee = { ...this.employeeForm.value };

    this.employeeService.update(employeeData).subscribe((employee: Employee) => {
      this.employee = employee;
    });

    
  }


  openDeleteDialog(employeeID: number, knowledgeID: number, i: number): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(yes => {

      if (yes) {

        this.employeeService.deleteKnowledge(employeeID, knowledgeID).subscribe((wasDeleted) => {

          const index = this.employeeKnowledge.findIndex((knowledge: any) => knowledge.id === i);

          if (index !== -1) {
            this.employeeKnowledge.splice(index, 1);
          }

        });
        
        this.setMatchingKnowledge(this.id)
      }

    });
  }

  saveKnowledge(employeeID: number): void {

    console.log(this.knowledgeForm.value)

    this.employeeService.addKnowledge(employeeID, this.knowledgeForm.value.name).subscribe((knowledge: any) => {
      /* const newKnoledge: Knowledge = { ...knowledge }; */
      console.log(knowledge[0].knowledge)
      this.employeeKnowledge.push(knowledge[0])
    });

    this.setMatchingKnowledge(this.id)
    

  }


  formatCPF(value: string): string {

    const digitsOnly = value.replace(/[^\d]/g, '');

    const formattedValue = digitsOnly.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

    return formattedValue;
  }

  formatTelephone(value: string): string {

    const digitsOnly = value.replace(/[^\d]/g, '');

    let formattedValue = digitsOnly.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    if (digitsOnly.length > 10) {
      formattedValue = formattedValue.replace(/(\d{5})(\d{4})$/, '$1-$2');
    }

    return formattedValue;
  }

  onCPFInput(event: any) {
    const input = event.target as HTMLInputElement;
    const formattedValue = this.formatCPF(input.value);
    input.value = formattedValue;
    this.employeeForm.get('document').setValue(formattedValue);
  }

  onTelephoneInput(event: any) {
    const input = event.target as HTMLInputElement;
    const formattedValue = this.formatTelephone(input.value);
    input.value = formattedValue;
    this.employeeForm.get('telephone').setValue(formattedValue);
  }

}
