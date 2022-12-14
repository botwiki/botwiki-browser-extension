const addBotwikiLink = (botInfo, botData) => {
  if (botInfo.parentElement){
    let botwikiLink = document.createElement('a');

    botwikiLink.setAttribute('href', botData[0].link);
    botwikiLink.setAttribute('target', '_blank');
    botwikiLink.innerHTML = 'View on Botwiki';

    if (botInfo.linkClasses){
      botInfo.linkClasses.forEach((className) => {
        botwikiLink.classList.add(className);
      });
    }

    switch (botInfo.network){
      case 'twitter':
        botwikiLink.style = [
          `color: ${ document.querySelector('meta[name="theme-color"]').content === '#000000' ? '#fff' : '#000'};`,
          'height: 2.4rem;',
          'width: 8rem;',
        ].join('');
        botInfo.parentElement.parentElement.prepend(botwikiLink);
        break;
      case 'mastodon':
        botwikiLink.style = 'vertical-align:top;';
        botInfo.parentElement.prepend(botwikiLink);
        break;
    }
  }
}

export default addBotwikiLink;
