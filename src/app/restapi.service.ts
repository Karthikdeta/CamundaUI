import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestapiService {
  constructor(private http: HttpClient) {}

  getFileInformation() {
    return this.http
      .get('http://localhost:8081/getAllFileInformation')
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getFileInformationById(id: number) {
    return this.http
      .get(`http://localhost:8081/getFileInformation/${id}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  fileUpload(fileName: String) {
    return this.http
      .post(`http://localhost:8081/fileUpload/${fileName}`, '')
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  completeUserTask(fileId: number, taskName: String) {
    return this.http
      .post(
        `http://localhost:8081/completeTask/${fileId}?taskName=${taskName}`,
        null
      )
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  getProcessActivityInfo(fileId: number) {
    return this.http
      .get(`http://localhost:8081/getProcessActivityInfo/${fileId}`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private extractData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
