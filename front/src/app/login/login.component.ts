import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserModel } from '../user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit{

  users: UserModel[] = [];

  constructor(private userService : UserService, private route: Router) {}

  formLogin!: FormGroup

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      userEmail: new FormControl ('', [Validators.email, Validators.required]),
      userPwd: new FormControl('')
    })
  }

  onSubmit(){
    
    if(this.formLogin.invalid){
      alert('email invalido');
      return
    }
    const emailForm = this.formLogin.value.userEmail;
    const pwdForm = this.formLogin.value.userPwd;
    this.userService.getUser(emailForm, pwdForm).subscribe({
      next: (res: any) => {
        if (res === null){
          alert("senha invalida");
          return;
        }
        if(res.userType != 1){
          this.route.navigate(['client'])
        }
        else{
          this.route.navigate(['admin']);
        }
      },
      error: error =>{
        console.log(error)
      }
    })
    console.log(emailForm);
    console.log(pwdForm);
  }
}
