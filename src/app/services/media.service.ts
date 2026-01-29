import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaService {

  stream!: MediaStream;
  recorder!: MediaRecorder;
  chunks: Blob[] = [];

  async requestPermissions(): Promise<MediaStream> {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    return this.stream;
  }

  startRecording() {
    this.chunks = [];
    this.recorder = new MediaRecorder(this.stream);
    this.recorder.start();
  }

  stopRecording(): Promise<Blob> {
    return new Promise(resolve => {
      this.recorder.ondataavailable = e => {
        this.chunks.push(e.data);
      };

      this.recorder.onstop = () => {
        resolve(new Blob(this.chunks, { type: 'audio/webm' }));
      };

      this.recorder.stop();
    });
  }
}
