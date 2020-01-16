import { Component, OnInit } from "@angular/core";
import { getString, setString, remove } from "tns-core-modules/application-settings";
import { Item, Todo } from "./item";
import { ItemService } from "./item.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;
    todos: Array<Todo>;

    constructor(
        private itemService: ItemService,
        private router: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        this.extractData();
    }



    extractData() {
        this.itemService.getAllTodos()
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                console.log(error);
            });
    }

    private onGetDataSuccess(res) {
        this.todos = res;
    }

    logout() {
        remove("token");
        this.router.navigate(['/login']);
    }
}
