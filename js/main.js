let session = new Session();
session = session.getSession();

if (session !== "") {
  window.location.href = "hexa.html";
}

const reg_btn = document
  .querySelector("#registracija")
  .addEventListener("click", () => {
    document.querySelector(".custom-modal").style.display = "block";
  });

const close_modal = document
  .querySelector("#closeModal")
  .addEventListener("click", () => {
    document.querySelector(".custom-modal").style.display = "none";
  });

let config = {
  korisnicko_Ime: {
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  register_mail: {
    required: true,
    email: true,
    minlength: 5,
    maxlength: 50,
  },
  register_lozinka: {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: "ponovi_lozinku",
  },
  ponovi_lozinku: {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: "register_lozinka",
  },
};

let validator = new Validator(config, "#registrationForm");

const reg_form = document
  .querySelector("#registrationForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    if (validator.validationPassed()) {
      let user = new User();
      user.username = document.querySelector("#korisnicko_Ime").value;
      user.email = document.querySelector("#register_mail").value;
      user.password = document.querySelector("#register_lozinka").value;
      user.create();
    } else {
      alert("Polja nisu dobro popunjena!");
    }
  });

const log_form = document
  .querySelector("#loginForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.querySelector("#login_email").value;
    let password = document.querySelector("#login_lozinka").value;

    let user = new User();
    user.email = email;
    user.password = password;
    user.login();
  });
