import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language';

type FrameworkCard = {
  name: string;
  imageUrl: string;
  alt: string;
};

@Component({
  selector: 'app-framework-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './framework-grid.html',
  styleUrl: './framework-grid.css'
})
export class FrameworkGridComponent {
  constructor(public languageService: LanguageService) {}

  frameworks: FrameworkCard[] = [
    {
      name: 'Angular',
      imageUrl: 'https://angular.io/assets/images/logos/angular/angular.svg',
      alt: 'Logo Angular'
    },
    {
      name: 'Spring Boot',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg',
      alt: 'Logo Spring Boot'
    },
    {
      name: 'Docker',
      imageUrl: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
      alt: 'Logo Docker'
    },
    {
      name: 'TailwindCSS',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
      alt: 'Logo TailwindCSS'
    },
    {
      name: 'HTML5',
      imageUrl: 'https://www.w3.org/html/logo/badge/html5-badge-h-solo.png',
      alt: 'Logo HTML5'
    },
    {
      name: 'GitHub',
      imageUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      alt: 'Logo GitHub'
    },
    {
      name: 'Git',
      imageUrl: 'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png',
      alt: 'Logo Git'
    },
    {
      name: 'TypeScript',
      imageUrl: 'https://www.typescriptlang.org/favicon-32x32.png',
      alt: 'Logo TypeScript'
    },
    {
      name: 'CSS3',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
      alt: 'Logo CSS3'
    },
    {
      name: 'JavaScript',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
      alt: 'Logo JavaScript'
    },
    {
      name: 'PostgreSQL',
      imageUrl: 'https://www.postgresql.org/media/img/about/press/elephant.png',
      alt: 'Logo PostgreSQL'
    },
    {
      name: 'MongoDB',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
      alt: 'Logo MongoDB'
    }
  ];
}
