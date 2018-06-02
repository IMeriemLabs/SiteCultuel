import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CountryMySuffix } from './country-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CountryMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/countries';

    constructor(private http: Http) { }

    create(country: CountryMySuffix): Observable<CountryMySuffix> {
        const copy = this.convert(country);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(country: CountryMySuffix): Observable<CountryMySuffix> {
        const copy = this.convert(country);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CountryMySuffix> {
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
     * Convert a returned JSON object to CountryMySuffix.
     */
    private convertItemFromServer(json: any): CountryMySuffix {
        const entity: CountryMySuffix = Object.assign(new CountryMySuffix(), json);
        return entity;
    }

    /**
     * Convert a CountryMySuffix to a JSON which can be sent to the server.
     */
    private convert(country: CountryMySuffix): CountryMySuffix {
        const copy: CountryMySuffix = Object.assign({}, country);
        return copy;
    }
}
