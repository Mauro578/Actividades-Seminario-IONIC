import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../../services/media.service';
import { AnalysisService } from '../../services/analysis.service';

@Component({
  standalone: true,
  selector: 'app-media',
  templateUrl: './media.page.html',
  imports: [CommonModule, IonicModule, FormsModule]
})
export class MediaPage {

  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;

  cameraGranted = false;
  micGranted = false;

  imageData: string | null = null;
  audioUrl: string | null = null;

  isRecording = false;
  description = '';
  analysisResult: any = null;
  loadingAnalysis = false;

  constructor(
    private media: MediaService,
    private analysis: AnalysisService
  ) {}

  async requestPermissions() {
    try {
      const stream = await this.media.requestPermissions();

      this.cameraGranted = true;
      this.micGranted = true;

      const videoEl = this.video.nativeElement;
      videoEl.srcObject = stream;
      videoEl.muted = true; // 🔇 AQUÍ se silencia
      await videoEl.play();

    } catch {
      this.cameraGranted = false;
      this.micGranted = false;
    }
  }

  takePhoto() {
    const video = this.video.nativeElement;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);

    this.imageData = canvas.toDataURL('image/png');
  }

  async recordAudio() {
    if (this.isRecording) return;

    this.isRecording = true;
    this.media.startRecording();

    setTimeout(async () => {
      const blob = await this.media.stopRecording();
      this.audioUrl = URL.createObjectURL(blob);
      this.isRecording = false;
    }, 5500);
  }

  analyzeText() {
    this.loadingAnalysis = true;
    this.analysisResult = null;

    this.analysis.analyzeText(this.description).subscribe({
      next: (res: any[]) => {
        this.analysisResult = res[0];
        this.loadingAnalysis = false;
      },
      error: () => {
        this.loadingAnalysis = false;
      }
    });
  }

}
