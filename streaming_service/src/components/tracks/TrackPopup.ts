import { el } from 'redom';

export class TrackPopup {
  private static instance: TrackPopup;
  private element: HTMLElement;
  public addBtn: HTMLElement | null = null;
  public deleteBtn: HTMLElement | null = null;
  private constructor() {
    this.element = this.createPopup();
  }

  static getInstance() {
    if (!TrackPopup.instance) {
      TrackPopup.instance = new TrackPopup();
    }
    return TrackPopup.instance;
  }

  private createPopup() {
    if (!this.element) {
      this.addBtn = el('button.track__add-btn', 'Добавить в плейлист');
      this.deleteBtn = el('button.track__delete-btn', 'Удалить из плейлиста');
      return el('.track__dropdown', [this.addBtn, this.deleteBtn]);
    } else return this.element;
  }

  addPopup(itemId: number) {
    const el = document.getElementById(`${itemId}`);
    if (el) {
      this.element.style.display = 'flex';
      const rootEl = el.querySelector('.tracks__item__drop');
      rootEl?.append(this.element);
    }
  }

  hidePopup() {
    this.element.style.display = 'none';
  }
}
