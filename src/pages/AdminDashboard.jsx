import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/users').then(res => setUsers(res.data));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleChange = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role });
      setUsers(users.map(u => u._id === id ? { ...u, role } : u));
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Admin Dashboard</h2>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <span style={styles.badge}>Admin: {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Joined</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} style={styles.tr}>
              <td style={styles.td}>{u.name}</td>
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>
                <select value={u.role}
                  onChange={e => handleRoleChange(u._id, e.target.value)}
                  disabled={u._id === user?._id}
                  style={styles.select}>
                  <option value="user">user</option>
<option value="admin">admin</option>
<option value="software_developer">software developer</option>
<option value="technical_support">technical support</option>
<option value="intern">intern</option>
                  
                </select>
              </td>
              <td style={styles.td}>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td style={styles.td}>
                {u._id !== user?._id && (
                  <button style={styles.deleteBtn}
                    onClick={() => handleDelete(u._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding:'30px', fontFamily:'sans-serif' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' },
  badge: { background:'#4f46e5', color:'white', padding:'4px 12px', borderRadius:'20px', fontSize:'13px' },
  logoutBtn: { padding:'8px 16px', background:'#ef4444', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' },
  table: { width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'10px', overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
  thead: { background:'#4f46e5' },
  th: { padding:'12px 16px', color:'white', textAlign:'left', fontWeight:'600' },
  tr: { borderBottom:'1px solid #f0f0f0' },
  td: { padding:'12px 16px', color:'#333' },
  select: { padding:'4px 8px', borderRadius:'4px', border:'1px solid #ddd' },
  deleteBtn: { padding:'6px 12px', background:'#ef4444', color:'white', border:'none', borderRadius:'4px', cursor:'pointer' }
};