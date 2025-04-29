import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        router.push('/login'); // redireciona se não estiver logado
      }
    });
    return () => unsubscribe();
  }, []);

  const sair = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 30, textAlign: 'center' }}>
      <h1>Bem-vindo, {usuario.displayName || usuario.email}!</h1>
      <p>Você está logado na plataforma Nota Certa.</p>
      <button onClick={sair} style={{ marginTop: 20, padding: 10 }}>
        Sair
      </button>
    </div>
  );
}
