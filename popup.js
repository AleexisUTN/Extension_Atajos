// JavaScript para mostrar/ocultar el menú al hacer clic en el ícono del menú
const menuIcon = document.getElementById('menuIcon');
const menu = document.getElementById('menu');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
