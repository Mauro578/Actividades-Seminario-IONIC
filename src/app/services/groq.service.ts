import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}
//EL ultimo dijito de la APIKEY es el M
@Injectable({ providedIn: 'root' })
export class GroqService {
  private apiKey = 'gsk_vyeI57RKqADRHnvvCkaVWGdyb3FYgtv7W6P43Y8utd22YltOiiT';

  private endpoint = 'https://api.groq.com/openai/v1/chat/completions';

  private model = 'qwen/qwen3-32b';

  constructor(private http: HttpClient) {}

  generateReply(messages: GroqMessage[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    });

    const body = {
      model: this.model,
      messages,
      temperature: 0.7,
      max_tokens: 2000
    };

    return this.http.post<GroqResponse>(this.endpoint, body, { headers }).pipe(
      map(res => res?.choices?.[0]?.message?.content || '...')
    );
  }
}
