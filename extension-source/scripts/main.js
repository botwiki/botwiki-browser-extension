import ready from './modules/ready.js';
import findBot from './modules/findBot.js';
import addBotwikiLink from './modules/addBotwikiLink.js';

ready(() => {
    setTimeout(() => {
        const accountUrl = window.location.href;
        findBot(accountUrl).then((data) => {
            if (data && data.length > 0){
                addBotwikiLink(accountUrl, data);
            }
        });
    }, 500);
});
  