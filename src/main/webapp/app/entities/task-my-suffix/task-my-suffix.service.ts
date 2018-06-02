import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TaskMySuffix } from './task-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TaskMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/tasks';

    constructor(private http: Http) { }

    create(task: TaskMySuffix): Observable<TaskMySuffix> {
        const copy = this.convert(task);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(task: TaskMySuffix): Observable<TaskMySuffix> {
        const copy = this.convert(task);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TaskMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to TaskMySuffix.
     */
    private convertItemFromServer(json: any): TaskMySuffix {
        const entity: TaskMySuffix = Object.assign(new TaskMySuffix(), json);
        return entity;
    }

    /**
     * Convert a TaskMySuffix to a JSON which can be sent to the server.
     */
    private convert(task: TaskMySuffix): TaskMySuffix {
        const copy: TaskMySuffix = Object.assign({}, task);
        return copy;
    }
}
