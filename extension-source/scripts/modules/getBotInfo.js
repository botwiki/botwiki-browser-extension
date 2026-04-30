const getParentElement = (selectors) => {
  let parentEl;
  selectors.every(selector => {
    let maybeParentElement = document.querySelector(selector);

    if (maybeParentElement){
      parentEl = maybeParentElement;
      return false;
    }
    return true;
  });
  return parentEl;
}

const getBotInfo = (accountUrl) => {
  let botUrl, network, parentElement, linkClasses = [];
  if (accountUrl.indexOf('x.com/') !== -1){
    network = 'twitter';
    botUrl = accountUrl;
    const twitterParentElSelectors = [
      '[data-testid="primaryColumn"] [data-testid="placementTracking"]',
      '[data-testid="primaryColumn"] [data-testid="editProfileButton"]',
      '[data-testid="primaryColumn"] [data-testid="empty_state_body_text"]'
    ];
    parentElement = getParentElement(twitterParentElSelectors);
    // linkClasses = ['twttr-btn'];
  // } else if (document.getElementById('mastodon')){
  } else {
    const mastodonParentElSelectorsBtn = [
      '.account__header__buttons--desktop',
      '.account__header__tabs__buttons',
      '.public-account-header__tabs__tabs__buttons'
    ];

    const mastodonParentElSelectorsName = [
      '.account__header__tabs__name',
      '.public-account-header__tabs__name'
    ];
    parentElement = getParentElement(mastodonParentElSelectorsBtn);

    if (parentElement){
      network = 'mastodon';

      const nameElement = getParentElement(mastodonParentElSelectorsName);

      if (nameElement) {
        const handleSpan = nameElement.querySelector('small > span');
        if (handleSpan) {
          const parts = handleSpan.textContent.trim().split('@').filter(Boolean);
          if (parts.length >= 2) {
            botUrl = `https://${parts[1]}/@${parts[0]}`;
          } else if (parts.length === 1) {
            botUrl = `https://${window.location.hostname}/@${parts[0]}`;
          }
        }

        if (!botUrl) {
          const usernameArr = nameElement.textContent.split('@').map((a) => a.trim());
          botUrl = `https://${usernameArr[2]}/@${usernameArr[1]}`;
        }
      }

      linkClasses = ['button','logo-button'];
    }
  }

  return {
    botUrl,
    network,
    parentElement,
    linkClasses
  }
}

export default getBotInfo;
