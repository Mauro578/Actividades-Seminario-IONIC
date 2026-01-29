import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Photo{
    id: string;
    author: string;
    download_url: string;
}

@Injectable({ providedIn: 'root'})

export class PhotosService{
    private apiUrl = 'https://picsum.photos/v2/list?page=1&limit=30';

    constructor(private http: HttpClient){}

    getPhotos(): Observable<Photo[]>{
        return this.http.get<Photo[]>(this.apiUrl)
    }
}