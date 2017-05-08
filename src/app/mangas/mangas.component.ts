import { Component, OnInit } from '@angular/core';
import { MangaService } from './manga.service'
import { Router } from '@angular/router';

import { Manga } from './manga.model';
import { MangaDetailComponent } from '../manga-detail/manga-detail.component';
import { SearchbarComponent } from "../searchbar/searchbar.component";

import { Auth } from "../auth.service";

@Component({
    selector: 'mangas',
    templateUrl: 'mangas.component.html',
    styleUrls: ['mangas.component.css'],
    providers: [MangaService],
})
export class MangasComponent implements OnInit {
    title = "List of all mangas";
    mangas : Manga[] = [];
    
    selectedManga : Manga;
    filterText : string;
    
    constructor(private mangaService : MangaService, private router : Router, public auth: Auth) { 
        this.filterText = "";
    }

    getMangas() {
        this.mangaService.getMangas().then(mangas => this.mangas = mangas);
    }

    ngOnInit() { 
        this.getMangas();
    }
    
    onSelect(manga: Manga)  {
        this.selectedManga = manga;
    }

    followManga(manga: Manga): void {
        this.mangaService.followManga(manga).then(resp => this.getMangas());
    }

    unfollowManga(manga: Manga): void {
        this.mangaService.unfollowManga(manga).then(resp => this.getMangas());
    }
}