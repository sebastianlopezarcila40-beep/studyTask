function mostrarLogin() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("registro").style.display = "none";
  document.getElementById("app").style.display = "none";
}

function mostrarRegistro() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("registro").style.display = "block";
  document.getElementById("app").style.display = "none";
}

function registrarUsuario() {
  let usuario = document.getElementById("registroUsuario").value;
  let correo = document.getElementById("registroCorreo").value;
  let password = document.getElementById("registroPassword").value;

  if (usuario === "" || correo === "" || password === "") {
    alert("Completa todos los campos");
    return;
  }

  let cuenta = {
    usuario: usuario,
    correo: correo,
    password: password
  };

  localStorage.setItem("cuentaStudyTask", JSON.stringify(cuenta));

  alert("Cuenta creada correctamente");
  mostrarLogin();
}

function iniciarSesion() {
  let correo = document.getElementById("loginCorreo").value;
  let password = document.getElementById("loginPassword").value;

  let cuenta = JSON.parse(localStorage.getItem("cuentaStudyTask"));

  if (!cuenta) {
    alert("Primero debes registrarte");
    return;
  }

  if (correo === cuenta.correo && password === cuenta.password) {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("app").style.display = "block";
    mostrarTareas();
  } else {
    alert("Correo o contraseña incorrectos");
  }
}

function recuperarPassword() {
  let cuenta = JSON.parse(localStorage.getItem("cuentaStudyTask"));

  if (!cuenta) {
    alert("No hay cuenta registrada");
    return;
  }

  alert("Tu contraseña es: " + cuenta.password);
}

function cerrarSesion() {
  document.getElementById("app").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function agregarTarea() {
  let tarea = document.getElementById("tarea").value;
  let materia = document.getElementById("materia").value;
  let fecha = document.getElementById("fecha").value;

  if (tarea === "") {
    alert("Escribe una tarea");
    return;
  }

  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.push({
    texto: tarea,
    materia: materia,
    fecha: fecha,
    completada: false
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));

  document.getElementById("tarea").value = "";
  document.getElementById("materia").value = "";
  document.getElementById("fecha").value = "";

  mostrarTareas();
}

function mostrarTareas() {
  let lista = document.getElementById("listaTareas");
  lista.innerHTML = "";

  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.forEach((tarea, index) => {
    let li = document.createElement("li");

    let texto = document.createElement("span");
    texto.textContent = tarea.texto + " | " + tarea.materia + " | " + tarea.fecha;

    if (tarea.completada) {
      texto.style.textDecoration = "line-through";
    }

    texto.onclick = function() {
      tareas[index].completada = !tareas[index].completada;
      localStorage.setItem("tareas", JSON.stringify(tareas));
      mostrarTareas();
    };

    li.appendChild(texto);

    let boton = document.createElement("button");
    boton.textContent = "❌";

    boton.onclick = function() {
      eliminarTarea(index);
    };

    li.appendChild(boton);
    lista.appendChild(li);
  });
}

function eliminarTarea(index) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.splice(index, 1);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
}