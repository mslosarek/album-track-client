import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  wordCountsFromSentences(sentences: string[], wordsToIgnore: string[] = []) {
    return Object.entries(sentences.reduce((wordCounts, sentence) => {
      sentence.toLowerCase().split(' ').forEach(word => {
        word = word.replace(/[\–\-\+\(\),\\\/\!]/gi, '').trim();
        if (word.length < 2 || !word || wordsToIgnore.includes(word)) {
          return;
        }

        wordCounts[word] = wordCounts[word] || 0;

        wordCounts[word] += 1;
      });

      return wordCounts;
    }, {}))
    .sort((a, b) => {
      if (a[1] === a[1]) {
        return ('' + a[0]).localeCompare(b[0]);
      }
      return a[1] < b[1] ? 1 : -1;
    });
  }

  getMostUsedWordFromAlbumTitles(albums) {
    const wordCounts = this.wordCountsFromSentences(
      albums.map(album => {
        return album.title.toLowerCase()
          .replace('greatest hit', '')
          .replace(/[:\"]/g, '')
          .replace('best of', '');
      }),
      [
        'the',
        'a',
        'an',
        'of',
        'on',
        'it',
        'at',
        'in',
        'and',
      ]
    );

    return wordCounts.filter(wordCount => wordCount[1] === wordCounts[0][1]);
  }
}
