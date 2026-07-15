import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  // EmailJS Configuration - À remplacer par vos clés
  private emailjsServiceId = 'YOUR_SERVICE_ID';
  private emailjsTemplateId = 'YOUR_TEMPLATE_ID';
  private emailjsPublicKey = 'YOUR_PUBLIC_KEY';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    // Initialiser EmailJS - À remplacer par votre clé publique
    emailjs.init(this.emailjsPublicKey);
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

    // Paramètres pour l'email
    const templateParams = {
      from_name: `${formData.prenom} ${formData.nom}`,
      from_email: formData.email,
      to_email: 'bobypro225@gmail.com',
      subject: `Nouveau message de ${formData.prenom} ${formData.nom}`,
      message: formData.message,
      reply_to: formData.email
    };

    // Envoyer l'email via EmailJS
    emailjs
      .send(this.emailjsServiceId, this.emailjsTemplateId, templateParams)
      .then(
        (response) => {
          console.log('Email envoyé avec succès:', response);
          this.messageType = 'success';
          this.message = '✅ Votre message a été envoyé avec succès!';
          this.contactForm.reset();
          this.submitted = false;
          this.loading = false;

          // Effacer le message après 5 secondes
          setTimeout(() => {
            this.message = '';
          }, 5000);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi:', error);
          this.messageType = 'error';
          this.message = '❌ Erreur lors de l\'envoi du message. Veuillez réessayer.';
          this.loading = false;

          // Effacer le message après 5 secondes
          setTimeout(() => {
            this.message = '';
          }, 5000);
        }
      );
  }
}
