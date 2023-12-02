import { Link } from 'react-router-dom';

const AdminFooter = () => {
    return (
    <nav>
      <Link to="/createwine" className="nav-item">Create Wine</Link>
      <Link to="/editwine" className="nav-item">Edit Wine</Link>
    </nav>
    )}
    
    AdminFooter();
    export default AdminFooter