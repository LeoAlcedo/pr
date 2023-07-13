const firebaseConfig = {
  apiKey: "AIzaSyCMUxNzzYcZb59vlxT2NKZlG-m2Vx-HUK0",
  authDomain: "nuevo-proyecto-c06eb.firebaseapp.com",
  projectId: "nuevo-proyecto-c06eb",
  storageBucket: "nuevo-proyecto-c06eb.appspot.com",
  messagingSenderId: "750791333189",
  appId: "1:750791333189:web:b9186736f6f31adde11a2c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();



//Llamando elemento de HTML
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');
let btnfacebook = document.getElementById('btnfacebook');


//Función Registrar
btnRegistrar.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Inicio de sesión correcto");
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar')
      formulario.classList.replace('mostrar', 'ocultar');
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      //..
    });


})


//Funcion Iniciar Sesión
btnIngresar.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;
  console.log("tu email es" + email + "y tu password es " + password);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log("Inicio sesión correctamente");
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar')
      formulario.classList.replace('mostrar', 'ocultar');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);

    });
})

//cerrar sesión
btnCerrarSesion.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    console.log("Cierre de sesión correcto")
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('mostrar','ocultar');
    

  }).catch((error) => {
    console.log("Error con el cierto de Sesión");
  });  
})


//Funcion estado del usuario:activo o inactivo
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    cargarJSON();
    contenidoDeLaWeb.classList('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar')
  } else {
   contenidoDeLaWeb.classList.replace('mostrar','ocultar');
   formulario.classList.replace('ocultar','mostrar');
  }
});

//Función Login con Google
btnGoogle.addEventListener('click',()=>{  
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    console.log ("Inicio sesión con google");
    cargarJSON();

  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error de login con google");
});
});


//Función Login de Facebook
btnfacebook.addEventListener('click',()=>{  
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
      var user = result.user;
   console.log("Error de facook");
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
     console.log ("Error de facebook")
  });
})


// Funcion llamando datos
function cargarJSON(){
  fetch('productos.json')
  .then(function(res){
   return res.json();
  })

  .then((data) => {
    console.log (data);
    let html = '';
   data.forEach((productos) =>{
    html += `
    <div class="producto">
    <p> ${productos.marca} </p>
    <img src="${productos.img}" width="50px" class="imgProducto">
     <strong> /$ ${productos.precio}</strong> 
     </div>
     `;
  })
  document.getElementById('resultado').innerHTML = html;
})
} 
