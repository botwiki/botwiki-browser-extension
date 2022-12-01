import getUtilities from './getUtilities.js';


const addBotwikiLink = (accountUrl, data) => {
  const {network, parentElSelectors, linkClasses} = getUtilities(accountUrl);
  const BreakException = {};
  let parentEl;
    
  try {
    parentElSelectors.forEach((selector) => {
      parentEl = document.querySelector(selector);
      console.log(`debug: trying ${selector}...`, parentEl);
      if (parentEl){
        throw BreakException;
      }
    });
  } catch (e){
    if (e !== BreakException) throw e;
  }

  if (parentEl){
    let botwikiLink = document.createElement('a');

    botwikiLink.setAttribute('href', data[0].link);
    botwikiLink.setAttribute('target', '_blank');
    botwikiLink.innerHTML = 'View on Botwiki';

    linkClasses.forEach((className) => {
      botwikiLink.classList.add(className);
    });
    
    switch (network){
      case 'twitter':
        botwikiLink.style = [
          `color: ${ document.querySelector('meta[name="theme-color"]').content === '#000000' ? '#fff' : '#000'};`,
          'height: 2.4rem;',
          'width: 8rem;',
        ].join('');
        parentEl.parentElement.prepend(botwikiLink);
        break;
      case 'mastodon':
        botwikiLink.style = 'vertical-align:top;';
        parentEl.prepend(botwikiLink);
        break;
    }

  }



}

export default addBotwikiLink;
