import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

function Login() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    const userObject = { name };
    createUser(userObject)
      .then((response) => {
        setIsLoading(false);
        if (response === 'OK') {
          navigate('/search');
        } else {
          console.error('Erro ao criar o usuário');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Erro ao criar o usuário', error);
      });
  };

  const isButtonDisabled = name.length <= 2;

  return (
    <form action="">
      <input
        type="text"
        value={ name }
        id="login"
        data-testid="login-name-input"
        placeholder="Digite o login"
        onChange={ handleNameChange }
      />
      <label htmlFor="login">Login</label>
      <button
        type="button"
        data-testid="login-submit-button"
        onClick={ handleButtonClick }
        disabled={ isButtonDisabled || isLoading }
      >
        Entrar

      </button>
      {isLoading && <Carregando />}
    </form>
  );
}

export default Login;
