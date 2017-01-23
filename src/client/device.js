import MobileDetect from 'mobile-detect';
const breakpoints = {
  mobile:  '320px',
  tablet:  '740px',
  desktop: '980px',
  wide:    '1300px'
};

const deviceInfo = {mobileDetect: new MobileDetect(window.navigator.userAgent)};

export function getDeviceInfo() {
  for (let deviceName in breakpoints) {
    const breakpoint = breakpoints[deviceName];
    if(window.matchMedia(`screen and (min-width: ${breakpoint})`).matches) {
      deviceInfo.deviceName = deviceName;
    }
  }
  return deviceInfo;
}