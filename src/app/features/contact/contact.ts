import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LanguageService } from '../../core/services/language';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  messageKey = '';
  messageType: 'success' | 'error' = 'success';

  private formSubmitUrl = 'https://formsubmit.co/ajax/bobypro225@gmail.com';

  constructor(private fb: FormBuilder, private http: HttpClient, public languageService: LanguageService) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      sujet: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get nom() { return this.contactForm.get('nom'); }
  get prenom() { return this.contactForm.get('prenom'); }
  get email() { return this.contactForm.get('email'); }
  get messageControl() { return this.contactForm.get('message'); }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    this.messageKey = 'contact.loading';
    this.messageType = 'success';

    const payload = {
      ...this.contactForm.value,
      _replyto: this.contactForm.value.email,
      _subject: 'Nouveau message depuis votre site Evasion !',
      _captcha: 'false',
      _template: 'table'
    };

    const headers = new HttpHeaders({
      Accept: 'application/json'
    });

    this.http.post(this.formSubmitUrl, payload, { headers }).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response) => {
        console.log('Formulaire soumis avec succès', response);
        this.messageKey = 'contact.success';
        this.messageType = 'success';
        this.contactForm.reset({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: ''
        });
        this.submitted = false;
      },
      error: (error) => {
        console.error("Erreur lors de l'envoi", error);
        this.messageKey = 'contact.error';
        this.messageType = 'error';
      }
    });
  }
}
