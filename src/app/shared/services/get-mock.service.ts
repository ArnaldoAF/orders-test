import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class GetMockService {
  _data: Observable<any> = undefined
  _post: Observable<any> = undefined

  constructor(private http: Http) {  }

  getMock(): any {
    this._data = this.http.get('https://api.myjson.com/bins/1e7xpb')
      .map((res: Response) =>  res.json())
      .do(data => data)
      .publishReplay(1)
      .refCount()

    return this._data
  }

  putOrder(body): any {
    this._post = this.http.put('https://api.myjson.com/bins/1e7xpb', body)
      .map((res: Response) => res.json())
      .do(data => data)
      .publishReplay(1)
      .refCount()

    return this._post
  }
}
