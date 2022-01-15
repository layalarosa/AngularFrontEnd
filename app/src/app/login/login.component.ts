import { Component } from '@angular/core';

@Component({
    selector:'login-app',
    templateUrl:"./login.component.html"
})
export class LoginComponent {
    private _nombre = "Luis A Ayala";
    public get nombre() {
        return this._nombre;
    }
    public set nombre(value) {
        this._nombre = value;
    }
}