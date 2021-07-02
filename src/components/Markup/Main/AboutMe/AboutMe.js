import './AboutMe.css';
import NavSocial from '../../NavSocial/NavSocial';
import myPhoto from '../../../../images/myPhoto.jpg';
import { STUDENT_ANCHOR_ID } from '../../../../constants/anchor-links';

function AboutMe() {

  return (
    <section className="about-me" id={ STUDENT_ANCHOR_ID }>
      <div className="about-me__content">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__divider"></div>
        <div className="about-me__profile">
          <div className="about-me__profile_text">
            <h3 className="about-me__profile_name">Олег Матвеев</h3>
            <p className="about-me__profile_profession">Фронтенд-разработчик, 44 года</p>
            <p className="about-me__profile_description">
              Я родился и вырос в Баку, в настоящий момент живу в Минске, РБ. У меня есть жена 
              и сын. Я люблю слушать музыку и имею музыкальное образование по классу гитары, 
              а ещё увлекаюсь ездой на моноколесе. Являюсь мастером художественной татуировки. 
              Недавно начал кодить. Карьеру начал в далеком 1992 году. Закончил БГУиР в 99м.
              С 2000 года работал в разных компаниях программистом. После того, как прошёл курс 
              по веб-разработке, начал заниматься как фриланс-заказами так и поиском себя в работе 
              над проектами в крупной компании.
            </p>
            <NavSocial/>
          </div>
          <img
            className="about-me__photo"
            src={ myPhoto }
            alt="Фото профиля"
          />
        </div>
      </div>
    </section>  
  )
}

export default AboutMe;