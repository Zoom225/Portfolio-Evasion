import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    }
  ];
}
