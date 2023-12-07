import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { EmployeeModel } from './employee-dashboardmodel';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  EmployeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  
  employeeModelObj: EmployeeModel =new EmployeeModel ();
  constructor( private formBuilder:FormBuilder,private api :ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',Validators.required],
      Mobile:['',Validators.required],
      Salary:['',Validators.required],
    }) 
    this.getallEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.LastName;
    this.employeeModelObj.email = this.formValue.value.Email;
    this.employeeModelObj.Mobile = this.formValue.value.Mobile;
    this.employeeModelObj.salary = this.formValue.value.Salary;


    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log("data added successfully",res);
      alert("Employee Added Sucessfuly");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset()
      this.getallEmployee();
    },
    err=>{
      alert("Something Went Wrong");
    });
  }

  getallEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.EmployeeData = res;
      console.log("get all employee on grid",this.EmployeeData);
    })
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getallEmployee();
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['LastName'].setValue(row.lastName);
    this.formValue.controls['Email'].setValue(row.email);
    this.formValue.controls['Mobile'].setValue(row.Mobile);
    this.formValue.controls['Salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.LastName;
    this.employeeModelObj.email = this.formValue.value.Email;
    this.employeeModelObj.Mobile = this.formValue.value.Mobile;
    this.employeeModelObj.salary = this.formValue.value.Salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Details Updated Sucessfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset()
      this.getallEmployee();
    })
  }
}
