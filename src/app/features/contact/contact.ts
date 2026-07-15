import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder) {
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

    // Envoyer via Formspree
    const formspreeData = new FormData();
    formspreeData.append('nom', formData.nom);
    formspreeData.append('prenom', formData.prenom);
    formspreeData.append('email', formData.email);
    formspreeData.append('message', formData.message);
    formspreeData.append('_subject', `Nouveau message de ${formData.prenom} ${formData.nom}`);
    formspreeData.append('_replyto', formData.email);

    fetch('https://formspree.io/f/xvgqzobd', {
      method: 'POST',
      body: formspreeData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        this.messageType = 'success';
        this.message = '✅ Votre message a été envoyé avec succès!';
        this.contactForm.reset();
        this.submitted = false;
        this.loading = false;

        setTimeout(() => {
          this.message = '';
        }, 5000);
      } else {
        throw new Error('Erreur serveur');
      }
    })
    .catch((error) => {
      console.error('Erreur:', error);
      this.messageType = 'error';
      this.message = '❌ Erreur lors de l\'envoi. Veuillez réessayer.';
      this.loading = false;

      setTimeout(() => {
        this.message = '';
      }, 5000);
    });
  }
}
