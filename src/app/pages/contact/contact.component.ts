import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BreadcrumbsComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    // Netlify requires URL encoded form data
    const formData = new URLSearchParams();
    formData.append('form-name', 'contact');
    formData.append('name', this.contactData.name);
    formData.append('email', this.contactData.email);
    formData.append('subject', this.contactData.subject);
    formData.append('message', this.contactData.message);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })
      .then(() => {
        alert('Merci pour votre message. Nous vous contacterons bientôt.');
        this.contactData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      })
      .catch((error) => {
        console.error('Netlify Form Error:', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      });
  }
}
