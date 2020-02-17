
/**
 * A configration object with a email and password.
 * @typedef {Object} Config
 * @property {string} email Your email in 1337.
 * @property {string} password Your password.
 * @property {string} accountSid Your accountSid from twillio.
 * @property {string} authToken Your auth token from twillio.
 * @property {string} to Your phone number .
 * @property {string} from Your number from twillio.
 */
/**
 * @type {Config} config
 */
const config = require('./config.json');
const puppeteer = require('puppeteer');
let checksCounter = 0;
/**
 * oldContent is The content From $("$content-subs").innerText
 */
let oldContent= 
`1337 veut te voir

x

Il est temps de faire ta connaissance.

Choisis maintenant un créneau de rendez-vous pour la réunion à laquelle tout étudiant admissible à 1337 est tenu de participer.


Note bien que c’est ta présence à ce rendez-vous qui conditionne ton accès à la Piscine et donc la suite du processus d’admission à 1337.

Tu peux venir accompagné d’une personne au maximum.

Prévois environ deux heures.

De nouveaux creneaux ouvriront prochainement. Pour être au courant dès qu'un nouveau creneau s'ouvrira, tu peux nous follow sur twitter :`;
const homePageUrl = "https://candidature.1337.ma/users/sign_in";
const checkInPageUrl = "https://candidature.1337.ma/meetings";
let browser,page;
( async()=>{

    // open the browser
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto(checkInPageUrl, {
      waitUntil: 'load'
    });
    
    await login(page);

    
    await checkForCheckIn(page)


})();


async function login() {
    console.log("log into 1337 website");
    
    await page.evaluate( function(config){
        document.getElementById("user_email").value = config.email;
        document.getElementById("user_password").value = config.password;
        document.getElementById("new_user").submit();
    },config );

    await page.waitForNavigation();
    if(page.url() === homePageUrl){
        console.error("email or password may be wrong");
        process.exit();
    }
    
}

async function checkForCheckIn(){
    console.log(`check for check in ... ${++checksCounter}`)

    /** @type string */
    const content = await page.evaluate(() => {
        let element = document.querySelector('#subs-content');
        return element.innerText;
    });
    
    if(content.startsWith(oldContent) ){
      /**
       * nothing new, try after 2 minutes
       * 
       * 2Mins = 2 * 60Senconds = 120 * 1000Milis = 120 000Milisconds
       * 
       */
      await new Promise(resolve => setTimeout(resolve, 120000))
        .then( 
          ()=> page.reload().then( ()=> checkForCheckIn())
        );

   }else{ 
      // Something changed => notify user
      await notifyMe();
      // take a screenshot
      await page.screenshot({
        path: `./screenshots/index.png`,
        fullPage: true
      });
      //  close browser and end the process
      await browser.close();
      
   }
}

const notifyMe = async ()=>{
  // setup twilio
  const client = require('twilio')(config.accountSid, config.authToken);
  // call me
  await client.calls
        .create({
          url: 'http://demo.twilio.com/docs/voice.xml',
          to: config.to,
          from:config.from
        })
        .then(call => console.log(call.sid))
        .catch(err => console.error(err) );
}
