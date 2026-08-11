export default function BuilderForm({ state, onChange }) {
  const field = (key) => ({
    value: state[key] || '',
    onChange: e => onChange(key, e.target.value),
  });

  return (
    <div className="builder-form">
      <p className="gen-section-label">YOUR DETAILS //</p>

      <div className="form-field">
        <label className="form-label" htmlFor="field-name">NAME</label>
        <input
          id="field-name"
          className="form-input"
          type="text"
          placeholder="Vishwas Sharma"
          maxLength={48}
          {...field('name')}
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="field-stack">STACK / ROLE</label>
        <input
          id="field-stack"
          className="form-input"
          type="text"
          placeholder="AI / Full Stack"
          maxLength={48}
          {...field('stack')}
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="field-bio">BIO</label>
        <textarea
          id="field-bio"
          className="form-input form-textarea"
          placeholder="Building things that probably shouldn't work."
          maxLength={160}
          rows={3}
          {...field('bio')}
        />
        <span className="form-count">{(state.bio || '').length}/160</span>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="field-team">
          TEAM <span className="form-optional">(OPTIONAL)</span>
        </label>
        <input
          id="field-team"
          className="form-input"
          type="text"
          placeholder="Rogue Builders"
          maxLength={40}
          {...field('team')}
        />
      </div>
    </div>
  );
}
