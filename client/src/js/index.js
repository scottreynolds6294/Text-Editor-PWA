import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { header } from './header';

const main = document.querySelector('#main');
main.innerHTML = '';

// Load spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
  
};

const displayHeader = () => {
  const headerElement = document.createElement('pre');
  headerElement.textContent = header;
  headerElement.style.fontFamily = 'monospace'; 
  headerElement.style.margin = '0'; 
  headerElement.style.padding = '20px'; 
  headerElement.style.whiteSpace = 'pre-wrap'; 
  main.appendChild(headerElement);
};

// Initialize editor
const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
} else {
  displayHeader();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
