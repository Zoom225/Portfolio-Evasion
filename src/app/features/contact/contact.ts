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

    // Simulate email sending
    setTimeout(() => {
      console.log('Formulaire envoyé:', formData);
      this.message = '✅ Votre message a été envoyé avec succès!';
      this.loading = false;
      this.contactForm.reset();
      this.submitted = false;

      // Clear message after 5 seconds
      setTimeout(() => {
        this.message = '';
      }, 5000);
    }, 1500);
  }
}
