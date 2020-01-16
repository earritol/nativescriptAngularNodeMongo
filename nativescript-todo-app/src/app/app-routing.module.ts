import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { ItemCreateComponent } from "./item/item-create.component";
import { LoginComponent } from "./user/login/login.component";
import { AuthGuard } from './auth.guard';
import { path } from "tns-core-modules/file-system/file-system";

const routes: Routes = [
    { path: "", redirectTo: "/items", pathMatch: "full" },
    { path: "items", component: ItemsComponent, canActivate: [AuthGuard] },
    { path: "item/:id", component: ItemDetailComponent },
    { path: "create", component: ItemCreateComponent},
    { path: "login", component: LoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
