import "./Footer.css";

const contactInfo = [
  {
    image: "/location.svg",
    alt: "location",
    index: "استان البرز-فردیس",
    link: "/map",
  },
  {
    image: "/phonebw.svg",
    alt: "call",
    index: "09121121212",
    link: "/map",
  },
  {
    image: "/email.svg",
    alt: "email",
    index: "email@email.com",
    link: "/map",
  },
  {
    image: "/instagrambw.svg",
    image2: "/email.svg",
    alt: "instagram",
    index: "manto-cactus@",
    link: "/map",
  },
];

export default function FooterSection() {
  return (
    <section className="footer">
      <div className="footer-items">
        <div className="contact-info">
          <h2>اطلاعات تماس</h2>
          {contactInfo.map((info) => (
            <a className="contact-info-item" href={info.link}>
              <img className="color" src={info.image} alt={info.alt} />

              <h3>{info.index}</h3>
            </a>
          ))}
        </div>
        <div>
          <h2>لوکیشن مانتو کاکتوس</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1619.5208789412245!2d50.987684627670184!3d35.72519153628982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQzJzMwLjciTiA1MMKwNTknMTguOSJF!5e0!3m2!1sen!2s!4v1759866738409!5m2!1sen!2s"
            width="450"
            height="250"
            className="map"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <h2>نمادها</h2>
          <img src="/enamad.png" height="200" alt="eNAMAD" />
          <img src="/businessUnion.png" height="200" alt="businessUnion" />
        </div>
      </div>
    </section>
  );
}
