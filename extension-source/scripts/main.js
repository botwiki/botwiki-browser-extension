import ready from './modules/ready.js';
import getBotInfo from './modules/getBotInfo.js';
import findBot from './modules/findBot.js';
import addBotwikiLink from './modules/addBotwikiLink.js';
import addSubmitLink from './modules/addSubmitLink.js';

const searchBotwiki = () => {
    let intervalCount = 0, interval = setInterval(() => {
        const botInfo = getBotInfo(window.location.href);
        if (botInfo.botUrl){
            findBot(botInfo.botUrl).then((data) => {
                if (data && data.length > 0){
                    addBotwikiLink(botInfo, data);
                } else {
                    addSubmitLink(botInfo);
                }
            });
            clearInterval(interval);
        } else {
            intervalCount++;
            if (intervalCount > 20){
                clearInterval(interval);
            }
        }
    }, 1000);
}

let previousUrl = '';

const observer = new MutationObserver(function(mutations) {
  if (location.href !== previousUrl) {
        previousUrl = location.href;
        searchBotwiki();
    }
});

const config = {subtree: true, childList: true};
observer.observe(document, config);
