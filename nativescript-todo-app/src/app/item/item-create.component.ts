import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, remove } from "tns-core-modules/application-settings";
import { Item, Todo } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-create",
    templateUrl: "./item-create.component.html"
})
export class ItemCreateComponent implements OnInit {
    item: Item;
    title: string = '';
    description: string = '';
    todo: Todo = {
        title: '',
        description: '',
    };

    message: string = '';
    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute,
        private router: RouterExtensions
    ) {  }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
    }

    submit() {
        this.itemService.create(this.todo).subscribe(res => {
            // this.message = (<any>res).json.data.title;

            this.router.navigate(['/items']);
        });
    }

    cancel() {
        this.router.navigate(['/items']);
    }

    logout() {
        remove("token");
        this.router.navigate(['/login']);
    }
}
