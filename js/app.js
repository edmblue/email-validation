//***Codigo Validar Formulario ***

//Variables

const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const spinner = document.querySelector('#spinner');
const reset = document.querySelector('#resetBtn');

//EventListeners

callEventListeners();

function callEventListeners() {
  document.addEventListener('DOMContentLoaded', iniciarApp);
  email.addEventListener('blur', validarFormulario);
  asunto.addEventListener('blur', validarFormulario);
  mensaje.addEventListener('blur', validarFormulario);
  formulario.addEventListener('submit', enviarEmail);
  reset.addEventListener('click', (e) => {
    formulario.reset();
    e.preventDefault();
    errorExiste();
    email.style.border = 'none';
    asunto.style.border = 'none';
    mensaje.style.border = 'none';
  });
}

//Funciones

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.style.opacity = '50%';
  btnEnviar.style.cursor = 'not-allowed';
}

function validarFormulario(e) {
  if (e.target.value === '') {
    e.target.style.border = '2px solid red';
    mensajeError('Todos los campos son obligatorios');
  } else if (e.target.type === 'email') {
    validarEmail();
  } else {
    e.target.style.border = '2px solid green';
  }

  if (er.test(email.value) && mensaje.value !== '' && asunto.value !== '') {
    btnEnviar.style.opacity = '100%';
    btnEnviar.style.cursor = '';
    btnEnviar.disabled = false;
    errorExiste();
  }
}

function validarEmail() {
  if (er.test(email.value)) {
    email.style.border = '2px solid green';
    errorExiste();
  } else {
    mensajeError('Email Invalido');
    email.style.border = '2px solid red';
  }
}

function mensajeError(mensaje) {
  errorExiste();

  const errorMensaje = document.createElement('p');
  errorMensaje.textContent = mensaje;
  errorMensaje.classList.add('error');

  //Estilos CSS mensajeError

  errorMensaje.style.background = 'red';
  errorMensaje.style.textAlign = 'center';
  errorMensaje.style.color = 'white';
  errorMensaje.style.fontWeight = 'bold';
  errorMensaje.style.marginTop = '5px';
  errorMensaje.style.padding = '10px';

  formulario.appendChild(errorMensaje);
}

function errorExiste() {
  if (document.querySelector('.error') !== null) {
    document.querySelector('.error').remove();
  }
}

function enviarEmail(e) {
  e.preventDefault();
  spinner.style.display = 'flex';
  setTimeout(finalizacionEnviarEmail, 1000);
  email.style.border = 'none';
  asunto.style.border = 'none';
  mensaje.style.border = 'none';
}

function finalizacionEnviarEmail() {
  spinner.style.display = 'none';
  const mensajeFinalizado = document.createElement('p');
  mensajeFinalizado.textContent = 'El mensaje se envio correctamente';

  mensajeFinalizado.style.background = 'green';
  mensajeFinalizado.style.textAlign = 'center';
  mensajeFinalizado.style.color = 'white';
  mensajeFinalizado.style.fontWeight = 'bold';
  mensajeFinalizado.style.marginTop = '5px';
  mensajeFinalizado.style.padding = '10px';

  formulario.appendChild(mensajeFinalizado);

  setTimeout(() => {
    mensajeFinalizado.remove();
    formulario.reset();
    iniciarApp();
  }, 3000);
}
