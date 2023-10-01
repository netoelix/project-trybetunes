import React, { useState } from 'react';

function MusicCard({ song }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div data-testid="music-card">
      <h3>{song.trackName}</h3>
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <input
        type="checkbox"
        name=""
        id={ `checkbox-music-${song.trackId}` }
        checked={ isFavorite }
        onChange={ toggleFavorite }
      />
      <label
        htmlFor={ `checkbox-music-${song.trackId}` }
        data-testid={ `checkbox-music-${song.trackId}` }
      >
        {isFavorite ? (
          <img
            src="/src/images/checked_heart.png"
            alt="favorite"
          />
        ) : (
          <img
            src="/src/images/empty_heart.png"
            alt="favorite"
          />
        )}
        Adicionar aos favoritos
      </label>
    </div>
  );
}
export default MusicCard;
