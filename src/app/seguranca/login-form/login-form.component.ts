import { Component, OnInit } from '@angular/core';
import {Login} from "../../core/modelos/login";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  login(usuario:String,senha:String) {
    console.log(usuario);
    console.log(senha);
  }
}
