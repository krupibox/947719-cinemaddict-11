import { createSortingTemplate } from './sorting-tpl';
import AbstractComponent from '../abstract';

export default class SortingComponent extends AbstractComponent {
  getTemplate() {
    return createSortingTemplate();
  }
}
