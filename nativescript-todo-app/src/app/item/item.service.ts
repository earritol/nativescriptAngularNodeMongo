import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item , Todo} from "./item";
import { getString } from "tns-core-modules/application-settings";

const localUrl = 'http://192.168.100.7:3000/todos';

@Injectable({
    providedIn: "root"
})


export class ItemService {

    constructor(private http: HttpClient) { }

    private items = new Array<Item>(
        { id: 1, name: "Ter Stegen", role: "Goalkeeper" },
        { id: 3, name: "Piqué", role: "Defender" },
        { id: 4, name: "I. Rakitic", role: "Midfielder" },
        { id: 5, name: "Sergio", role: "Midfielder" },
        { id: 6, name: "Denis Suárez", role: "Midfielder" },
        { id: 7, name: "Arda", role: "Midfielder" },
        { id: 8, name: "A. Iniesta", role: "Midfielder" },
        { id: 9, name: "Suárez", role: "Forward" },
        { id: 10, name: "Messi", role: "Forward" },
        { id: 11, name: "Neymar", role: "Forward" },
        { id: 12, name: "Rafinha", role: "Midfielder" },
        { id: 13, name: "Cillessen", role: "Goalkeeper" },
        { id: 14, name: "Mascherano", role: "Defender" },
        { id: 17, name: "Paco Alcácer", role: "Forward" },
        { id: 18, name: "Jordi Alba", role: "Defender" },
        { id: 19, name: "Digne", role: "Defender" },
        { id: 20, name: "Sergi Roberto", role: "Midfielder" },
        { id: 21, name: "André Gomes", role: "Midfielder" },
        { id: 22, name: "Aleix Vidal", role: "Midfielder" },
        { id: 23, name: "Umtiti", role: "Defender" },
        { id: 24, name: "Mathieu", role: "Defender" },
        { id: 25, name: "Masip", role: "Goalkeeper" }
    );

    getItems(): Array<Item> {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter((item) => item.id === id)[0];
    }

     getAllTodos() {
        let headers = this.createRequestHeader();
        return this.http.get(localUrl, { headers: headers });
    }

    getTodo(id: string) {
        let headers = this.createRequestHeader();
        return this.http.get(localUrl + '/' + id, { headers: headers });
    }

    create(data: Todo) {
        let options = this.createRequestHeader();
        return this.http.post(localUrl,  data , { headers: options });
    }

    update(id: string, data: Todo) {
        let headers = this.createRequestHeader();
        return this.http.patch(localUrl + '/' + id, data, { headers: headers });
    }

    delete(id: string) {
        let headers = this.createRequestHeader();
        return this.http.delete(localUrl + '/' + id, { headers: headers });
    }
    // getData() {
    //     let headers = this.createRequestHeader();
    //     return this.http.get(serverUrl, { headers: headers });
    // }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            // "AuthKey": "my-key",
            "Authorization": "bearer " + getString("token"),
            "Content-Type": "application/json",
         });


        return headers;
    }
}
