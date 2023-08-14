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
      userEmail: new FormControl ('', [Validators.email, Validators.required])
    })
  }

  onSubmit(){
    
    if(this.formLogin.invalid){
      alert('email invalido');
      return
    }

    const emailForm = this.formLogin.value.userEmail;
    this.userService.getUser(emailForm).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log(res.userType);
        if(res.userType != 1){
          this.route.navigate(['client'])
        }
        else{

          this.route.navigate(['admin']);
        }
      }
    })
    console.log(emailForm);
  }
}
