function MusicCard({ song }) {
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
    </div>
  );
}
export default MusicCard;
