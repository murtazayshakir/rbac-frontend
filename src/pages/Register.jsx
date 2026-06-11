import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" placeholder="Full Name"
            value={name} onChange={e => setName(e.target.value)} required />
          <input style={styles.input} type="email" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' },
  box: { background:'white', padding:'40px', borderRadius:'10px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', width:'100%', maxWidth:'400px' },
  title: { textAlign:'center', marginBottom:'20px', color:'#333' },
  input: { width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'6px', border:'1px solid #ddd', boxSizing:'border-box', fontSize:'14px' },
  button: { width:'100%', padding:'10px', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'16px' },
  error: { color:'red', textAlign:'center', marginBottom:'10px' },
  link: { textAlign:'center', marginTop:'15px', fontSize:'14px' }
};