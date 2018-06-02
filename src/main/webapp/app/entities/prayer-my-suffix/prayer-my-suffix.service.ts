import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PrayerMySuffix } from './prayer-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PrayerMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/prayers';

    constructor(private http: Http) { }

    create(prayer: PrayerMySuffix): Observable<PrayerMySuffix> {
        const copy = this.convert(prayer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(prayer: PrayerMySuffix): Observable<PrayerMySuffix> {
        const copy = this.convert(prayer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PrayerMySuffix> {
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
     * Convert a returned JSON object to PrayerMySuffix.
     */
    private convertItemFromServer(json: any): PrayerMySuffix {
        const entity: PrayerMySuffix = Object.assign(new PrayerMySuffix(), json);
        return entity;
    }

    /**
     * Convert a PrayerMySuffix to a JSON which can be sent to the server.
     */
    private convert(prayer: PrayerMySuffix): PrayerMySuffix {
        const copy: PrayerMySuffix = Object.assign({}, prayer);
        return copy;
    }
}
