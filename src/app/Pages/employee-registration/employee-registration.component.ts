import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employees.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
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

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatInputModule, RouterLink, RouterLinkActive, MatButtonModule, ReactiveFormsModule, MatGridListModule, MatListModule],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.css'
})
export class EmployeeRegistrationComponent {
  id!: number;
  employee!: Employee;
  employeeKnowledge!: any;

  employeeForm: any;
  cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  telephonePattern = /^\(\d{2}\)\s\d{8,9}$/;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      name: this.builder.control('', Validators.required),
      email: this.builder.control('', [Validators.required, Validators.email]),
      document: this.builder.control('', [
        Validators.required,
        Validators.pattern(this.cpfPattern)
      ]),
      telephone: this.builder.control('', [
        Validators.required,
        Validators.pattern(this.telephonePattern)
      ])
    })

    this.setEmployee()
  }

  async setEmployee() {
    /* this.employee = await firstValueFrom(this.employeeService.get(id)); */


  }


  saveEmployee() {



    const employeeData: Employee = { ...this.employeeForm.value };

    this.employeeService.create(employeeData).subscribe((employee: Employee) => {
      console.log(employee)
      this.router.navigateByUrl('/employees');
      
    });
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
