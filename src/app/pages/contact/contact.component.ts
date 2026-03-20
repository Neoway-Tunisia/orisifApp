import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BreadcrumbsComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateTags(
      "Orisif - Fournisseur de solutions et d'équipements de laboratoire en Tunisie",
      "Une question ? Un devis ? Contactez l'équipe Orisif pour vos besoins en équipements de laboratoire en Tunisie.",
      "assets/img/backgroundOrisif.png",
      "https://orisif.com/contact"
    );
  }

  onSubmit() {
    const body = new URLSearchParams({
      'form-name': 'contact',
      ...this.contactData
    }).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
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
