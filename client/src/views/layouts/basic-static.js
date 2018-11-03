import './basic-static.scss';

(() => {
  if (DEV) {
    const { body } = document;
    const elem = document.createElement('div');
    console.log('static layout script is runing in DEV mode');
    elem.innerHTML = 'Client is built in development mode';
    elem.style.cssText = 'background: wheat; font-style: italic;';
    body.insertBefore(elem, body.firstElementChild);
  }
})();
