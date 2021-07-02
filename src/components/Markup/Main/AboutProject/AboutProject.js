import './AboutProject.css';
import { PROJECT_ANCHOR_ID } from '../../../../constants/anchor-links';

function AboutProject() {

  return (
    <section className="about-project" id={ PROJECT_ANCHOR_ID }>
      <div className="about-project__content">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__divider"></div>
        <div className="about-project__description">
          <div className="about-project__card">
            <h3 className="about-project__card_name">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__card_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__card">
            <h3 className="about-project__card_name">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__card_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>          
        </div>
        <div className="about-project__bar">
          <div className="about-project__bar_green">
            <div className="about-project__bar-name about-project__bar-name_green">1 неделя</div>
            <p className="about-project__bar-sign">Back-end</p>
          </div>
          <div className="about-project__bar_grey">
            <div className="about-project__bar-name about-project__bar-name_grey">4 недели</div>
            <p className="about-project__bar-sign">Front-end</p>
          </div>
        </div>
      </div>
    </section>  
  )
}

export default AboutProject;