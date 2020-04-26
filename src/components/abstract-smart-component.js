import AbstractComponent from './abstract';
import { replaceElement } from '../utils';

export default class AbstractSmartComponent extends AbstractComponent {
    // recoveryListeners() {
    //     throw new Error(`Abstract method not implemented: recoveryListeners`);
    // }
    rerender() {

        // смысл ререндера удалить и загрузить тоже самое но с обновленными моками
        const oldElement = this.getElement();

        this.removeElement();

        const newElement = this.getElement();

        replaceElement(newElement, oldElement);

        // this.recoveryListeners();
    }
}
