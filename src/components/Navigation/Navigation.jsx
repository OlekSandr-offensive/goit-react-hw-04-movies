import { NavLink } from 'react-router-dom';
import '../Navigation/Navigation.scss';

const Navigation = () => (
  <nav>
    <NavLink exact to="/" className="link" activeClassName="activeLink">
      Home
    </NavLink>
    <NavLink to="/movies" className="link" activeClassName="activeLink">
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
