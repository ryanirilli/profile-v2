import React, {Component} from 'react';
import {connect} from 'react-redux';
import OpeningAnimation from './opening-animation';
import ImageGallery from './image-gallery';
import Lowrider from './lowrider';

export class Home extends Component {
  render() {

    const metropolisCrestImages = [
      {
        path: '/public/metropolis-crest-on-black.svg',
        pickerBg: 'black'
      },
      {
        path: '/public/metropolis-crest-on-sunset.svg',
        pickerBg: '#334152'
      },
      {
        path: '/public/metropolis-crest-on-cream.svg',
        pickerBg: '#d2dbbd'
      },
      {
        path: '/public/metropolis-crest-on-pink.svg',
        pickerBg: '#e87ea2'
      },
      {
        path: '/public/metropolis-crest-on-huskies.svg',
        pickerBg: '#39275b'
      },
      {
        path: '/public/metropolis-crest-on-seahawks.svg',
        pickerBg: '#6abd45'
      }
    ];

    return <div className="home-container">
      <section className="u-bg-bright u-padding-top u-padding-bottom-huge">
        <OpeningAnimation />
        <div className="u-text-center u-padding-top-small">
          <h1>Ryan Irilli</h1>
          <span className="c-pill c-pill--teal">
            Javascript Programmer
          </span>
          <span className="c-pill c-pill--blue">
            UI Developer
          </span>
          <span className="c-pill c-pill--red">
            Web Designer
          </span>
        </div>

        <div className="o-wrapper u-padding-top u-padding-top@tablet">
          <div className="o-layout o-layout--center">
            <div className="o-layout__item u-2/3@desktop u-2/3@tablet u-1/1@mobile">
              <p className="u-text-center u-text-big u-text-muted u-text-embossed-dark">
                I have 8 years experience working from start ups to large companies in both design and engineering roles, bringing high quality UX to the production environment. And I love it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="u-bg u-bg--serrated-ends u-bg-main-color">
        <div className="o-wrapper u-padding-top u-padding-bottom-large u-padding-bottom@tablet">
          <div className="u-text-center u-padding-top-large u-padding-top@tablet u-padding-bottom">
            <img className="u-1/3@desktop u-2/3@tablet" src="/public/spotworm-logo.svg" />
          </div>
          <div className="o-layout o-layout--center">
            <div className="o-layout__item u-1/3@desktop u-1/2@tablet u-1/1@mobile">
              <p>
                My latest project, Spotworm, is built for modern music nerds on the hunt for the best new tunes. It uses the power
                of the Spotify API to let you search by artist, and gives you a list of tracks you might like. You can
                instantly sample tracks by hovering on your laptop, or tapping on mobile device and easily
                swipe through hundreds of tracks. When you find your jam, simply add it to a playlist and keep on browsing.
              </p>
            </div>
            <div className="o-layout__item u-1/3@desktop u-1/2@tablet u-1/1@mobile">
              <p>
                This project explores the technical design decisions that need to be addressed when building
                a mobile and desktop application, where the user experience requires more than just css media queries. By
                syncing the css breakpoints with javascript and using React and Redux, I am able to leverage shared code
                while also creating specific user experiences for each context.
              </p>
            </div>
          </div>
          <div className="u-text-center">
            <a className="c-btn" href="http://spotworm.com" target="_blank">
              Launch It
            </a>
          </div>
        </div>
      </section>

      <section className="o-wrapper u-padding-top u-padding-bottom-large u-padding-bottom@tablet">
        <div className="o-layout o-layout--center o-layout--flush">
          <div className="o-layout__item u-1/1">
            <div className="u-text-center">
              <h1 className="c-secondary-heading c-heading-light-color c-heading-huge u-margin-top-large u-margin-bottom-large u-margin-top-small@tablet u-margin-bottom-small@tablet">
                Metropolis
              </h1>
            </div>
          </div>
          <div className="layout__item u-1/1">
            <div className="o-layout o-layout--center">
              <div className="o-layout__item u-1/3@desktop u-1/2@tablet u-1/1@mobile">
                <div className="u-padding-right">
                  <p className="u-text-main u-text-justify">
                    I  work at Uber on a team called Metropolis. We aim to help cities use our data to help inform
                    decision making in urban planning and development. We're a group of rock solid engineers tackling some
                    really difficult challenges. My role is mostly in the front end architecture and managing the user
                    experience, so I primarily work on the implementation side of things.
                  </p>
                  <p className="u-text-main u-text-justify">
                    I was asked to come up with a logo for our team to represent our work and mission. A family crest
                    seemed most appropriate here seeing how tightly knit we were with one another. The subtle hexagon
                    pattern represents the various zones we bucket neighborhoods in, and of course the iconic Space Needle
                    to let the larger Uber groups know about the quality of work coming straight outta the Pacific Northwest.
                  </p>
                </div>
              </div>

              <div className="o-layout__item u-1/3@desktop u-1/2@tablet u-1/1@mobile">
                <ImageGallery images={metropolisCrestImages} />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="u-bg-main-color u-bg--accent u-margin-top-large">
        <div className="o-wrapper u-padding-top u-padding-bottom-large u-padding-bottom@tablet">
          <div className="u-text-center u-padding-top">
            <img className="u-1/4@desktop u-2/3@tablet" src="/public/visaudio-logo.svg" />
          </div>
          <div className="o-layout o-layout--center">
            <div className="o-layout__item u-1/3@tablet u-1/1@mobile">
              <p>
                Visaudio is an experiment with the Web Audio API. It uses audio frequency to control the rate of a photo
                slideshow. By averaging the frequency at a given sample, and
                comparing it to the previous one, when the threshold is exceeded, the photo changes.
              </p>
            </div>
            <div className="o-layout__item u-1/3@tablet u-1/1@mobile">
              <p>
                This gives some really interesting results and can create some beautiful slideshows. I
                collaborated with Bradley Schoch on this and we submitted it to the Dolby
                Web Audio contest (we didn't win).
              </p>
            </div>
          </div>
          <div className="u-text-center">
            <a className="c-btn" href="http://visaudio.me" target="_blank">
              Launch It
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="o-wrapper u-padding-top-large u-padding-bottom-huge u-padding-top@tablet u-padding-bottom@tablet">
          <h2 className="u-text-center c-secondary-heading c-heading-light-color c-heading-large">
            Unsullied Logo
          </h2>
          <div className="o-layout o-layout--center">
            <div className="o-layout__item u-1/6@desktop u-1/2@tablet u-1/2@mobile">
              <img className="u-1/1" src="/public/unsullied-logo-curves.jpg" />
            </div>
            <div className="o-layout__item u-1/6@desktop u-1/2@tablet u-1/2@mobile">
              <img className="u-1/1" src="/public/unsullied-logo.svg" />
            </div>
            <div className="o-layout__item u-1/6@desktop u-1/2@tablet u-1/2@mobile">
              <img className="u-1/1" src="/public/unsullied-logo-shadows.svg" />
            </div>
          </div>
        </div>
      </section>

      <section className="u-bg-light-brown u-bg--serrated-top u-padding-top u-padding-bottom">
        <div className="o-wrapper u-padding-top-large u-padding-bottom-large u-padding-bottom@tablet">
          <img className="c-lowrider__type" src="/public/lowrider/lowrider-type.svg" />
          <Lowrider />
        </div>
      </section>

      <footer className="u-text-center">
        <div>
          More Soon!
        </div>
        <div>
          Made with <i className="icon-heart" /> in Seattle, WA by Ryan Irilli &copy; {new Date().getFullYear()}
        </div>
      </footer>

    </div>
  }
}

const mapStateToProps = state => ({
  device: state.app.get('device')
});

export default connect(mapStateToProps)(Home);