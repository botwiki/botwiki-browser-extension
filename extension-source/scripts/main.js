import ready from './modules/ready.js';
import getBotInfo from './modules/getBotInfo.js';
import findBot from './modules/findBot.js';
import addBotwikiLink from './modules/addBotwikiLink.js';

ready(() => {
    setTimeout(() => {
        const botInfo = getBotInfo(window.location.href);
        findBot(botInfo.botUrl).then((data) => {
            // console.log(botInfo, data);
            if (data && data.length > 0){
                addBotwikiLink(botInfo, data);
            }
        });
    }, 1000);
});
