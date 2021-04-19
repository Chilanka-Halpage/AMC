import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private httpClient: HttpClient) { }

    public baseUrl = 'http://localhost:8080/api/images';

    //Upload Image------------------------
    public uploadImage(formData: FormData): Observable<any> {
        const file = formData.get('file') as File;
        const url = this.baseUrl + `/upload?file=${file.name}`;
        return this.httpClient.post<any>(url, formData, { responseType: 'text' as 'json' });
    }

    //get image-------------------------
    public getImage(imgName): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/getImage/${imgName}.jpg`,
        {
          responseType : 'text' as 'json'
        });
    }
    
    public Image(userId){
        return  `${this.baseUrl}/getImage/${userId}.jpg`;
    }

}