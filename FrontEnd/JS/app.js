const btnSignin = document.querySelector("#signin"); 
const btnSignup = document.querySelector("#signup"); 
const body = document.querySelector("body");

if (btnSignin && body) {
  btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js";
  });
}

if (btnSignup && body) {
  btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
  });
}

const loginButton = document.getElementById("loginButton");
if (loginButton) {
  loginButton.addEventListener("click", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    const email = emailInput ? emailInput.value.trim() : ""; 
    const password = passwordInput ? passwordInput.value : "";

    if (!email || !password) {
      alert("Por favor, preencha e-mail e senha para login.");
      return;
    }

    console.log("Tentando login com:", { email }); 

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw errData;
          }); 
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta do login backend:", data);
        if (data.sucesso) {
          alert(data.mensagem);
          window.location.href = "View/home.html";
        } else {
          alert(
            "Erro no login: " + (data.mensagem || "Credenciais inválidas.")
          );
        }
      })
      .catch((error) => {
        console.error("Erro na requisição de login:", error);
        alert(
          "Erro no login: " +
            (error.mensagem || "Não foi possível conectar ao servidor.")
        );
      });
  });
}

const registerConfirmButton = document.getElementById("registerConfirmButton");
if (registerConfirmButton) {
  registerConfirmButton.addEventListener("click", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("register-password");
    const confirmPasswordInput = document.getElementById(
      "register-confirm-password"
    );

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";
    const confirmPassword = confirmPasswordInput
      ? confirmPasswordInput.value
      : "";

    if (!email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos para o cadastro.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    console.log("Tentando registrar com:", { email });
    fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw errData;
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta do registro backend:", data);
        if (data.sucesso) {
          alert(data.mensagem);
          window.location.href = "index.html";
        } else {
          alert(
            "Erro no cadastro: " +
              (data.mensagem || "Não foi possível realizar o cadastro.")
          );
        }
      })
      .catch((error) => {
        console.error("Erro na requisição de registro:", error);
        alert(
          "Erro no cadastro: " +
            (error.mensagem || "Não foi possível conectar ao servidor.")
        );
      });
  });
}
