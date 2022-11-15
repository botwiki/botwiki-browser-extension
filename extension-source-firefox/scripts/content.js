function ready( fn ) {
  if ( document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading' ){
    fn();
  } else {
    document.addEventListener( 'DOMContentLoaded', fn );
  }
}

function searchBotwiki(){
  let accountUrl = window.location.href;
  if ( accountUrl && accountUrl !== 'https://twitter.com/home' ){
    const apiCallURL = `https://botwiki.org/wp-json/wp/v2/bot?bot_url=${ accountUrl }`;

    fetch( apiCallURL )
      .then( response => response.json() )
      .then( data => {
        if ( data && data.length > 0 ){
          if ( accountUrl.indexOf( 'twitter.com/' ) !== -1 ){
            parentElSelectors = [
              '[data-testid="UserProfileHeader_Items"]',
              '.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l',
              '.ProfileHeaderCard'
            ];
            linkClasses = ['css-4rbku5', 'css-18t94o4', 'css-901oao', 'css-16my406', 'r-13gxpu9', 'r-1loqt21', 'r-4qtqp9', 'r-1qd0xha', 'r-ad9z0x', 'r-zso239', 'r-bcqeeo', 'r-qvutc0'];
          } else if ( accountUrl.indexOf( 'botsin.space/' ) !== -1 ){
            parentElSelectors = [
              '.public-account-header__tabs__tabs__buttons'
            ];
            linkClasses = ['button','logo-button'];
          }

          let BreakException = {}, parentEl;

          try {
            parentElSelectors.forEach( function( selector ){
              parentEl = document.querySelector( selector );
              if ( parentEl ){
                throw BreakException;
              }
            } );
          } catch (e) {
            if (e !== BreakException) throw e;
          }

          if ( parentEl ){
            let botwikiLink = document.createElement( 'a' );

            botwikiLink.setAttribute( 'href', data[0].link );
            botwikiLink.setAttribute( 'target', '_blank' );
            botwikiLink.style = 'vertical-align:top;';
            botwikiLink.innerHTML = 'View on Botwiki';

            linkClasses.forEach( function( className ){
              botwikiLink.classList.add( className );
            } );

            parentEl.appendChild( botwikiLink );
          }
        }
      } ).catch( function( err ) {
        /* noop */
      } );
    }
}

ready( function(){
  browser.storage.local.get().then( function( extSettings ){
    if ( !extSettings || !extSettings.confirmApiUse ){
      const confirmApiUse = confirm( 'Current URL will be sent to the Botwiki server to perform search. No data is ever saved.' );

      if ( confirmApiUse ){
        extSettings.confirmApiUse = true;
        browser.storage.local.set( extSettings );
        searchBotwiki();
      }
    } else {
      searchBotwiki();
    }
  });
} );
