import martinImg from '../../assets/about/martin.png';
import joseImg from '../../assets/about/jose-villa.png';

const LEADERS = [
  {
    id: 'martin-gibbons',
    name: 'Martin Gibbons',
    role: 'President',
    image: martinImg,
    alt: 'Martin Gibbons, President at Max-Seal',
    line: 'Valve industry experience guiding product selection, application support and customer service.'
  },
  {
    id: 'jose-villa',
    name: 'Jose Villa',
    role: 'General Manager',
    image: joseImg,
    alt: 'Jose Villa, General Manager at Max-Seal',
    line: 'General management and customer support experience across valve selection and application requirements.'
  }
];

const POINTS = [
  {
    no: '01',
    eyebrow: 'ENGINEERING',
    heading: 'Practical valve engineering',
    description: 'Support for complex piping configurations, severe service conditions and application-specific valve requirements.'
  },
  {
    no: '02',
    eyebrow: 'SOLUTIONS',
    heading: 'Application-focused valve solutions',
    description: 'Support across manual valves, automated packages, special materials and customized configurations.'
  },
  {
    no: '03',
    eyebrow: 'SUPPORT',
    heading: 'Technical and field support',
    description: 'Technical sales, valve engineering and application personnel help customers review requirements and next steps.'
  }
];

export default function LeadershipSection() {
  return (
    <section className="section" id="leadership">
      <div className="wrap about__split">
        <div>
          <div className="kicker">LEADERSHIP</div>
          <h2 className="about__h">Valve experience behind every application</h2>
          <p className="about__p">
            Max-Seal's leadership and technical team bring industrial butterfly valve experience to product selection, automation, special materials and demanding service applications. Martin Gibbons and Jose Villa are part of the expert team supporting customer requirements through application review and practical valve guidance.
          </p>
          <div className="why__points" style={{ marginTop: '1.6rem' }}>
            {POINTS.map((pt) => (
              <div key={pt.no} className="why__pt">
                <div className="why__pt-no">{pt.no}</div>
                <div className="why__pt-body">
                  <div className="why__pt-k">{pt.eyebrow}</div>
                  <h4>{pt.heading}</h4>
                  <p style={{ maxWidth: 'none' }}>{pt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about__leadcards">
          {LEADERS.map((ldr) => (
            <div className="about__leadcard" key={ldr.id}>
              <div className="about__leadphoto">
                <img src={ldr.image} alt={ldr.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              <div className="about__leadbody">
                <div className="about__leadname">{ldr.name}</div>
                <div className="about__leadrole">{ldr.role}</div>
                <p>{ldr.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
