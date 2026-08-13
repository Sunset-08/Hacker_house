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

    </div>
  );
}
