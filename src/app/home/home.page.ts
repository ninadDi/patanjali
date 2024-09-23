import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { cardAnimation } from '../utils/animations';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../services/language.service';

interface SutraItem {
  title: string;
  content: string;
  id: number;
  titlehi: string;
  contenthi: string;
  imgUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [cardAnimation]
})
export class HomePage implements OnInit {
[x: string]: any;
  items: SutraItem[] = [
    {
      title: 'Samadhi',
      content: 'Sutras: 1-51',
      id: 1,
      titlehi: 'समाधि',
      contenthi: 'सूत्र: १-५१',
      imgUrl: "assets/integration.jpg"
    },
    {
      title: 'Sadhana',
      content: 'Sutras: 52-106',
      id: 2,
      titlehi: 'साधना',
      contenthi: 'सूत्र: ५२-१०६',
      imgUrl: "assets/path.jpg"
    },
    {
      title: 'Vibhuti',
      content: 'Sutras: 107-162',
      id: 3,
      titlehi: 'विभूति',
      contenthi: 'सूत्र: १०७-१६२',
      imgUrl: "assets/powers.jpg"
    },
    {
      title: 'Kaivalya',
      content: 'Sutras: 163-196',
      id: 4,
      titlehi: 'कैवल्य',
      contenthi: 'सूत्र: १६३-१९६',
      imgUrl: "assets/liberation.jpg"
    }
  ];

  displayedItems: {
[x: string]: any; title: string; content: string; id: number 
}[] = [];
  isLoading = true;
  selectedLanguage : string = ''


  constructor(
    private router: Router, 
    public languageService: LanguageService  
  ) {}

  ngOnInit() {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
    this.precomputeContent();
  }

  colors = ['#03071e', '#6a040f', '#370617', '#9d0208'];
  // colors = ['#37242Dff;', '#B5472Aff', '#502025ff', '#472b0f'];

  getColor(index: number) {
    return this.colors[index % this.colors.length];
  }

  precomputeContent() {
    this.languageService.selectedLanguage$.subscribe(language => {
     

      this.displayedItems = this.items.map((item: SutraItem) => ({
        ...item,
        title: language === 'hi' ? item.titlehi : item.title,
        content: language === 'hi' ? item.contenthi : item.content,
        imgUrl: item.imgUrl,
        id: item.id
      }));

      this.isLoading = false;
    });
  }

  async navigateToPada(id: number) {
    const language = this.languageService.getLanguage();
    this.router.navigate(['/sutras', id], {
      state: { selectedLanguage: language }
    });
  }
}
