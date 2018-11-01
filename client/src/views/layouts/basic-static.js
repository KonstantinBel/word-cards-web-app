import './basic-static.scss';
import cookie from 'js-cookie';

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

(() => {
  document.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.classList.contains('js-change-locale')) return;

    cookie.set('userlang', target.dataset.lang);
    window.location.reload();
  });
})();
