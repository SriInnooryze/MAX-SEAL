import RecommendationCard from './RecommendationCard';
import { MEDIA_OPTIONS, PRESSURE_OPTIONS, OPERATION_OPTIONS } from '../../data/solutionsData';
import { Compass } from '../../icons/icons';

export default function QuickSelectionAssistant({
  sizingMedia,
  onMediaChange,
  sizingPressure,
  onPressureChange,
  sizingOperation,
  onOperationChange,
  recommendation,
}) {
  return (
    <div className="sizing-tool reveal">
      <div className="sizing-tool__grid">
        <div>
          <h3 className="sizing-tool__title">
            <Compass size={22} style={{ color: 'var(--azure-500)' }} /> Quick Selection Assistant
          </h3>
          <p className="sizing-tool__subtitle">
            Select your system wetted media, pressure limits, and actuation preference to identify the recommended valve class.
          </p>

          <div className="sizing-selector">
            <div className="sizing-selector__label">1. Wetted Media</div>
            <div className="sizing-chips">
              {MEDIA_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  className={`sizing-chip-btn ${sizingMedia === opt.id ? 'on' : ''}`}
                  onClick={() => onMediaChange(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sizing-selector">
            <div className="sizing-selector__label">2. Pressure Class</div>
            <div className="sizing-chips">
              {PRESSURE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  className={`sizing-chip-btn ${sizingPressure === opt.id ? 'on' : ''}`}
                  onClick={() => onPressureChange(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sizing-selector">
            <div className="sizing-selector__label">3. Operation Method</div>
            <div className="sizing-chips">
              {OPERATION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  className={`sizing-chip-btn ${sizingOperation === opt.id ? 'on' : ''}`}
                  onClick={() => onOperationChange(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <RecommendationCard recommendation={recommendation} />
      </div>
    </div>
  );
}
