import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root",

})

export class PostsService {
    private apiURL = "https://jsonplaceholder.typicode.com/posts"
    
    constructor( private http: HttpClient){
    }

    getPosts(): Observable<any>{
        return this.http.get<any []>(this.apiURL)

    }
}