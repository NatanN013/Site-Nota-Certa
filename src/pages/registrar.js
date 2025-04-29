import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const cadastrarUsuario = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      router.push('/dashboard');
    } catch (error) {
      setErro('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <h1>Cadastro</h1>
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
      <button onClick={cadastrarUsuario} style={{ width: '100%', padding: 10 }}>
        Cadastrar
      </button>
      {erro && <p style={{ color: 'red', marginTop: 15 }}>{erro}</p>}
    </div>
  );
}
