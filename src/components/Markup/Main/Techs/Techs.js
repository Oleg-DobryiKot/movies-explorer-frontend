import './Techs.css';
import { TECHNO_ANCHOR_ID } from '../../../../constants/anchor-links';

function Techs() {

  return (  
    <section className="techs" id={ TECHNO_ANCHOR_ID }>
      <div className="techs__content">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__divider"></div>
        <div className="techs__description">
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
          <div className="techs__navbar">
            <button className="techs__navbar-btn techs__navbar-btn_text">HTML</button>
            <button className="techs__navbar-btn techs__navbar-btn_text">CSS</button>
            <button className="techs__navbar-btn techs__navbar-btn_text">JS</button>
            <button className="techs__navbar-btn techs__navbar-btn_text">React</button>
            <button className="techs__navbar-btn techs__navbar-btn_text">Git</button>
            <button className="techs__navbar-btn techs__navbar-btn_text">Express.js</button>
            <button className="techs__navbar-btn techs__navbar-btn_text">mongoDB</button>
          </div>
        </div>
      </div>
    </section>   
  )
}

export default Techs;