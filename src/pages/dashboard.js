export default function Dashboard() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bem-vindo à sua área</h1>
      <textarea placeholder="Cole sua redação aqui..." rows="10" cols="50"></textarea><br />
      <button style={{ marginTop: '10px' }}>Corrigir</button>
    </div>
  );
}