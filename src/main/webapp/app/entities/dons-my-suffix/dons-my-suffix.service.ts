import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DonsMySuffix } from './dons-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DonsMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/dons';

    constructor(private http: Http) { }

    create(dons: DonsMySuffix): Observable<DonsMySuffix> {
        const copy = this.convert(dons);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dons: DonsMySuffix): Observable<DonsMySuffix> {
        const copy = this.convert(dons);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DonsMySuffix> {
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
     * Convert a returned JSON object to DonsMySuffix.
     */
    private convertItemFromServer(json: any): DonsMySuffix {
        const entity: DonsMySuffix = Object.assign(new DonsMySuffix(), json);
        return entity;
    }

    /**
     * Convert a DonsMySuffix to a JSON which can be sent to the server.
     */
    private convert(dons: DonsMySuffix): DonsMySuffix {
        const copy: DonsMySuffix = Object.assign({}, dons);
        return copy;
    }
}
