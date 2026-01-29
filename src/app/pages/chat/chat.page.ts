import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GroqService } from '../../services/groq.service';

type ChatMsg = { from: 'user' | 'bot'; text: string };

type GroqRole = 'system' | 'user' | 'assistant';

interface GroqMessage {
  role: GroqRole;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatPage {
  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola, soy Qwen. ¿En qué te puedo ayudar?' }
  ];

  // Historial real que se envía a Groq
  conversation: GroqMessage[] = [
    {
      role: 'system',
      content: `
        Eres Qwen, un asistente conversacional.`
    }
  ];


  constructor(private groq: GroqService) {}

  send() {
    const text = this.input.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.input = '';

    
    this.messages.push({ from: 'user', text });

    
    this.conversation.push({
      role: 'user',
      content: text
    });

    this.groq
      .generateReply(this.conversation)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: (reply) => {
          let safeReply = reply?.trim() || '...';

          
          safeReply = safeReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

          this.messages.push({ from: 'bot', text: safeReply });

          this.conversation.push({
            role: 'assistant',
            content: safeReply
          });
        },

        error: (err) => {
          console.error(err);
          const msg = 'Profesor no me deja publicar un api key real en github  le quite el ultimo dijito a la APIKEY que es la M hay que ponerla y funciona perfecto .';
          this.messages.push({ from: 'bot', text: msg });
        }
      });
  }

  trackByIndex(i: number) {
    return i;
  }
}
