const getUtilities = (accountUrl) => {
  let network, parentElSelectors = [], linkClasses = [];
  if (accountUrl.indexOf('twitter.com/') !== -1){
    network = 'twitter';
    parentElSelectors = [
      '[data-testid="primaryColumn"] [data-testid="placementTracking"]',
      '[data-testid="primaryColumn"] [data-testid="editProfileButton"]'
    ];
    // linkClasses = ['twttr-btn'];
  } else if (document.getElementById('mastodon')){
    network = 'mastodon';
    parentElSelectors = [
      '.account__header__tabs__buttons'
    ];
    linkClasses = ['button','logo-button'];
  }

  return {
    network,
    parentElSelectors,
    linkClasses
  }
}

export default getUtilities;
