import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slides from './slides';
import Tumblr from './tumblr';
import SexyImg from './sexy-img';
import {setScrollVal} from '../actions/app-actions';
import {fetchTumblrPosts} from '../actions/tumblr-actions';
import autoSales from './../auto-sales.json';
import {Line} from 'react-chartjs';
import Chart from 'chart.js';

const chartDefaults = Chart.defaults.global;
Chart.defaults.global = Object.assign({}, chartDefaults, {
  responsive: true,
  scaleFontColor: "#FFFFFF",
  scaleLabel: obj => {
    const {value} = obj;
    if (value === '1' || value === '0') {
      return '';
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});

const SLIDE_LIST = [
  'renderName',
  'renderMetropolis',
  'renderBrain',
  'renderTumblr',
  'renderLogos',
  'renderApartmentList',
  'renderCarHelper',
  'renderPointsIntro',
  'renderPoints',
  'renderPersonalIntro',
  'renderSpotworm',
  'renderArchitecture',
  'renderTechnical',
  'renderThankYou'
];

const INITIAL_SLIDE = 7;
const NUM_SLIDES = SLIDE_LIST.length;

export class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curSlide: INITIAL_SLIDE,
      isTransitioningOut: 0,
      isTransitioningIn: 0
    };
  }

  renderSlide(i) {
    return this[SLIDE_LIST[i-1]]();
  }

  onTransitionInComplete() {
    this.setState({
      isTransitioningIn: 0,
      nextSlide: 0
    });
  }

  onTransitionOutComplete() {
    this.setState({
      isTransitioningOut: 0,
      curSlide: this.state.nextSlide
    });
  }

  onChangeSlide(i) {
    let index = i;

    if (i > NUM_SLIDES) {
      index = 1;
    }

    if (i === 0) {
      index = NUM_SLIDES;
    }

    this.setState({
      isTransitioningOut: this.state.curSlide,
      isTransitioningIn: index,
      nextSlide: index
    });
  }

  renderName() {
    const content = isTransitioning => (<div>
      <div className="c-polaroid">
        <div className="c-polaroid__img-container">
          <img src="/public/portfolio/me.jpg" />
        </div>
        <div className="c-polaroid__body">
          <h3 className="c-polaroid__title">
            Ryan Irilli
          </h3>
          <p className="c-polaroid__description">
            Web Designer, Front End Developer, Traveler & Beer Enthusiast.
          </p>
        </div>
      </div>
    </div>);
    return this.renderContent(content, SLIDE_LIST.indexOf('renderName') + 1)
  }

  getTransitionState(state) {
    const isTransitioningIn = state === 'in';
    const isTransitioningOut = state === 'out';
    const isNotTransitioning = !isTransitioningIn && !isTransitioningOut;
    return {isTransitioningIn, isTransitioningOut, isNotTransitioning}
  }

  renderMetropolis() {
    const maxHeight = '220px';
    const content = transition => {
      const transitionState = this.getTransitionState(transition);
      let crestClasses = [];
      let uberClasses = [];

      if(transitionState.isNotTransitioning) {
        crestClasses.push('o-animate-fade-in-slide-right');
        uberClasses.push('o-animate-fade-in-slide-right-stagger-1');
      }

      if (transitionState.isTransitioningIn) {
        crestClasses.push('u-display-none');
        uberClasses.push('u-display-none');
      }

      return (
        <div className="u-bg-black">
          <div className="o-layout o-layout--center o-layout--flush">
            <div className="o-layout__item u-1/3 u-position-relative u-full-page">
              <div className="o-layout o-layout--center o-layout u-vertical-center-content">
                <div className="o-layout__item u-1/2">
                  <img className={crestClasses.join(' ')} style={{maxHeight}} src="/public/portfolio/metropolis-crest.svg" />
                </div>
                <div className="o-layout__item u-1/2">
                  <img className={uberClasses.join(' ')} style={{maxHeight}} src="/public/portfolio/uber-logo.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    return this.renderContent(content, SLIDE_LIST.indexOf('renderMetropolis') + 1, true)
  }

  renderBrain() {
    const listClasses = 'o-list-bare u-text-big u-text-strong';
    const headingClasses = 'u-padding-top-huge u-text-alt-heading';
    const content = isTransitioning => (<div>
      <div className="o-layout o-layout--flush">
        <div className="o-layout__item u-1/2 u-full-page u-bg-dark-teal u-position-relative u-overflow-hidden">
          <h2 className={`${headingClasses} u-text-right`}>
            Both Sides &nbsp;
          </h2>
          <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0}}>
            <div className="u-center-content">
              <ul className={listClasses}>
                <li>Programming</li>
                <li>Logic</li>
                <li>App Architecture</li>
                <li>Data Management</li>
              </ul>
            </div>
          </div>
          <img className={`${!isTransitioning ? 'c-portfolio__brain-left' : 'u-display-none'}`} src="/public/portfolio/left-brain.svg" />
        </div>
        <div className="o-layout__item u-1/2 u-full-page u-bg-blue u-position-relative u-overflow-hidden">
          <h2 className={headingClasses}>
            &nbsp; Of The Brain
          </h2>
          <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0}}>
            <div className="u-center-content">
              <ul className={listClasses}>
                <li>Look & Feel</li>
                <li>Delighful Experiences</li>
                <li>Beautiful Layouts</li>
                <li>Compelling Content</li>
              </ul>
            </div>
          </div>
          <img className={`${!isTransitioning ? 'c-portfolio__brain-right' : 'u-display-none'}`} src="/public/portfolio/right-brain.svg" />
        </div>
      </div>
    </div>);
    return this.renderContent(content, SLIDE_LIST.indexOf('renderBrain') + 1, true)
  }

  renderLogos() {
    const baseUrl = '/public/portfolio';
    const imageUrls = [
      'html-5-logo',
      'css3-logo',
      'javascript-logo',
      'webpack-logo',
      'react-logo',
      'redux-logo',
      'ember-logo',
      'angular-logo',
      'adobe-illustrator-logo',
      'photoshop-logo',
      'after-effects-logo'
    ];

    const renderItem = (url, i) => {
      return (<div key={i} className="o-layout__item u-1/4 u-padding-bottom">
        <img className="u-1/1" src={`${baseUrl}/${url}.svg`} />
      </div>);
    };

    const content = isTransitioning => (<div>
      <div className="o-layout o-layout--center">
        {imageUrls.map((url, i) => renderItem(url, i))}
      </div>
    </div>);
    return this.renderContent(content, SLIDE_LIST.indexOf('renderLogos') + 1)
  }

  renderApartmentList() {
    const content = isTransitioning => (<div>
      <img src="/public/portfolio/Apartment_List_logo.svg" />
      <div className="u-text-center u-padding-top">
        <h3 className="u-text-alt-heading">Web Designer | 2012</h3>
      </div>
    </div>);
    return this.renderContent(content, SLIDE_LIST.indexOf('renderApartmentList') + 1);
  }

  renderCarHelper() {
    const {scrollVal} = this.props;
    const isShowingAutoData = scrollVal > 400;
    const emptyDatasets = autoSales.datasets.map(dataset => {
      return Object.assign({}, dataset, {data: dataset.data.map(item => 0)});
    });

    const emptyAutoSales = Object.assign({}, autoSales, {
      datasets: emptyDatasets
    });

    const listTitleClasses = 'u-text-alt-heading u-border-bottom-white u-text-color-blue';
    const content = isTransitioning => (<div className="u-full-page">

      <div className="u-full-page-98 u-bg-grain">
        <div className="u-center-content">
          <div className="o-layout o-layout--flush o-layout--center">
            <div className="o-layout__item u-1/2">
              <img src="/public/portfolio/carhelper/carhelper-logo.png" />
            </div>
          </div>
        </div>
      </div>

      <div className="u-padding-top-huge u-padding-bottom-huge">
        <div className="o-layout o-layout--flush o-layout--center">
          <div className="o-layout__item u-1/2">
            <h3 className="u-text-alt-heading">
              Estimated Annual Sales of U.S. Automobile Dealers
            </h3>
            <span className="c-dot u-bg-carhelper-blue c-dot--white-border" />
            <span className="u-margin-right"> New Cars</span>
            <span className="c-dot u-bg-carhelper-dark-blue c-dot--white-border" /> Used Cars
            <div className="u-padding-top">
              <Line data={isShowingAutoData ? autoSales : emptyAutoSales} />
            </div>
          </div>
        </div>
      </div>

      <div className="u-padding-top-huge u-padding-bottom-huge u-bg-carhelper u-bg--accent">
        <div className="o-layout o-layout--flush o-layout--center">
          <div className="o-layout__item u-2/3">
            <img src="/public/portfolio/carhelper/carhelper-home.png" />
          </div>
        </div>
      </div>

      <div className="u-bg-grain">
        <div className="o-wrapper">
          <div className="u-padding-top-huge u-padding-bottom-huge o-layout o-layout--flush o-layout--center">
            <div className="o-layout__item u-1/3">
              <ul className="c-list-anatomy c-list-anatomy--right u-2/3 u-padding-top-large">
                <li className="u-padding-bottom">
                  <h3 className={listTitleClasses}>
                    Search Filters
                  </h3>
                  <p>
                    Range sliders, color pickers, and multi selects gave users a better car shopping experience
                  </p>
                </li>
                <li className="u-padding-bottom">
                  <h3 className={listTitleClasses}>
                    Results
                  </h3>
                  <p>
                    List view was the standard at the time and allowed users to quickly find listings that matched their criteria
                  </p>
                </li>
              </ul>
            </div>
            <div className="o-layout__item u-2/3">
              <SexyImg src="/public/portfolio/carhelper/carhelper-srp-grid.png" />
            </div>
          </div>


          <div className="u-padding-bottom-huge o-layout o-layout--center">
            <div className="o-layout__item u-2/3">
              <SexyImg src="/public/portfolio/carhelper/carhelper-srp-quick-view.png" />
            </div>
            <div className="o-layout__item u-1/3">
              <ul className="c-list-anatomy u-2/3 u-padding-top-huge">
                <li className="u-padding-bottom">
                  <h3 className={listTitleClasses}>
                    Quick View
                  </h3>
                  <p>
                    Using modals, we gave users a more streamlined approach to viewing listing details without having to navigate away from search results
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="u-padding-bottom-huge o-layout o-layout--center">
            <div className="o-layout__item u-1/6">
              <ul className="c-list-anatomy c-list-anatomy--right u-padding-top-huge">
                <li className="u-padding-bottom">
                  <h3 className={listTitleClasses}>
                    Gallery
                  </h3>
                  <p>
                    Data showed that people who submitted leads scrolled through at least half of the photos, giving us signal to imrpove the UX with lazy loading, infinite scroll and larger photos
                  </p>
                </li>
              </ul>
            </div>
            <div className="o-layout__item u-2/3">
              <SexyImg src="/public/portfolio/carhelper/carhelper-vdp.png" />
            </div>
            <div className="o-layout__item u-1/6">
              <ul className="c-list-anatomy u-padding-top-huge">
                <li className="u-padding-bottom">
                  <h3 className={listTitleClasses}>
                    Lead Form
                  </h3>
                  <p>
                    Most important UI component in the flow. We used A/B testing to experiment and optimize for conversion
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="u-padding-bottom-huge o-layout o-layout--flush o-layout--center">
            <div className="o-layout__item u-1/3">
              <ul className="c-list-anatomy c-list-anatomy--right u-2/3 u-padding-top-large">
                <li className="u-padding-bottom">
                  <h3 className={listTitleClasses}>
                    Comparison Tool
                  </h3>
                  <p>
                    Side by side comparison allowed users to easily differentiate their favorites
                  </p>
                </li>
                <li className="u-padding-bottom">
                  <h3 className={listTitleClasses}>
                    Drag and Drop
                  </h3>
                  <p>
                    Change the order of your list to get a better comparison experience for power users
                  </p>
                </li>
              </ul>
            </div>
            <div className="o-layout__item u-2/3">
              <SexyImg src="/public/portfolio/carhelper/carhelper-compare.png" />
            </div>
          </div>
        </div>
      </div>

      <div className="o-wrapper">
        <div className="u-padding-top-huge u-padding-bottom-huge o-layout o-layout--center">
          <div className="o-layout__item u-1/4">
            <img src="/public/portfolio/ruby-on-rails-logo.svg" />
          </div>
          <div className="o-layout__item u-1/4">
            <img src="/public/portfolio/backbone-logo.svg" />
          </div>
          <div className="o-layout__item u-1/4">
            <img src="/public/portfolio/jquery-logo.svg" />
          </div>
          <div className="o-layout__item u-1/4">
            <img src="/public/portfolio/sass.svg" />
          </div>
        </div>
      </div>

      <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
        Motion Work
      </h2>
      <div className="u-padding-bottom-huge o-layout o-layout--center">
        <div className="o-layout__item u-2/3">
          <iframe src="https://player.vimeo.com/video/38232890?title=0&byline=0&portrait=0"
                  style={{margin: '0 auto'}}
                  width="100%"
                  height="360"
                  frameBorder="0" />
        </div>
        <div className="o-layout__item u-2/3 u-padding-top-huge">
          <iframe src="https://player.vimeo.com/video/46887185?title=0&byline=0&portrait=0"
                  style={{margin: '0 auto'}}
                  width="100%"
                  height="360"
                  frameBorder="0" />
        </div>
      </div>
    </div>);
    return this.renderContent(content, SLIDE_LIST.indexOf('renderCarHelper') + 1, false, 'u-1/1');
  }

  renderPointsIntro() {
    const content = isTransitioning => (<div>
      <div className="u-center-content">
        <div className="o-layout o-layout--flush o-layout--center">
          <div className="o-layout__item u-2/3">
            <img className="u-1/1" src="/public/portfolio/logo_points_white.svg" />
          </div>
        </div>
      </div>

      <div className="u-text-center u-padding-top">
        <h3 className="u-text-alt-heading">Lead Web Developer | 2014</h3>
      </div>
    </div>);
    return this.renderContent(content, SLIDE_LIST.indexOf('renderPointsIntro') + 1);
  }

  renderPoints() {
    const {scrollVal} = this.props;
    const layoutItemClasses = 'o-layout__item u-1/2';
    const listTitleClasses = 'u-text-alt-heading u-border-bottom-white u-text-color-blue';
    const content = isTransitioning => (<div className="u-full-page">

      <div className="u-bg-points u-bg--serrated-bottom u-padding-top-huge u-padding-bottom-huge">
        <div className="o-layout o-layout--flush o-layout--center">
          <div className="o-layout__item u-2/3">
            <img style={{transform: `translateY(-${scrollVal/6}px)`}} src="/public/portfolio/points-hero.png" />
          </div>
        </div>
      </div>

      <div className="o-layout o-layout--flush o-layout--center">
        <div className="o-layout__item u-1/2">
          <h2 className="u-padding-top-huge u-padding-bottom-huge u-text-center u-margin-bottom-none u-text-alt-heading">
            Between 2008 and 2012, U.S. loyalty memberships increased by 10% per year – reaching over 23 memberships per household.
          </h2>
        </div>
      </div>

      <div className="o-layout o-layout--flush o-layout--center">
        <div className="o-layout__item u-2/3">
          <div className="u-padding-bottom-huge">
            <div className="u-bg-white-fade-top-to-bottom u-rounded-corners-large u-padding u-margin-bottom-huge">
              <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
                Program Tracker
              </h2>
              <div className="o-layout">
                <div className={layoutItemClasses}>
                  <SexyImg src="/public/portfolio/points/points-programs.png" />
                </div>
                <div className={layoutItemClasses}>
                  <ul className="c-list-anatomy u-2/3 u-padding-top-large">
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Grid and List View
                      </h3>
                      <p>
                        Multiple view options, allowing users to better compare their balances
                      </p>
                    </li>
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Masonry Layout
                      </h3>
                      <p>
                        Variable height cards, dynamically positioned to make the best use of vertical space
                      </p>
                    </li>
                    <li>
                      <h3 className={listTitleClasses}>
                        Points at a Glance
                      </h3>
                      <p>
                        Simple way to track accounts from all of your loyalty programs
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="u-bg-white-fade-top-to-bottom u-rounded-corners-large u-padding u-margin-bottom-huge">
              <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
                Redeem
              </h2>
              <div className="o-layout">
                <div className={layoutItemClasses}>
                  <SexyImg src="/public/portfolio/points/points-redeem.png" />
                </div>
                <div className={layoutItemClasses}>
                  <ul className="c-list-anatomy u-2/3 u-padding-top-huge">
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Filter Controls
                      </h3>
                      <p>
                        Search by program and filter hundreds of gift cards by category and name
                      </p>
                    </li>
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Gift Card Components
                      </h3>
                      <p>
                        Tap to select an amount and checkout or register your loyalty account
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="u-bg-white-fade-top-to-bottom u-rounded-corners-large u-padding u-margin-bottom-huge">
              <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
                Exchange
              </h2>
              <div className="o-layout">
                <div className={layoutItemClasses}>
                  <SexyImg src="/public/portfolio/points/points-exchange.png" />
                </div>
                <div className={layoutItemClasses}>
                  <ul className="c-list-anatomy u-2/3 u-padding-top">
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Simple Pickers
                      </h3>
                      <p>
                        Exchange allows you to easily select two accounts and use a range slider to set the amount
                      </p>
                    </li>
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Anonymous Pricing
                      </h3>
                      <p>
                        By allowing users to explore the exchange tool before registering their programs, they were more likely to complete a transaction
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="u-bg-white-fade-top-to-bottom u-rounded-corners-large u-padding u-margin-bottom">
              <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
                Mobile Experience
              </h2>
              <div className="u-padding-left-huge u-padding-right-huge">
                <div className="o-layout o-layout--large">
                  <div className="o-layout__item u-1/3">
                    <div className="c-mobile-device">
                      <div className="c-mobile-device__content">
                        <img src="/public/portfolio/points/points-programs-mobile.png" />
                      </div>
                    </div>
                  </div>
                  <div className="o-layout__item u-1/3">
                    <div className="c-mobile-device">
                      <img src="/public/portfolio/points/points-exchange-mobile.png" />
                    </div>
                  </div>
                  <div className="o-layout__item u-1/3">
                    <div className="c-mobile-device">
                      <img src="/public/portfolio/points/points-redeem-mobile.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>);
    return this.renderContent(content, SLIDE_LIST.indexOf('renderPoints') + 1, false, 'u-1/1');
  }

  renderTumblr() {
    const content = transitionState => {
      const state = this.getTransitionState(transitionState);
      if (state.isTransitioningIn) {
        return null;
      }
      return (
        <Tumblr posts={this.props.tumblrPosts} fetchPosts={this.props.fetchTumblrPosts} />
      );
    };
    return this.renderContent(content, SLIDE_LIST.indexOf('renderTumblr') + 1, true);
  }

  renderPersonalIntro() {
    const content = transitionState => {
      return <div>
        <h1 className="u-text-alt-heading u-text-center">
          Always Be Hustlin'
        </h1>
      </div>
    };
    return this.renderContent(content, SLIDE_LIST.indexOf('renderPersonalIntro') + 1);
  }

  renderSpotworm() {
    const listTitleClasses = 'u-text-alt-heading u-border-bottom-white u-text-color-blue';
    const content = transitionState => {
      return <div>
        <div className="u-bg-orange u-bg--serrated-bottom">
          <div className="o-layout o-layout--flush o-layout--center">
            <div className="o-layout__item u-1/2 u-full-page">
              <div className="u-center-content">
                <img className="u-1/1" src="/public/portfolio/logo_spotworm_white.svg" />
              </div>
            </div>
          </div>
        </div>

        <div className="o-layout o-layout__flush o-layout--center">
          <div className="o-layout__item u-5/6">
            <div className="u-padding-bottom-huge u-padding-top-huge u-padding-left-large u-padding-right-large o-layout o-layout--center">
              <div className="o-layout__item u-1/3">
                <ul className="c-list-anatomy c-list-anatomy--right u-padding-top-huge">
                  <li className="u-padding-bottom">
                    <h3 className={listTitleClasses}>
                      Typeahead
                    </h3>
                    <p>
                      The homepage is focused on simplicity and delight. Search by your favorite artist to get a list of
                      recommended tracks.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="o-layout__item u-2/3">
                <SexyImg src="/public/portfolio/spotworm/spotworm-home-results.png" />
              </div>
            </div>
          </div>
        </div>

        <div className="o-layout o-layout__flush o-layout--center">
          <div className="o-layout__item u-5/6">
            <div className="u-padding-bottom-huge o-layout o-layout--center">
              <div className="o-layout__item u-1/6">
                <ul className="c-list-anatomy c-list-anatomy--right u-padding-top-huge">
                  <li className="u-padding-bottom">
                    <h3 className={listTitleClasses}>
                      Sliders
                    </h3>
                    <p>
                      Mood sliders help you narrow in on the type of songs you are looking for
                    </p>
                  </li>
                </ul>
              </div>
              <div className="o-layout__item u-2/3">
                <SexyImg src="/public/portfolio/spotworm/spotworm-results.png" />
              </div>
              <div className="o-layout__item u-1/6">
                <ul className="c-list-anatomy u-padding-top-large">
                  <li className="u-padding-bottom">
                    <h3 className={listTitleClasses}>
                      Preview
                    </h3>
                    <p>
                      Instantly preview tracks on mouse hover
                    </p>
                  </li>
                  <li className="u-padding-bottom">
                    <h3 className={listTitleClasses}>
                      Drag & Drop
                    </h3>
                    <p>
                      Find a track you like? Connect to Spotify and drag it to any of your playlists
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="o-layout o-layout__flush o-layout--center">
          <div className="o-layout__item u-5/6">
            <div className="u-padding-bottom-huge u-padding-left-large u-padding-right-large o-layout o-layout--center">
              <div className="o-layout__item u-4/5">
                <SexyImg src="/public/portfolio/spotworm/spotworm-artist-details.png" />
              </div>
              <div className="o-layout__item u-1/5">
                <ul className="c-list-anatomy u-padding-top-huge">
                  <li className="u-padding-bottom">
                    <h3 className={listTitleClasses}>
                      Artist Details
                    </h3>
                    <p>
                      Found a new artist you like? click the more icon to see their full discography
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="o-layout o-layout__flush o-layout--center u-padding-bottom-huge">
          <div className="o-layout__item u-5/6">
            <div className="u-padding u-margin-bottom">
              <div className="u-padding-left-huge u-padding-right-huge">
                <div className="o-layout o-layout--large">
                  <div className="o-layout__item u-1/3">
                    <div className="c-mobile-device">
                      <div className="c-mobile-device__content">
                        <img src="/public/portfolio/spotworm/spotworm-home-mobile.png" />
                      </div>
                    </div>
                  </div>
                  <div className="o-layout__item u-1/3">
                    <div className="c-mobile-device">
                      <img src="/public/portfolio/spotworm/spotworm-results-mobile-2.png" />
                    </div>
                  </div>
                  <div className="o-layout__item u-1/3">
                    <div className="c-mobile-device">
                      <img src="/public/portfolio/spotworm/spotworm-preview-mobile.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    };
    return this.renderContent(content, SLIDE_LIST.indexOf('renderSpotworm') + 1, true, '');
  }

  renderTechnical() {
    const content = transitionState => {
      return <div>
        <div className="u-full-page">
          <div className="u-center-content">
            <div className="o-layout o-layout--center o-layout--flush">
              <div className="o-layout__item u-1/1">
                <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
                  Activity
                </h2>
              </div>
              <div className="o-layout__item u-2/3">
                <div className="o-layout o-layout--center o-layout--tiny">
                  <div className="o-layout__item u-1/2">
                    <SexyImg src="/public/portfolio/technical/github-profile.png" />
                  </div>
                  <div className="o-layout__item u-1/2">
                    <SexyImg src="/public/portfolio/technical/medium-2.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    };
    return this.renderContent(content, SLIDE_LIST.indexOf('renderTechnical') + 1, true);
  }

  renderArchitecture() {
    const listTitleClasses = 'u-text-alt-heading u-border-bottom-white u-text-color-blue';
    const content = transitionState => {
      return <div>
        <div className="u-padding-top-huge u-padding-bottom-huge">
          <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
            Architecture
          </h2>
          <div className="o-layout o-layout__flush o-layout--center">
            <div className="o-layout__item u-5/6">
              <div className="u-padding u-margin-bottom">
                <div className="u-padding-left-huge u-padding-right-huge">
                  <div className="o-layout o-layout--flush">
                    <div className="o-layout__item u-1/2">
                      <img src="/public/portfolio/technical/ITCSS_logo.png" />
                    </div>
                    <div className="o-layout__item u-1/2">
                      <SexyImg detailClassName="u-1/2" src="/public/portfolio/technical/ITCSS.jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="o-layout o-layout__flush o-layout--center">
            <div className="o-layout__item u-5/6">
              <div className="u-padding-bottom-huge u-padding-left-large u-padding-right-large o-layout o-layout--center">
                <div className="o-layout__item u-1/2">
                  <SexyImg src="/public/portfolio/technical/css-structure.png" />
                </div>
                <div className="o-layout__item u-1/3">
                  <ul className="c-list-anatomy u-padding-top-huge">
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Manifest
                      </h3>
                      <p>
                        Each import follows the inverted triangle structure providing a sane approach to managing a lot of css modules
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="o-layout o-layout__flush o-layout--center">
            <div className="o-layout__item u-5/6">
              <div className="u-padding-bottom-huge u-padding-left-large u-padding-right-large o-layout o-layout--center">
                <div className="o-layout__item u-1/3">
                  <ul className="c-list-anatomy c-list-anatomy--right u-padding-top-large">
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        Syncing Breakpoints
                      </h3>
                      <p>
                        by keeping the named breakpoints in sync with the redux store we can conditionally render blocks
                        of UI depending on context
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="o-layout__item u-2/3">
                  <div className="u-padding-left">
                    <SexyImg src="/public/portfolio/technical/sync-breakpoints.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="o-layout o-layout__flush o-layout--center">
            <div className="o-layout__item u-5/6">
              <div className="u-padding-bottom-huge u-padding-left-large u-padding-right-large o-layout o-layout--center">
                <div className="o-layout__item u-1/2">
                  <SexyImg src="/public/portfolio/technical/BEM.png" />
                </div>
                <div className="o-layout__item u-1/3">
                  <ul className="c-list-anatomy u-padding-top-huge">
                    <li className="u-padding-bottom">
                      <h3 className={listTitleClasses}>
                        BEM
                      </h3>
                      <p>
                        BEM stands for block-element-modifier and it helps keep your HTML semantic.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 style={{fontSize: '50px'}} className="u-text-alt-heading u-text-center">
            Unidirectional Data Flow
          </h2>
          <div className="o-layout o-layout__flush o-layout--center">
            <div className="o-layout__item u-5/6">
              <div className="u-padding-bottom-huge u-padding-left-large u-padding-right-large o-layout o-layout--center">
                <div className="o-layout__item u-1/3">
                  <div className="u-padding-top-huge">
                    <img className="u-1/2" src="/public/portfolio/react-logo.svg" />
                    <img className="u-1/2" src="/public/portfolio/redux-logo.svg" />
                  </div>
                </div>
                <div className="o-layout__item u-2/3">
                  <img src="/public/portfolio/technical/unidirectional-flow.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    };
    return this.renderContent(content, SLIDE_LIST.indexOf('renderArchitecture') + 1, true);
  }

  renderThankYou() {
    const content = transitionState => {
      return <div className="u-full-page u-bg-blue">
        <div className="u-center-content">
          <img src="/public/portfolio/thank_you.png" />
        </div>
      </div>
    };
    return this.renderContent(content, SLIDE_LIST.indexOf('renderThankYou') + 1, true);
  }

  renderContent(content, i, isFullPage, classNames = 'u-1/3') {
    const isTransitioningIn = this.state.isTransitioningIn === i;
    const isTransitioningOut = this.state.isTransitioningOut === i;
    return <div className={`${isFullPage ? 'u-full-page' : 'u-center-content'}`}>
      <div className={`${isFullPage ? '' : classNames}`}>
        {isTransitioningIn && <div className={`${isTransitioningIn ? 'o-animate-fade-in-slide-right' : ''}`} onAnimationEnd={e => this.onTransitionInComplete()}>
          {content('in')}
        </div>}
        {isTransitioningOut && <div className={`${isTransitioningOut ? 'o-animate-fade-out-scale-up' : ''}`} onAnimationEnd={e => this.onTransitionOutComplete()}>
          {content('out')}
        </div>}
        {!isTransitioningIn && !isTransitioningOut && content()}
      </div>
    </div>
  }

  render() {
    return <div className="c-portfolio">
      <Slides numSlides={NUM_SLIDES}
              isTransitioningOut={this.state.isTransitioningOut}
              isTransitioningIn={this.state.isTransitioningIn}
              curSlide={this.state.curSlide}
              onChangeSlide={i => this.onChangeSlide(i)}
              renderSlide={i => this.renderSlide(i)}
              setScrollVal={this.props.setScrollVal} />
    </div>
  }
}

const mapStateToProps = state => ({
  scrollVal: state.app.get('scrollVal'),
  tumblrPosts: state.tumblr.get('posts')
});


const mapDispatchToProps = {
  setScrollVal,
  fetchTumblrPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)