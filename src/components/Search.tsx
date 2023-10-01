import { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [albums, setAlbums] = useState([]);

  const isButtonDisabled = name.length <= 1;

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  const handleSearch = async () => {
    try {
      const response = await searchAlbumsAPI(name);
      if (response.length === 0) {
        setAlbums([]);
        setArtist(name);
      } else {
        setAlbums(response);
        setArtist(name);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setName('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name=""
          id="artist-name"
          data-testid="search-artist-input"
          value={ name }
          onChange={ handleNameChange }
        />
        <label htmlFor="artist-name">Nome do artista</label>
        <button
          type="button"
          data-testid="search-artist-button"
          onClick={ handleSearch }
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>
      </div>

      {artist ? (
        <p>
          Resultado de álbuns de:
          {' '}
          {artist}
        </p>
      ) : null}

      {albums.length === 0 ? (
        <p>Nenhum álbum foi encontrado</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={ album.collectionId }>
              <a
                href={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                {album.collectionName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
