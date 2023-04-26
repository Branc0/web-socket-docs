import { authUser } from "./socket-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = form["input-user"].value;
  const password = form["input-password"].value;

  authUser({ user, password });
});
