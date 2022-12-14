export default async (accountUrl) => {
    try {
        if (accountUrl && accountUrl !== 'https://twitter.com/home'){
            const requestURL = `https://botwiki.org/wp-json/wp/v2/bot?bot_url=${ accountUrl }`;
            const resp = await fetch(requestURL);
            const data = await resp.json();
            return data;
        }
    } catch (error){
        // console.log(error);
        return [];
    }
}
