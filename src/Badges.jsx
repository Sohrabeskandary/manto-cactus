import "./Badges.css";

const badges = [
  {
    id: 1,
    name: "quality guaranty badge",
    caption: "تضمین کیفیت",
    image: "/qualityGuarantyBadge.svg",
  },
  {
    id: 2,
    name: "rapid response badge",
    caption: "تضمین کیفیت",
    image: "/rapidResponseBadge.svg",
  },
  {
    id: 3,
    name: "price guaranty badge",
    caption: "تضمین کیفیت",
    image: "/priceGuarantyBadge.svg",
  },
  {
    id: 4,
    name: "safe payment badge",
    caption: "تضمین کیفیت",
    image: "/safePaymentBadge.svg",
  },
];

export default function Badges() {
  return (
    <div className="badge-section">
      {badges.map((badge) => (
        <div className="badge-container">
          <img src={badge.image} alt={badge.name} />
          <h4>{badge.caption}</h4>
        </div>
      ))}
    </div>
  );
}
