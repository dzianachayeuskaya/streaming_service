import { el } from 'redom';

export class SearchView {
  input: HTMLInputElement;

  constructor() {
    this.input = el('input', {
      type: 'search',
      placeholder: 'ЧТО БУДЕМ ИСКАТЬ?',
      disabled: 'disabled',
    });
    this.input.classList.add('header__search__field');
  }

  getElement() {
    return el('.header__search', this.input);
  }
}
