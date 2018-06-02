import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerMySuffix } from './customer-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CustomerMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/customers';

    constructor(private http: Http) { }

    create(customer: CustomerMySuffix): Observable<CustomerMySuffix> {
        const copy = this.convert(customer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(customer: CustomerMySuffix): Observable<CustomerMySuffix> {
        const copy = this.convert(customer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CustomerMySuffix> {
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
     * Convert a returned JSON object to CustomerMySuffix.
     */
    private convertItemFromServer(json: any): CustomerMySuffix {
        const entity: CustomerMySuffix = Object.assign(new CustomerMySuffix(), json);
        return entity;
    }

    /**
     * Convert a CustomerMySuffix to a JSON which can be sent to the server.
     */
    private convert(customer: CustomerMySuffix): CustomerMySuffix {
        const copy: CustomerMySuffix = Object.assign({}, customer);
        return copy;
    }
}
