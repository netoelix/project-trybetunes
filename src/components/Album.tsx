import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

function Album() {
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMusics(String(id));
        setAlbumData(response);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do álbum:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h1 data-testid="artist-name">{albumData[0].artistName}</h1>
          <h2 data-testid="album-name">{albumData[0].collectionName}</h2>
          <img
            src={ albumData[0].artworkUrl100 }
            alt={ `Imagem do album ${albumData[0].collectionName}` }
          />
          <div>
            {albumData.slice(1).map((song) => (
              <MusicCard key={ song.trackId } song={ song } />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Album;
