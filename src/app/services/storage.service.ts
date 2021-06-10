import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveStorage(name: string, data: object) {
    sessionStorage.setItem(name, JSON.stringify(data));
  }

  getStorage(name: string) {
    let data = sessionStorage.getItem(name);

    return JSON.parse(data);
  }
}
