import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { LocationMySuffix } from './location-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LocationMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/locations';

    constructor(private http: Http) { }

    create(location: LocationMySuffix): Observable<LocationMySuffix> {
        const copy = this.convert(location);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(location: LocationMySuffix): Observable<LocationMySuffix> {
        const copy = this.convert(location);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<LocationMySuffix> {
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
     * Convert a returned JSON object to LocationMySuffix.
     */
    private convertItemFromServer(json: any): LocationMySuffix {
        const entity: LocationMySuffix = Object.assign(new LocationMySuffix(), json);
        return entity;
    }

    /**
     * Convert a LocationMySuffix to a JSON which can be sent to the server.
     */
    private convert(location: LocationMySuffix): LocationMySuffix {
        const copy: LocationMySuffix = Object.assign({}, location);
        return copy;
    }
}
