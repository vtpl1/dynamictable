import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { CustomHttpUrlEncodingCodec } from '../encoder';
import { AnprEventsResponse } from '../models/anprEventsResponse';

@Injectable({
  providedIn: 'root',
})
export class TableAJAXService {
  protected basePath = '/eve';
  protected anprEventPath = this.basePath + '/anprEvents';
  protected anprEventPath1 = 'assets/showcase/data/1.json';

  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient) {}

  /**
   * Get all anprEvents
   * Get all anprEvents
   * @param where The where clause takes a JSON as a string with one or many properties of the anprEvent model.
   * Example:   * To find anprEvents with engineTaskId equal 5c1956e925b6b30001103eaa, use /anprEvents?where&#x3D;{\&quot;eventDetails.engineTaskId\&quot;:\&quot;5c1956e925b6b30001103eaa\&quot;}   * To find anprEvents with engineTaskId equal 5c1956e925b6b30001103eaa and sourceId equal 5c1956e925b6b30001103eab, use /anprEvents?where&#x3D;{\&quot;eventDetails.engineTaskId\&quot;:\&quot;5c1956e925b6b30001103eaa\&quot;,\&quot;eventDetails.sourceId\&quot;:\&quot;5c1956e925b6b30001103eab\&quot;}
   * @param sort The sort query parameter sorts the result set in ascending and desending order by one of the property of the result set. Example:   * To sort anprEvents by startTimeStamp in eventDetails IN ASCEDING order, use /anprEvents?sort&#x3D;eventDetails.startTimeStamp   * To sort anprEvents by startTimeStamp in eventDetails IN DECENDING order, use /anprEvents?sort&#x3D;-eventDetails.startTimeStamp   * Please note the - (minus) sign in front of the eventDetails.startTimeStamp, that indicates inverse of ASCENDING
   * @param maxResults The maxResults query parameter limits results equal to # of maxResults. Example:   * To get latest anprEvent among whole anprEvents, use /anprEvents?maxResults&#x3D;1   * To limit anprEvents to 5, use /anprEvents?maxResults&#x3D;5
   * @param embedded The embedded clause takes a JSON as a string with eventSnaps argument. Example:   * &#x27;To find anprEvents with eventSnap object. use /anprEvents?embedded&#x3D;{\&quot;eventSnaps\&quot;:1}&#x27;
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public anprEventsGet(
    page?: number,
    where?: string,
    sort?: string,
    maxResults?: number,
    embedded?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<AnprEventsResponse>;
  public anprEventsGet(
    page?: number,
    where?: string,
    sort?: string,
    maxResults?: number,
    embedded?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<AnprEventsResponse>>;
  public anprEventsGet(
    page?: number,
    where?: string,
    sort?: string,
    maxResults?: number,
    embedded?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<AnprEventsResponse>>;
  public anprEventsGet(
    page?: number,
    where?: string,
    sort?: string,
    maxResults?: number,
    embedded?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', page as any);
    }
    if (where !== undefined && where !== null) {
      queryParameters = queryParameters.set('where', where as any);
    }
    if (sort !== undefined && sort !== null) {
      queryParameters = queryParameters.set('sort', sort as any);
    }
    if (maxResults !== undefined && maxResults !== null) {
      queryParameters = queryParameters.set('maxResults', maxResults as any);
    }
    if (embedded !== undefined && embedded !== null) {
      queryParameters = queryParameters.set('embedded', embedded as any);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<AnprEventsResponse>(
      'get',
      `${this.anprEventPath1}`,
      {
        // params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }
}
