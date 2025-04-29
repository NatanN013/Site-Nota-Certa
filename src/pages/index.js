import Link from 'next/link';
export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Nota Certa</h1>
      <p>Corrija suas redações com inteligência artificial!</p>
      <Link href="/login">
        <button style={{ padding: '10px 20px', marginTop: '20px' }}>
          Começar Agora
        </button>
      </Link>
    </div>
  );
}