import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUser } from '../services/userAPI';

function Header() {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const user = await getUser();
        setUserName(user.name);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserName();
  }, []);

  return (
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search"> Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="profile" data-testid="link-to-profile">Profile</NavLink>
      {isLoading ? (
        <p data-testid="header-user-name">Carregando...</p>
      ) : (
        <p data-testid="header-user-name">{userName}</p>
      )}
    </header>
  );
}
export default Header;
