import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString, remove } from "tns-core-modules/application-settings";
import { Item, Todo } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: Item;
    todo: Todo = {};
    id: string;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute,
        private router: RouterExtensions
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        // this.item = this.itemService.getItem(id);
        console.log(id)
        this.getTodo(id);
    }

    getTodo(id: string){
        this.itemService.getTodo(id)
            .subscribe((result) => {
                this.todo = result;
            }, (error) => {
                console.log(error);
            });
    }

    update() {
        const id = this.route.snapshot.params.id;
        this.itemService.update(id, this.todo)
            .subscribe((result) => {
                this.router.navigate(['/items']);
            }, (error) => {
                console.log(error);
            });
    }

    delete() {
        const id = this.route.snapshot.params.id;
        this.itemService.delete(id)
            .subscribe((result) => {
                this.router.navigate(['/items']);
            }, (error) => {
                console.log(error);
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
