import { useState, useCallback } from 'react';
import { generateBuilderId } from '../../lib/canvasUtils.js';
import { renderCard, getTemplateDimensions } from '../../lib/cardRenderer.js';

import PhotoUploader from './PhotoUploader.jsx';
import ModeSelector from './ModeSelector.jsx';

import BuilderForm from './BuilderForm.jsx';
import BuilderClassPicker from './BuilderClassPicker.jsx';
import BuilderCardPreview from './BuilderCardPreview.jsx';
import GeneratorActions from './GeneratorActions.jsx';

function initState() {
  return {
    photo: null,
    photoCrop: { zoom: 1, offsetX: 0, offsetY: 0 },
    mode: 'hacker-house',

    name: '',
    stack: '',
    builderClass: '',
    builderId: '',
  };
}

export default function BuilderGenerator() {
  const [state, setState] = useState(initState);
  const [status, setStatus] = useState('idle'); // idle | generating | done
  const [error, setError] = useState(null);

  const update = useCallback((key, value) => {
    setState(prev => {
      const next = { ...prev, [key]: value };
      // Refresh builderId if name changed
      if (key === 'name') {
        next.builderId = value.trim() ? generateBuilderId(value) : '';
      }
      return next;
    });
  }, []);

  const updateCrop = useCallback((patch) => {
    setState(prev => ({
      ...prev,
      photoCrop: { ...prev.photoCrop, ...patch }
    }));
  }, []);

  async function handleGenerate() {
    setStatus('generating');
    setError(null);
    try {
      // Validation render at the template's native resolution
      const dims = getTemplateDimensions(state.mode);
      const canvas = document.createElement('canvas');
      await renderCard(canvas, state, { width: dims.width, height: dims.height });
      setStatus('done');
    } catch (e) {
      setError('WELP. THAT BROKE. Try again.');
      setStatus('idle');
    }
  }


  return (
    <section className="builder-generator" id="generator" aria-label="Builder ID Generator">

      {/* Section header */}
      <div className="builder-generator__header">
        <div className="builder-generator__header-inner">
          <span className="builder-generator__tag">HH GOA 2026 EDITION</span>
          <h2 className="builder-generator__title">
            IDENTITY<br />
            <span className="builder-generator__title-accent">GENERATOR</span>
          </h2>
          <p className="builder-generator__subtitle">
            Your official Builder ID. Upload, choose your mode, fill in the details.
          </p>
        </div>
      </div>

      {/* Main workspace */}
      <div className="builder-generator__workspace">

        {/* LEFT: Controls */}
        <div className="builder-generator__controls">

          {error && (
            <div className="gen-error" role="alert">
              <span>⚠ {error}</span>
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          <PhotoUploader
            photo={state.photo}
            photoCrop={state.photoCrop}
            onPhoto={img => update('photo', img)}
            onCropChange={updateCrop}
            onError={msg => setError(msg)}
          />

          <ModeSelector
            mode={state.mode}
            onChange={v => update('mode', v)}
          />



          <BuilderForm
            state={state}
            onChange={update}
          />

          <BuilderClassPicker
            builderClass={state.builderClass}
            onChange={v => update('builderClass', v)}
          />

          <GeneratorActions
            state={state}
            status={status}
            onGenerate={handleGenerate}
          />

        </div>

        {/* RIGHT: Live preview */}
        <div className="builder-generator__preview">
          <BuilderCardPreview state={state} />
        </div>

      </div>
    </section>
  );
}
