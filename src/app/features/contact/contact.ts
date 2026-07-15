import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get nom() {
    return this.contactForm.get('nom');
  }

  get prenom() {
    return this.contactForm.get('prenom');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get messageControl() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.contactForm.value;

    // Créer un FormData pour envoyer via FormSubmit
    const data = new FormData();
    data.append('nom', formData.nom);
    data.append('prenom', formData.prenom);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('_subject', `Nouveau message de ${formData.prenom} ${formData.nom}`);
    data.append('_redirect', 'https://yourdomain.com/contact'); // Redirection après envoi

    // Envoyer via FormSubmit (service gratuit)
    this.http.post('https://formsubmit.co/bobypro225@gmail.com', data)
      .subscribe(
        (response: any) => {
          console.log('Email envoyé avec succès:', response);
          this.messageType = 'success';
          this.message = '✅ Votre message a été envoyé avec succès!';
          this.contactForm.reset();
          this.submitted = false;
          this.loading = false;

          setTimeout(() => {
            this.message = '';
          }, 5000);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi:', error);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de l\'envoi. Veuillez réessayer.';
          this.loading = false;

          setTimeout(() => {
            this.message = '';
          }, 5000);
        }
      );
  }
}
