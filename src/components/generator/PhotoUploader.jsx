import { useRef, useState } from 'react';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/heic,image/heif';

function readFileAsImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not decode image. For HEIC, use Safari or iOS.'));
    };
    img.src = url;
  });
}

export default function PhotoUploader({ photo, onPhoto, onError }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);

  async function process(file) {
    if (!file) return;
    setLoading(true);
    try {
      const img = await readFileAsImage(file);
      onPhoto(img);
    } catch (e) {
      onError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) process(file);
  }

  function onChange(e) {
    const file = e.target.files[0];
    if (file) process(file);
    e.target.value = '';
  }

  return (
    <div
      className={`uploader ${drag ? 'uploader--drag' : ''} ${photo ? 'uploader--has-photo' : ''}`}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onClick={() => !photo && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload your photo"
      onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        capture="user"
        onChange={onChange}
        style={{ display: 'none' }}
        id="photo-input"
      />

      {loading ? (
        <div className="uploader__state">
          <span className="uploader__icon">⟳</span>
          <p className="uploader__label">TURNING PIXELS INTO CREDENTIALS...</p>
        </div>
      ) : photo ? (
        <div className="uploader__preview">
          <img
            src={photo.src}
            alt="Your uploaded photo"
            className="uploader__thumb"
          />
          <div className="uploader__preview-overlay">
            <span className="uploader__label">THAT'S YOU.</span>
            <button
              className="uploader__change-btn"
              onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
              id="change-photo-btn"
            >
              CHANGE PHOTO
            </button>
          </div>
        </div>
      ) : (
        <div className="uploader__state">
          <span className="uploader__icon">⬆</span>
          <p className="uploader__label">DROP YOUR FACE HERE.</p>
          <p className="uploader__sub">JPG · PNG · HEIC · camera roll</p>
          <button
            className="uploader__btn"
            id="upload-btn"
            onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
          >
            CHOOSE PHOTO
          </button>
        </div>
      )}
    </div>
  );
}
