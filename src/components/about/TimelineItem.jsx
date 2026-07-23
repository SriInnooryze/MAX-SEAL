import Slot from '../Slot';
import teamPhotoImg from '../../assets/about/team-photo.jpg';

export default function TimelineItem({ item, index }) {
  const { period, label, title, description, mediaPh, imageSlotId } = item;
  const slotId = imageSlotId || `about-tl-${index}`;
  const imgSrc = index === 0 ? teamPhotoImg : item.image;

  return (
    <li className="tl__item reveal">
      <div className="tl__marker">
        <span className="tl__dot" />
        <span className="tl__line" />
      </div>
      <div className="tl__content">
        <span className="tl__period">{period || label}</span>
        <h3 className="tl__title">{title}</h3>
        <p className="tl__text">{description}</p>
      </div>
      {mediaPh && (
        <div className="tl__media">
          <Slot id={slotId} src={imgSrc} position="center top" shape="rect" fit="cover" placeholder={mediaPh} />
        </div>
      )}
    </li>
  );
}
