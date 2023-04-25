import { registerUser } from "./socket-register.js";

const form = document.getElementById("form-register");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = form["input-user"].value;
  const password = form["input-password"].value;
  registerUser({ user, password });
});
