import Slot from '../Slot';
import { COMPANY } from '../../data/data';
import teamPhotoImg from '../../assets/about/team-photo.jpg';

export default function LeadershipSection() {
  return (
    <section className="section" id="leadership">
      <div className="wrap about__split">
        <div>
          <div className="kicker">Leadership</div>
          <h2 className="about__h">Experience behind the company</h2>
          <p className="about__p">
            Max-Seal is led by President {COMPANY.president}, with more than 40 years of valve industry experience. That experience shapes how we select, configure and support every valve we supply.
          </p>
          <ul className="about__values">
            <li>
              <span>Practical engineering</span> Help to match the right series, seat and trim to each service condition.
            </li>
            <li>
              <span>Dependable supply</span> Manual and automated products with responsive turnaround.
            </li>
            <li>
              <span>Customized solutions</span> Engineered configurations for challenging applications.
            </li>
          </ul>
        </div>
        <div className="about__leadcard">
          <div className="about__leadphoto">
            <Slot id="about-president" shape="rect" fit="cover" placeholder="Leadership photo" />
          </div>
          <div className="about__leadbody">
            <div className="about__leadname">{COMPANY.president}</div>
            <div className="about__leadrole">President</div>
            <p>More than 40 years of valve industry experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
