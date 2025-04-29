import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard'); // redireciona se já estiver logado
      }
    });
    return () => unsubscribe();
  }, []);

  const loginComEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push('/dashboard');
    } catch (error) {
      setErro('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const loginComGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setErro('Erro no login com Google.');
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button onClick={loginComEmail} style={{ width: '100%', padding: 10, marginBottom: 10 }}>
        Entrar
      </button>
      <button onClick={loginComGoogle} style={{ width: '100%', padding: 10 }}>
        Entrar com Google
      </button>
      {erro && <p style={{ color: 'red', marginTop: 15 }}>{erro}</p>}
    </div>
  );
}
