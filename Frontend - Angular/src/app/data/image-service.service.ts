import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private httpClient: HttpClient) { }

    public baseUrl = environment.baseServiceUrl;

    //Upload Image------------------------
    public uploadImage(formData: FormData): Observable<any> {
        const file = formData.get('file') as File;
        const url = this.baseUrl + `api/images/upload?file=${file.name}`;
        return this.httpClient.post<any>(url, formData, { responseType: 'text' as 'json' });
    }

    //get image-------------------------
    public getImage(imgName): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}api/images/getImage/${imgName}.jpg`,
        {
          responseType : 'text' as 'json'
        });
    }
    
    public Image(userId){
        return  `${this.baseUrl}api/images/getImage/${userId}.jpg`;
    }
}