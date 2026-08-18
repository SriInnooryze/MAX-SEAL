import { SOLUTIONS_VIDEOS } from '../../data/solutionsData';

export default function VideoSection() {
  return (
    <div className="video-section reveal">
      <div className="shead">
        <div className="kicker">Demonstrations</div>
        <h3 className="shead__title">Product Design &amp; Operation Videos</h3>
      </div>
      <div className="video-grid">
        {SOLUTIONS_VIDEOS.map((v) => (
          <div key={v.id} className="video-card">
            <div className="video-wrapper">
              <iframe
                src={v.embedUrl}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h4 className="video-card__title">{v.title}</h4>
            <p className="video-card__desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
