import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {}

  public formatDate(iso: string): string {
    return new Date(iso).toLocaleString('sr-RS')
  }

  public generateMovieImage(dest: string): string {
    if (dest.toLowerCase() === 'inglourious basterds') {
      return 'https://akns-images.eonline.com/eol_images/Entire_Site/20121112/1024.inglourious.ls.121212.jpg?fit=around%7C1024:759&output-quality=90&crop=1024:759;center,top'
    }
   
    return `https://img.pequla.com/destination/${dest.split(' ')[0].toLowerCase()}.jpg`
  }
}