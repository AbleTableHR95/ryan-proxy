import React from 'react';
import styles from '../styles/Webpage.css';

const Webpage = props => (
  <div>
    <div className={`container-fluid ${styles.bodyContainer}`}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-6">
          <div className="container">
            <nav id="navbar" className={`navbar ${styles.navbar} ${styles.bodyNav} ml-auto sticky-top`}>
              <ul className={`navbar-nav navbar-expand mr-auto ${styles.moduleNav}`}>
                <li className={`nav-item ${styles.bodyNavActive} ${styles.bodyNavItem}`}>{'Overview'}</li>
                <li className={`nav-item ${styles.bodyNavItem}`}>{'Photos'}</li>
                <li className={`nav-item ${styles.bodyNavItem}`}>{'Menu'}</li>
                <li className={`nav-item ${styles.bodyNavItem}`}>{'Reviews'}</li>
              </ul>
            </nav>
            <div id="overviewModule"></div>
            <div id="photo-service"></div>
            <div id="menusModule"></div>
            <div id="reviews"></div>
          </div>
        </div>
        <div className="col-3">
          <div id="appReserve" className={`sticky-top white`}>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Webpage;