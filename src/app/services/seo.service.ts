import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultTitle = "Orisif - Fournisseur de solutions et d'équipements de laboratoire en Tunisie";
  private readonly defaultDescription = "Nous proposons une sélection d'équipements scientifiques européens certifiés, destinés aux laboratoires médicaux, de recherche et aux professionnels de santé.";
  private readonly defaultImage = "https://orisif.com/assets/img/backgroundOrisif.webp";
  private readonly defaultUrl = "https://orisif.com/";
  private readonly defaultKeywords = "Biosan Tunisie, Equipement de laboratoire tunisie, micro pipette tunisie, fournisseur scientifique tunisie, médical, recherche, industrie";

  constructor(private titleService: Title, private metaService: Meta) {}

  setDefaults() {
    this.updateTags(this.defaultTitle, this.defaultDescription, this.defaultImage, this.defaultUrl, this.defaultKeywords);
  }

  updateTags(title: string, description: string, image: string, url: string, keywords?: string) {
    this.titleService.setTitle(title);

    // Basic Meta
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'title', content: title });
    if (keywords) {
      this.metaService.updateTag({ name: 'keywords', content: keywords });
    } else {
      this.metaService.updateTag({ name: 'keywords', content: this.defaultKeywords });
    }

    // Ensure image is absolute
    const absoluteImage = image.startsWith('http') ? image : `https://orisif.com/${image.startsWith('/') ? image.substring(1) : image}`;

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: absoluteImage });
    this.metaService.updateTag({ property: 'og:url', content: url });

    // Twitter
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: absoluteImage });
    this.metaService.updateTag({ name: 'twitter:url', content: url });

    // Canonical Link
    this.updateCanonicalTag(url);
  }

  private updateCanonicalTag(url: string) {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setJsonLd(data: any) {
    const script = document.getElementById('json-ld') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(data);
    } else {
      const newScript = document.createElement('script');
      newScript.id = 'json-ld';
      newScript.type = 'application/ld+json';
      newScript.text = JSON.stringify(data);
      document.getElementsByTagName('head')[0].appendChild(newScript);
    }
  }
}
