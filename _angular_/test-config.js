// Load our SystemJS configuration.
System.config({
  baseURL: '/base/'
});

const components = [
  'button',
  'card',
  'core',
  'checkbox',
  'dialog',
  'grid-list',
  'icon',
  'input',
  'list',
  'menu',
  'progress-bar',
  'progress-circle',
  'radio',
  'sidenav',
  'slider',
  'slide-toggle',
  'button-toggle',
  'tabs',
  'toolbar',
  'tooltip'
];

const map = {};

components.forEach(function(name){
  map['@angular2-material/' + name] = '@angular2-material/' + name + '/' + name;
});

System.config({
  map : map
});