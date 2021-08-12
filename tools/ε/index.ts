import { Element } from './frameworkTypes';

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

  const isClass = virtualDom.attributes?.class || false
  if (isClass) {
    el.setAttribute('class', virtualDom.attributes.class)
  }

  if (virtualDom.children[0] &&  typeof virtualDom.children[0] === 'string') {
    el.innerHTML = virtualDom.children[0]
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
  console.log(virtualDom);
  
  const site = elementsToHTML(virtualDom);
  rootHtml.appendChild(site)
  console.log(site);

}

export {
  Component,
  start,
  createElement
};