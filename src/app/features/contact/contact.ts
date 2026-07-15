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

    // Construire le corps du message
    const emailBody = `Nouveau message de contact:\n\nNom: ${formData.nom}\nPrénom: ${formData.prenom}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    // URL encodée pour mailto
    const mailtoLink = `mailto:bobypro225@gmail.com?subject=Nouveau message de ${encodeURIComponent(formData.prenom + ' ' + formData.nom)}&body=${encodeURIComponent(emailBody)}`;

    // Ouvrir le client email par défaut
    window.location.href = mailtoLink;

    // Simuler un envoi réussi
    setTimeout(() => {
      this.messageType = 'success';
      this.message = '✅ Votre client email s\'est ouvert. Cliquez sur Envoyer pour finaliser.';
      this.contactForm.reset();
      this.submitted = false;
      this.loading = false;

      setTimeout(() => {
        this.message = '';
      }, 7000);
    }, 500);
  }
}
