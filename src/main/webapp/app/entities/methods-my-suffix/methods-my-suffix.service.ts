import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { MethodsMySuffix } from './methods-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MethodsMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/methods';

    constructor(private http: Http) { }

    create(methods: MethodsMySuffix): Observable<MethodsMySuffix> {
        const copy = this.convert(methods);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(methods: MethodsMySuffix): Observable<MethodsMySuffix> {
        const copy = this.convert(methods);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MethodsMySuffix> {
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
     * Convert a returned JSON object to MethodsMySuffix.
     */
    private convertItemFromServer(json: any): MethodsMySuffix {
        const entity: MethodsMySuffix = Object.assign(new MethodsMySuffix(), json);
        return entity;
    }

    /**
     * Convert a MethodsMySuffix to a JSON which can be sent to the server.
     */
    private convert(methods: MethodsMySuffix): MethodsMySuffix {
        const copy: MethodsMySuffix = Object.assign({}, methods);
        return copy;
    }
}
