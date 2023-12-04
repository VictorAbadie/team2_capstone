import { Link } from 'react-router-dom';

const AdminFooter = () => {
    return (
        <footer>
    <nav>
      <Link to="/createwine" className="nav-item">Create Wine</Link>
      <Link to="/editwine" className="nav-item">Edit Wine</Link>
      <Link to="/deletewine" className='nav-item'>Delete Wine</Link>
    </nav>
        </footer>
    )}
    
    AdminFooter();
    export default AdminFooter