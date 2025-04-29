import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [plano, setPlano] = useState('gratuito'); // simulado: 'gratuito' | 'basico' | 'premium'
  const [correcoesRestantes, setCorrecoesRestantes] = useState(1); // simulado
  const [redacao, setRedacao] = useState('');
  const [respostaIA, setRespostaIA] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        // Simulação do plano baseado no e-mail (ajuste conforme seu backend futuramente)
        if (user.email.includes('premium')) {
          setPlano('premium');
          setCorrecoesRestantes('ilimitadas');
        } else if (user.email.includes('basico')) {
          setPlano('básico');
          setCorrecoesRestantes(10);
        } else {
          setPlano('gratuito');
          setCorrecoesRestantes(1);
        }
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, []);

  const sair = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const corrigirRedacao = () => {
    if (!redacao.trim()) return;
    setCarregando(true);
    // Simulação de IA — no futuro pode usar OpenAI aqui
    setTimeout(() => {
      setRespostaIA("Sua redação está coerente, mas pode melhorar na argumentação. Nota: 740.");
      setCarregando(false);
      if (plano !== 'premium' && typeof correcoesRestantes === 'number') {
        setCorrecoesRestantes((prev) => Math.max(prev - 1, 0));
      }
    }, 2000);
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: '0 auto' }}>
      <h2>Olá, {usuario.displayName || usuario.email}!</h2>
      <p><strong>Plano:</strong> {plano.charAt(0).toUpperCase() + plano.slice(1)}</p>
      <p><strong>Correções restantes:</strong> {correcoesRestantes}</p>

      <textarea
        rows="8"
        style={{ width: '100%', marginTop: 20 }}
        placeholder="Cole sua redação aqui..."
        value={redacao}
        onChange={(e) => setRedacao(e.target.value)}
      />

      <button
        onClick={corrigirRedacao}
        style={{ marginTop: 10, padding: 10, width: '100%' }}
        disabled={carregando || (plano !== 'premium' && correcoesRestantes === 0)}
      >
        {carregando ? 'Corrigindo...' : 'Enviar redação'}
      </button>

      {respostaIA && (
        <div style={{ marginTop: 20, padding: 15, background: '#f4f4f4' }}>
          <strong>Feedback da IA:</strong>
          <p>{respostaIA}</p>
        </div>
      )}

      <button onClick={sair} style={{ marginTop: 30, background: '#ccc', padding: 8 }}>
        Sair
      </button>
    </div>
  );
}
