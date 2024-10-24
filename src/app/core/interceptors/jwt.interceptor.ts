import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Inject} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = Inject(LocalStorageService).getToken();
  const local = Inject(LocalStorageService);
  const router = Inject(Router);
  if (token){
    req = req.clone({
      setHeaders : {Authorisation: `Bearer ${JSON.parse(token).token}`
      }
    })
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403 || error.status === 400 && error.error.errorCode === 'INVALID_TOKEN') {
        local.destroyToken();
        router.navigate(['/login']);
      }
      return throwError(() => new Error(`Authentication error : ${error.error.message} || ${error.error.errorCode}`));
    })
  );
};



// export class jwtInterceptor implements HttpInterceptor{
//   constructor(private local: LocalStorageService,private router :Router) {
//   }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
//     const token: string | null = this.local.getToken();
//     if (token) {
//       req = req.clone({
//         setHeaders: {Authorisation: `Bearer ${JSON.parse(token).token}`}
//       });
//     }
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401 || error.status === 403 || error.status === 400 && error.error.errorCode === 'INVALID_TOKEN') {
//           this.local.destroyToken();
//           this.router.navigate(['/login']);
//         }
//         return throwError(() => new Error(`Authentication error : ${error.error.message} || ${error.error.errorCode}`));
//       })
//     );
//   }
// }
