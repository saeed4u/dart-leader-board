import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {ErrorService} from "../service/error/error.service";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers;
    if (headers.has('content-type')) {
      req = req.clone(
        {
          headers: headers.append('contend-type', 'application/json')
        }
      );
    }
    console.log(this.errorService);
    return next.handle(req).pipe(catchError((res: HttpResponse)=>{
        this.errorService.setValue('There is an error');
        return throwError(res.statusText);
    }));
  }

}
