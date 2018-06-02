import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DepartmentMySuffix } from './department-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DepartmentMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/departments';

    constructor(private http: Http) { }

    create(department: DepartmentMySuffix): Observable<DepartmentMySuffix> {
        const copy = this.convert(department);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(department: DepartmentMySuffix): Observable<DepartmentMySuffix> {
        const copy = this.convert(department);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DepartmentMySuffix> {
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
     * Convert a returned JSON object to DepartmentMySuffix.
     */
    private convertItemFromServer(json: any): DepartmentMySuffix {
        const entity: DepartmentMySuffix = Object.assign(new DepartmentMySuffix(), json);
        return entity;
    }

    /**
     * Convert a DepartmentMySuffix to a JSON which can be sent to the server.
     */
    private convert(department: DepartmentMySuffix): DepartmentMySuffix {
        const copy: DepartmentMySuffix = Object.assign({}, department);
        return copy;
    }
}
