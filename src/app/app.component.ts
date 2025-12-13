import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RAG UI';
  selectedFiles: File[] = [];
  question: string | null = '';
  answer: string | null = null;
  sources: any[] = [];
  loadingUpload = false;
  loadingQuery = false;
  backendUrl = environment.backendUrl;

  // Azure Config Fields
  azureEndpoint: string = '';
  embeddingDeploymentName: string = '';
  chatCompletionDeploymentName: string = '';
  azureApiKey: string = '';
  embedModelApiVersion: string = '';
  chatCompletionModelApiVersion: string = '';
  chromaDbCollectionName: string = '';

  constructor(private http: HttpClient) {}

  get isConfigured(): boolean {
    return (
      this.azureEndpoint.trim() !== '' &&
      this.embeddingDeploymentName.trim() !== '' &&
      this.chatCompletionDeploymentName.trim() !== '' &&
      this.azureApiKey.trim() !== '' &&
      this.embedModelApiVersion.trim() !== '' &&
      this.chatCompletionModelApiVersion.trim() !== '' &&
      this.chromaDbCollectionName.trim() !== ''
    );
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  async upload() {
    if (!this.selectedFiles.length) return;
    const fd = new FormData();
    for (const f of this.selectedFiles) {
      fd.append('files', f, f.name);
    }
    //fd.append('embeddingDeploymentName', this.embeddingDeploymentName);
    //fd.append('embedModelApiVersion', this.embedModelApiVersion);
    this.loadingUpload = true;
    try {
      await this.http.post(`${this.backendUrl}/upload`, fd).toPromise();
      alert('Uploaded, indexing in background.');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      this.loadingUpload = false;
    }
  }

  async ask() {
    if (!this.question) return;
    this.loadingQuery = true;
    this.answer = null;
    this.sources = [];
    try {
      const resp: any = await this.http.post(`${this.backendUrl}/query`, { question: this.question }).toPromise();
      this.answer = resp.answer;
      this.sources = resp.sources || [];
    } catch (err) {
      console.error(err);
      alert('Query failed');
    } finally {
      this.loadingQuery = false;
    }
  }

  async setConfig() {
    const configPayload = {
      azureEndpoint: this.azureEndpoint,
      embeddingDeploymentName: this.embeddingDeploymentName,
      chatCompletionDeploymentName: this.chatCompletionDeploymentName,
      azureApiKey: this.azureApiKey,
      embedModelApiVersion: this.embedModelApiVersion,
      chatCompletionModelApiVersion: this.chatCompletionModelApiVersion,
      chromaDbCollectionName: this.chromaDbCollectionName
    };
    try {
      await this.http.post(`${this.backendUrl}/config`, configPayload).toPromise();
      alert('Configuration saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save configuration');
    }
  }
}
