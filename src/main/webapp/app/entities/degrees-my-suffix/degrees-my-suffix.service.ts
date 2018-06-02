import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DegreesMySuffix } from './degrees-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DegreesMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/degrees';

    constructor(private http: Http) { }

    create(degrees: DegreesMySuffix): Observable<DegreesMySuffix> {
        const copy = this.convert(degrees);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(degrees: DegreesMySuffix): Observable<DegreesMySuffix> {
        const copy = this.convert(degrees);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DegreesMySuffix> {
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
     * Convert a returned JSON object to DegreesMySuffix.
     */
    private convertItemFromServer(json: any): DegreesMySuffix {
        const entity: DegreesMySuffix = Object.assign(new DegreesMySuffix(), json);
        return entity;
    }

    /**
     * Convert a DegreesMySuffix to a JSON which can be sent to the server.
     */
    private convert(degrees: DegreesMySuffix): DegreesMySuffix {
        const copy: DegreesMySuffix = Object.assign({}, degrees);
        return copy;
    }
}
