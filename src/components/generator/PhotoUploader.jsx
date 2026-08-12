import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ACCEPT = 'image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif';

function readFileAsImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not decode image. Please select a valid JPG, PNG, or WEBP file.'));
    };
    img.src = url;
  });
}

export default function PhotoUploader({ photo, photoCrop, onPhoto, onCropChange, onError }) {
  const fileRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);

  // Camera Modal State Machine: 'idle' | 'starting' | 'ready' | 'captured' | 'error'
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraState, setCameraState] = useState('idle');
  const [cameraError, setCameraError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Stop camera tracks cleanly
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Close camera modal completely and reset states
  const closeCamera = useCallback(() => {
    stopCameraStream();
    setIsCameraOpen(false);
    setCameraState('idle');
    setCapturedImage(null);
    setCameraError(null);
  }, [stopCameraStream]);

  // Reliable camera startup function
  const startCamera = useCallback(async () => {
    setCameraError(null);
    setCapturedImage(null);
    setCameraState('starting');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      // Stop existing stream if any before starting new one
      stopCameraStream();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.warn('Video play interrupted:', playErr);
        }
      }

      setCameraState('ready');
    } catch (err) {
      console.error('Camera initialization error:', err);
      setCameraState('error');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera access denied. Please allow camera permissions in your browser or upload an image file.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera detected on this device. Please upload an image file instead.');
      } else {
        setCameraError(err.message || 'Failed to initialize camera stream.');
      }
    }
  }, [stopCameraStream]);

  // Handle user clicking "TAKE PHOTO"
  const handleOpenCamera = useCallback(() => {
    setIsCameraOpen(true);
    // Start camera immediately on modal trigger
    startCamera();
  }, [startCamera]);

  // Handle RETAKE action
  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    if (streamRef.current && streamRef.current.active && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
      setCameraState('ready');
    } else {
      startCamera();
    }
  }, [startCamera]);

  // Ensure stream is attached if video element mounts after stream is acquired
  useEffect(() => {
    if (isCameraOpen && cameraState === 'ready' && streamRef.current && videoRef.current) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isCameraOpen, cameraState]);

  // Lock body scroll and listen for Escape key while camera modal is open
  useEffect(() => {
    if (!isCameraOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeCamera();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCameraOpen, closeCamera]);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  // Process uploaded file
  async function processFile(file) {
    if (!file) return;
    setLoading(true);
    try {
      const img = await readFileAsImage(file);
      onPhoto(img);
    } catch (e) {
      if (onError) onError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  // Capture video frame to canvas
  function capturePhoto() {
    if (!videoRef.current || cameraState !== 'ready') return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');

    // Flip horizontally for natural selfie orientation
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const img = new Image();
    img.onload = () => {
      setCapturedImage(img);
      setCameraState('captured');
    };
    img.src = dataUrl;
  }

  // Confirm photo from camera
  function confirmCapturedPhoto() {
    if (capturedImage) {
      onPhoto(capturedImage);
      closeCamera();
    }
  }

  return (
    <div className="uploader-wrap">
      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept={ACCEPT}
        onChange={e => {
          if (e.target.files?.[0]) processFile(e.target.files[0]);
          e.target.value = '';
        }}
        style={{ display: 'none' }}
        id="photo-file-input"
      />

      {photo ? (
        /* ── Has Photo State ──────────────────────────────── */
        <div className="uploader-preview">
          {/* Header tag */}
          <div className="uploader-preview__tag">
            <span>PHOTO BOOTH // ACTIVE</span>
            <span className="uploader-tag__dot">●</span>
          </div>

          <img src={photo.src} alt="Your profile preview" className="uploader-preview__img" />

          <div className="uploader-preview__overlay">
            <span className="uploader-preview__label">THAT'S YOU. 👍</span>
            <div className="uploader-preview__actions">
              <button
                type="button"
                className="uploader-btn uploader-btn--primary"
                id="change-photo-btn"
                onClick={() => {
                  fileRef.current?.click();
                }}
              >
                ↑ CHOOSE IMAGE
              </button>
              <button
                type="button"
                className="uploader-btn uploader-btn--secondary"
                id="retake-photo-btn"
                onClick={handleOpenCamera}
              >
                📷 TAKE PHOTO
              </button>
            </div>
          </div>

          {/* Photo Adjustment / Crop Controls */}
          {onCropChange && (
            <div className="photo-crop-controls">
              <div className="photo-crop-controls__header">
                <span className="photo-crop-controls__title">ADJUST PHOTO CROP //</span>
                <button
                  type="button"
                  className="photo-crop-controls__reset"
                  onClick={() => onCropChange({ zoom: 1, offsetX: 0, offsetY: 0 })}
                >
                  RESET CROP ↺
                </button>
              </div>

              <div className="photo-crop-controls__row">
                <label htmlFor="crop-zoom">ZOOM ({(photoCrop?.zoom || 1).toFixed(1)}x):</label>
                <input
                  id="crop-zoom"
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={photoCrop?.zoom || 1}
                  onChange={e => onCropChange({ zoom: parseFloat(e.target.value) })}
                />
              </div>

              <div className="photo-crop-controls__row">
                <label htmlFor="crop-offset-x">PAN X:</label>
                <input
                  id="crop-offset-x"
                  type="range"
                  min="-0.5"
                  max="0.5"
                  step="0.05"
                  value={photoCrop?.offsetX || 0}
                  onChange={e => onCropChange({ offsetX: parseFloat(e.target.value) })}
                />
              </div>

              <div className="photo-crop-controls__row">
                <label htmlFor="crop-offset-y">PAN Y:</label>
                <input
                  id="crop-offset-y"
                  type="range"
                  min="-0.5"
                  max="0.5"
                  step="0.05"
                  value={photoCrop?.offsetY || 0}
                  onChange={e => onCropChange({ offsetY: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          )}
        </div>
      ) : loading ? (
        /* ── Loading State ───────────────────────────────── */
        <div className="uploader-drop uploader-drop--loading">
          <span className="uploader-drop__icon uploader-drop__icon--spin">⟳</span>
          <p className="uploader-drop__title">PROCESSING IMAGE...</p>
          <p className="uploader-drop__sub">OPTIMIZING PIXELS FOR YOUR BUILDER ID</p>
        </div>
      ) : (
        /* ── Main Enlarged Drop Zone (Photo Booth) ────────── */
        <div
          className={`uploader-drop${drag ? ' uploader-drop--drag' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          role="region"
          aria-label="Photo upload area"
        >
          {/* Top header badge */}
          <div className="uploader-drop__badge">
            <span className="uploader-drop__badge-prefix">PHOTO BOOTH</span>
            <span className="uploader-drop__badge-status">READY // HH-GOA</span>
          </div>

          {/* Center Graphic / Silhouette */}
          <div className="uploader-drop__face-frame" aria-hidden="true">
            <svg viewBox="0 0 100 120" className="uploader-drop__face-svg">
              {/* Outer guide dashed ellipse */}
              <ellipse cx="50" cy="48" rx="34" ry="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" fill="none" />
              {/* Head contour */}
              <path d="M 30,50 C 30,30 70,30 70,50 C 70,72 30,72 30,50 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              {/* Shoulders arc */}
              <path d="M 12,110 C 18,85 82,85 88,110" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
              {/* Crosshair ticks */}
              <line x1="50" y1="2" x2="50" y2="12" stroke="currentColor" strokeWidth="1.5" />
              <line x1="50" y1="84" x2="50" y2="94" stroke="currentColor" strokeWidth="1.5" />
              <line x1="6" y1="48" x2="16" y2="48" stroke="currentColor" strokeWidth="1.5" />
              <line x1="84" y1="48" x2="94" y2="48" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="uploader-drop__icon">☻</span>
          </div>

          <div className="uploader-drop__text-group">
            <p className="uploader-drop__title">DROP YOUR FACE HERE.</p>
            <p className="uploader-drop__sub">JPG · PNG · WEBP · MAX 10MB</p>
          </div>

          {/* Action buttons */}
          <div className="uploader-drop__btns">
            <button
              type="button"
              className="uploader-btn uploader-btn--primary"
              id="upload-btn"
              onClick={() => fileRef.current?.click()}
            >
              ↑ UPLOAD PHOTO
            </button>
            <button
              type="button"
              className="uploader-btn uploader-btn--secondary"
              id="camera-btn"
              onClick={handleOpenCamera}
            >
              📷 TAKE PHOTO
            </button>
          </div>

          <p className="uploader-drop__drag-hint">or drag &amp; drop your image directly above</p>
        </div>
      )}

      {/* ── CAMERA MODAL (Rendered as Portal to document.body) ── */}
      {isCameraOpen && createPortal(
        <div className="camera-modal-backdrop" onClick={closeCamera}>
          <div className="camera-modal" onClick={e => e.stopPropagation()}>
            {/* Camera Header */}
            <div className="camera-modal__header">
              <div className="camera-modal__title-wrap">
                <span className="camera-modal__tag">LIVE CAPTURE</span>
                <h3 className="camera-modal__title">PHOTO BOOTH</h3>
              </div>
              <button
                type="button"
                className="camera-modal__close-btn"
                onClick={closeCamera}
                aria-label="Close camera modal"
              >
                ✕
              </button>
            </div>

            {/* Camera View Area (Video element stays mounted throughout) */}
            <div className="camera-modal__viewport">
              {/* Always mounted video stream */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-modal__video"
              />

              {/* Face guide overlay when ready */}
              {cameraState === 'ready' && !capturedImage && (
                <div className="camera-modal__stream-overlay">
                  <div className="camera-modal__face-guide" aria-hidden="true">
                    <svg viewBox="0 0 300 400" className="camera-modal__guide-svg">
                      {/* Corner Brackets */}
                      <path d="M 20 50 L 20 20 L 50 20" stroke="var(--hh-yellow)" strokeWidth="3" fill="none" />
                      <path d="M 250 20 L 280 20 L 280 50" stroke="var(--hh-yellow)" strokeWidth="3" fill="none" />
                      <path d="M 20 350 L 20 380 L 50 380" stroke="var(--hh-yellow)" strokeWidth="3" fill="none" />
                      <path d="M 250 380 L 280 380 L 280 350" stroke="var(--hh-yellow)" strokeWidth="3" fill="none" />
                      
                      {/* Face Oval */}
                      <ellipse cx="150" cy="180" rx="90" ry="115" stroke="var(--hh-yellow)" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.85" />
                      
                      {/* Eye Line Ticks */}
                      <line x1="45" y1="160" x2="65" y2="160" stroke="var(--hh-pink)" strokeWidth="2" />
                      <line x1="235" y1="160" x2="255" y2="160" stroke="var(--hh-pink)" strokeWidth="2" />
                      
                      {/* Center Crosshair */}
                      <line x1="150" y1="40" x2="150" y2="55" stroke="var(--hh-yellow)" strokeWidth="1.5" />
                      <line x1="150" y1="305" x2="150" y2="320" stroke="var(--hh-yellow)" strokeWidth="1.5" />
                    </svg>
                    <span className="camera-modal__guide-text">ALIGN YOUR FACE HERE</span>
                  </div>
                  <div className="camera-modal__live-tag">
                    <span className="camera-modal__live-dot">●</span> LIVE FEED
                  </div>
                </div>
              )}

              {/* Camera Starting / Loading Overlay */}
              {cameraState === 'starting' && (
                <div className="camera-modal__loading-overlay">
                  <span className="uploader-drop__icon--spin">⟳</span>
                  <p className="camera-modal__loading-title">INITIALIZING CAMERA...</p>
                  <p className="camera-modal__loading-sub">REQUESTING WEBCAM PERMISSIONS</p>
                </div>
              )}

              {/* Snapshot Captured Preview Overlay */}
              {cameraState === 'captured' && capturedImage && (
                <div className="camera-modal__captured-wrap">
                  <img
                    src={capturedImage.src}
                    alt="Captured snapshot"
                    className="camera-modal__captured-img"
                  />
                  <div className="camera-modal__captured-badge">
                    <span>FRAME CAPTURED</span>
                  </div>
                </div>
              )}

              {/* Camera Error Overlay */}
              {cameraState === 'error' && (
                <div className="camera-modal__error">
                  <span className="camera-modal__error-icon">⚠️</span>
                  <p className="camera-modal__error-title">CAMERA ACCESS ERROR</p>
                  <p className="camera-modal__error-msg">{cameraError}</p>
                  <div className="camera-modal__error-actions">
                    <button
                      type="button"
                      className="uploader-btn uploader-btn--primary"
                      onClick={startCamera}
                    >
                      ↺ TRY AGAIN
                    </button>
                    <button
                      type="button"
                      className="uploader-btn uploader-btn--secondary"
                      onClick={() => {
                        closeCamera();
                        fileRef.current?.click();
                      }}
                    >
                      ↑ UPLOAD FILE INSTEAD
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Controls Footer */}
            <div className="camera-modal__footer">
              {cameraState === 'captured' ? (
                <>
                  <button
                    type="button"
                    className="uploader-btn uploader-btn--secondary"
                    onClick={handleRetake}
                  >
                    ↺ RETAKE
                  </button>
                  <button
                    type="button"
                    className="uploader-btn uploader-btn--primary"
                    onClick={confirmCapturedPhoto}
                  >
                    ✓ USE PHOTO
                  </button>
                </>
              ) : cameraState === 'ready' ? (
                <>
                  <button
                    type="button"
                    className="uploader-btn uploader-btn--secondary"
                    onClick={closeCamera}
                  >
                    ✕ CANCEL
                  </button>
                  <button
                    type="button"
                    className="uploader-btn uploader-btn--primary camera-modal__capture-btn"
                    onClick={capturePhoto}
                  >
                    📸 CAPTURE PHOTO
                  </button>
                </>
              ) : cameraState === 'starting' ? (
                <>
                  <button
                    type="button"
                    className="uploader-btn uploader-btn--secondary"
                    onClick={closeCamera}
                  >
                    ✕ CANCEL
                  </button>
                  <button
                    type="button"
                    className="uploader-btn uploader-btn--primary"
                    disabled
                    style={{ opacity: 0.6, cursor: 'wait' }}
                  >
                    ⟳ INITIALIZING...
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="uploader-btn uploader-btn--secondary"
                  onClick={closeCamera}
                >
                  ✕ CLOSE
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
