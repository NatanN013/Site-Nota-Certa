// src/pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const loginEmailSenha = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/dashboard");
    } catch (err) {
      setErro("Email ou senha inválidos");
    }
  };

  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      setErro("Erro no login com Google");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={loginEmailSenha}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required /><br />
        <button type="submit">Entrar</button>
      </form>

      <button onClick={loginComGoogle} style={{ marginTop: "1rem" }}>
        Entrar com Google
      </button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
