/* ============================================================
   FIESTAS DE RILLO DE GALLO — JavaScript
   ============================================================
   Este archivo maneja:
     1. Menú hamburguesa para móvil
     2. Marcado del enlace activo en la navegación
     3. Cuenta atrás hasta el 20 de agosto
   ============================================================ */


/* ============================================================
   1. MENÚ HAMBURGUESA
   ============================================================ */
function initMobileMenu() {
  var toggle = document.getElementById('nav-toggle');
  var nav    = document.getElementById('site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  /* Cerrar el menú al pulsar cualquier enlace */
  var links = nav.querySelectorAll('.nav-link');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Cerrar el menú al pulsar fuera de él */
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}


/* ============================================================
   2. MARCAR EL ENLACE ACTIVO EN LA NAVEGACIÓN
   ============================================================ */
function markActiveNav() {
  /* Obtenemos el nombre del archivo actual */
  var path        = window.location.pathname;
  var currentFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentFile) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}


/* ============================================================
   3. CUENTA ATRÁS HASTA EL 20 DE AGOSTO
   ============================================================ */
function initCountdown() {
  /* Comprobamos que los elementos existen (sólo en index.html) */
  var gridEl  = document.getElementById('countdown-grid');
  var celebEl = document.getElementById('countdown-celebration');
  var daysEl  = document.getElementById('cd-days');
  var hoursEl = document.getElementById('cd-hours');
  var minsEl  = document.getElementById('cd-mins');
  var secsEl  = document.getElementById('cd-secs');

  if (!gridEl || !celebEl) return;

  /* ---- Función que calcula la fecha objetivo ---- */
  function getTarget() {
    var now    = new Date();
    var year   = now.getFullYear();
    /* 20 de agosto del año en curso (mes 7 porque JS usa índice 0) */
    var target = new Date(year, 7, 20, 0, 0, 0, 0);
    /* Si ya pasó, apuntamos al 20 de agosto del año siguiente */
    if (now >= target) {
      target.setFullYear(year + 1);
    }
    return target;
  }

  /* ---- Función que rellena los dígitos con cero si hace falta ---- */
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  /* ---- Actualización del contador ---- */
  function tick() {
    var now    = new Date();
    var target = getTarget();
    var diff   = target - now; /* milisegundos restantes */

    /* Si quedan 0 ms o menos, mostramos el mensaje festivo */
    if (diff <= 0) {
      gridEl.style.display  = 'none';
      celebEl.style.display = 'block';
      return;
    }

    /* Cálculo de días, horas, minutos y segundos */
    var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs  = Math.floor((diff % (1000 * 60)) / 1000);

    /* Actualizamos el DOM */
    if (daysEl)  daysEl.textContent  = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl)  minsEl.textContent  = pad(mins);
    if (secsEl)  secsEl.textContent  = pad(secs);

    /* Actualizamos el atributo aria-label para accesibilidad */
    var announce = days + ' días, ' + hours + ' horas, ' + mins + ' minutos, ' + secs + ' segundos';
    gridEl.setAttribute('aria-label', 'Cuenta atrás: ' + announce);
  }

  /* Llamada inicial y luego cada segundo */
  tick();
  setInterval(tick, 1000);
}


/* ============================================================
   INICIALIZACIÓN — esperar a que el DOM esté listo
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  markActiveNav();
  initCountdown();
});
