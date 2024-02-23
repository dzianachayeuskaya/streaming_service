import { AbstractComponent } from './AbstractComponent';
import { IPlayerData } from './Interfaces/IPlayerData';
import { ITrack } from './Interfaces/ITrack';

export abstract class SmartComponent extends AbstractComponent {
  constructor(protected data: ITrack | IPlayerData) {
    super(data);
  }

  protected abstract repairHandlers(): void;

  getInteractiveElement(): HTMLElement {
    const el = this.getElement();
    this.repairHandlers();

    return el;
  }

  updateElement() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getInteractiveElement();
    oldElement.replaceWith(newElement);
  }

  updateData(newData: ITrack | IPlayerData, startUpdating?: boolean) {
    this.data = newData;
    if (startUpdating) this.updateElement();
  }
}
