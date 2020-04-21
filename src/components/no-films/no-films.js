import {createNoFilmsTemplate} from './no-films-tpl';
import AbstractComponent from '../abstract';

export default class NoFilmsComponent extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
