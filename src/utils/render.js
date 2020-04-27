import {RenderPosition} from '../consts';

export const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
  
    return newElement.firstChild;
  };

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  replaceElement(newComponent.getElement(), oldComponent.getElement());
};

export const replaceElement = (newElement, oldElement) => {
  const parentElement = oldElement.parentElement;

  const isExist = !!(parentElement && newElement && oldElement);
  if (isExist && parentElement.contains(oldElement)) {
    const {scrollTop, scrollLeft} = oldElement;

    newElement.style.animationDuration = `0s`;

    parentElement.replaceChild(newElement, oldElement);

    newElement.scrollLeft = scrollLeft;
    newElement.scrollTop = scrollTop;
  }
};