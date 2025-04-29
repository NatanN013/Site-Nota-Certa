export default function Register() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Criar Conta</h1>
      <input type="text" placeholder="Nome" /><br />
      <input type="email" placeholder="Email" /><br />
      <input type="password" placeholder="Senha" /><br />
      <button>Registrar</button>
    </div>
  );
}