import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "../../auth.service";
import { setString } from "tns-core-modules/application-settings";
import {Page} from "tns-core-modules/ui/page"
import { alert } from "../../dialog-util";

@Component({
	selector: "Login",
	moduleId: module.id,
	templateUrl: "./login.component.html",
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user: any = {
        email: '',
        password: ''
    };

	isLoggingIn = true;

	toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
	}
	constructor(
		private router: Router,
		private routerExtensions: RouterExtensions,
		private page: Page,
		private userService: AuthService,
	) {
	}

	ngOnInit() {
		this.page.actionBarHidden = true;
	}

	submit() {
		if (!this.user.email) {
			alert("Enter a valid email address.");
			return;
		}

		if (this.isLoggingIn) {
			this.login();
		} else {
			this.signUp();
		}
	}

	login() {
		// this.userService.login(this.user)
		// 	.then(status => {
		// 		setString("user_id", this.user.email);
		// 		this.routerExtensions.navigate(["/"], { clearHistory: true });
		// 	}, err => {
		// 		this.clearFields();
		// 		alert("Unfortunately we could not find your account.");
        // 	});
        this.userService.signInUser(this.user).subscribe(res => {
            setString("token", res.token);
            console.log(res.token)
            this.routerExtensions.navigate(["/"], { clearHistory: true });
        }, err => {
            this.clearFields();
            alert("Unfortunately we could not find your account.");
        }, () => console.log('HTTP request completed.'));
	}

	signUp() {
        this.userService.signUpUser(this.user).subscribe(res => {
            alert("Your account was successfully created.");
            this.toggleDisplay();
            this.clearFields();

        }, err => {
            this.clearFields();
            alert("Unfortunately we were unable to create your account.")
        }, () => console.log('HTTP request completed.'));

	}

	clearFields() {
		this.user.email = '';
		this.user.password = '';
	}

}
