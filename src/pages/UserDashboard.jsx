import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/users/me').then(res => {
      setProfile(res.data);
      setNewName(res.data.name);
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put('/users/me', { name: newName });
      setProfile(res.data);
      setEditing(false);
    } catch (err) {
      alert('Update failed');
    }
  };

  if (!profile) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Welcome, {profile.name}!</h2>
          <span style={styles.badge}>{profile.role}</span>
        </div>
        <div style={styles.info}>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Member since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
        {editing ? (
          <div style={styles.editBox}>
            <input style={styles.input} value={newName}
              onChange={e => setNewName(e.target.value)} />
            <button style={styles.saveBtn} onClick={handleUpdate}>Save</button>
            <button style={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button style={styles.editBtn} onClick={() => setEditing(true)}>Edit Name</button>
        )}
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' },
  card: { background:'white', padding:'40px', borderRadius:'10px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', width:'100%', maxWidth:'500px' },
  header: { display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' },
  badge: { background:'#4f46e5', color:'white', padding:'4px 10px', borderRadius:'20px', fontSize:'12px' },
  info: { marginBottom:'20px', lineHeight:'2' },
  editBox: { display:'flex', gap:'10px', marginBottom:'15px' },
  input: { flex:1, padding:'8px', borderRadius:'6px', border:'1px solid #ddd' },
  saveBtn: { padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' },
  cancelBtn: { padding:'8px 16px', background:'#ddd', border:'none', borderRadius:'6px', cursor:'pointer' },
  editBtn: { padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', marginBottom:'15px' },
  logoutBtn: { display:'block', width:'100%', padding:'10px', background:'#ef4444', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', marginTop:'10px' },
  loading: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }
};