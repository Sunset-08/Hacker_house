import { useRef, useState } from 'react';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/heic,image/heif,image/*';

function readFileAsImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not decode this image. For HEIC, try Safari or iOS.')); };
    img.src = url;
  });
}

export default function PhotoUploader({ photo, onPhoto, onError }) {
  const fileRef   = useRef(null);   // general file picker (drag/drop, gallery)
  const cameraRef = useRef(null);   // camera-specific input
  const [drag, setDrag]       = useState(false);
  const [loading, setLoading] = useState(false);

  async function process(file) {
    if (!file) return;
    setLoading(true);
    try { onPhoto(await readFileAsImage(file)); }
    catch (e) { onError(e.message); }
    finally { setLoading(false); }
  }

  function onDrop(e) {
    e.preventDefault(); setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) process(file);
  }

  return (
    <div className="uploader-wrap">

      {/* Hidden inputs */}
      <input ref={fileRef}   type="file" accept={ACCEPT} onChange={e => { process(e.target.files[0]); e.target.value=''; }} style={{display:'none'}} id="photo-file-input" />
      <input ref={cameraRef} type="file" accept="image/*" capture="user" onChange={e => { process(e.target.files[0]); e.target.value=''; }} style={{display:'none'}} id="photo-camera-input" />

      {photo ? (
        /* ── Has photo ───────────────────────────────────── */
        <div className="uploader-preview">
          <img src={photo.src} alt="Your uploaded photo" className="uploader-preview__img" />
          <div className="uploader-preview__overlay">
            <span className="uploader-preview__label">THAT'S YOU. 👍</span>
            <div className="uploader-preview__actions">
              <button className="uploader-preview__btn" id="retake-btn"
                onClick={() => cameraRef.current?.click()}>📷 RETAKE</button>
              <button className="uploader-preview__btn uploader-preview__btn--alt" id="replace-btn"
                onClick={() => fileRef.current?.click()}>↑ REPLACE</button>
            </div>
          </div>
        </div>
      ) : loading ? (
        /* ── Loading ─────────────────────────────────────── */
        <div className="uploader-drop uploader-drop--loading">
          <span className="uploader-drop__icon">⟳</span>
          <p className="uploader-drop__title">TURNING PIXELS INTO CREDENTIALS...</p>
        </div>
      ) : (
        /* ── Empty — main drop zone ──────────────────────── */
        <div
          className={`uploader-drop${drag ? ' uploader-drop--drag' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          role="region"
          aria-label="Photo upload area"
        >
          <span className="uploader-drop__icon">☻</span>
          <p className="uploader-drop__title">DROP YOUR FACE HERE.</p>
          <p className="uploader-drop__sub">JPG · PNG · HEIC · any image</p>

          <div className="uploader-drop__btns">
            <button
              className="uploader-drop__btn uploader-drop__btn--primary"
              id="camera-btn"
              onClick={() => cameraRef.current?.click()}
            >
              📷 TAKE PHOTO
            </button>
            <button
              className="uploader-drop__btn uploader-drop__btn--secondary"
              id="upload-btn"
              onClick={() => fileRef.current?.click()}
            >
              ↑ CHOOSE IMAGE
            </button>
          </div>

          <p className="uploader-drop__drag-hint">or drag &amp; drop anywhere above</p>
        </div>
      )}
    </div>
  );
}
