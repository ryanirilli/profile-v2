export function setScrollVal(el = document.documentElement.scrollTop ? document.documentElement : document.body) {
  return {
    type: 'SET_SCROLL_VAL',
    scrollVal: el.scrollTop
  };
};