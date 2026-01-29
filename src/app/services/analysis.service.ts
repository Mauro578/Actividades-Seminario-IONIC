import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  analyzeText(text: string): Observable<any> {

    if (!text || text.trim().length === 0) {
      return throwError(() => 'Texto vacío');
    }

    
    let result;

    const lower = text.toLowerCase();

    if (lower.includes('bien') || lower.includes('genial') || lower.includes('feliz')) {
      result = [{ label: 'POSITIVE', score: 0.95 }];
    } else if (lower.includes('mal') || lower.includes('triste') || lower.includes('error')) {
      result = [{ label: 'NEGATIVE', score: 0.92 }];
    } else {
      result = [{ label: 'NEUTRAL', score: 0.60 }];
    }

   
    return of(result).pipe(delay(1200));
  }
}
