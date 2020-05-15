import {KeyCode} from '../consts';

export const isEscape = (evt) => evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC;
