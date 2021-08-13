import { Element } from './frameworkTypes';
import { Observable } from "./Observable";
import { Observer } from './Observer';

// parent class for components
abstract class Component {
  abstract render(): Element
}

function createElement(name, attributes, children) {
  return {
    name,
    attributes,
    children
  };
};

function elementsToHTML(virtualDom) {

  if (typeof virtualDom === 'string') {
    return virtualDom
  }

  const tagName = virtualDom.name
  const el = document.createElement(tagName)

  console.log(el);
  

  const attributes = virtualDom.attributes
  for (const key in attributes) {
    el.setAttribute(key, attributes[key] )
  }

  const children = virtualDom.children
  for (const key in children) {
    if (typeof children[key] === 'string') {
      el.innerHTML = children[key]
    }
  }
  
  virtualDom.children.forEach(element => {
    const e = elementsToHTML(element)
    if (typeof e === 'string') {
      el.innerHTML = e  
    } else {
      el.appendChild(e)
    }
  });
  return el
}

function getElement(element) {
  let elementToReturn;
  if (typeof element === 'string') {
    elementToReturn = element;
  } else if(typeof element.name === 'string') {
    const childrenCol = [];
    element.children.forEach(e => {
      childrenCol.push(getElement(e));
    });
    element.children = childrenCol;
    elementToReturn = element;
  } else {
    const instance = new element.name();
    const render = instance.render();
    elementToReturn = getElement(render);
  }

  return elementToReturn;
}


function getVirtualDom(element) {
  return getElement(element);
}

function start(rootComponent, rootHtml: HTMLElement): void {
  const rootInstance = new rootComponent();
  const rootRender = rootInstance.render();
  const virtualDom = getVirtualDom(rootRender);
  
  const site = elementsToHTML(virtualDom);
  rootHtml.appendChild(site)

  const obs = new Observable()
  const inputEl = document.getElementById('input-test')
  obs.registerObservable(inputEl, 'keyup')
  obs.addObserver(fn => console.log(fn));
}

export {
  Component,
  start,
  createElement
};