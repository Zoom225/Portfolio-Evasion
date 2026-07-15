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

  // EmailJS Configuration
  private emailjsServiceId = 'service_p7bm5hx';
  private emailjsPublicKey = 'OYmf25JGZNAKpAKuf';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    // Initialiser EmailJS
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

    // Paramètres pour l'email - utilise les variables par défaut d'EmailJS
    const templateParams = {
      to_email: 'bobypro225@gmail.com',
      from_name: `${formData.prenom} ${formData.nom}`,
      from_email: formData.email,
      user_email: formData.email,
      user_message: formData.message,
      message: `Nouveau message de ${formData.prenom} ${formData.nom}\n\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      reply_to: formData.email
    };

    // Envoyer l'email via EmailJS sans template spécifique
    emailjs
      .send(this.emailjsServiceId, 'default_template', templateParams)
      .then(
        (response) => {
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
          this.message = '❌ Erreur lors de l\'envoi. Veuillez créer un template dans EmailJS.';
          this.loading = false;

          setTimeout(() => {
            this.message = '';
          }, 5000);
        }
      );
  }
}
