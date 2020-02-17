# 1337notifier
1337notifier checks check-in on a headless chrome browser. this project is an improved version of Notify1337  by [AlaaZorkane](https://github.com/AlaaZorkane/Notify1337)
## Getting Started
### Installation**
run the following commands:
```
git clone https://github.com/abellaismail7/1337notifier.git
cd 1337notifier
npm install
```
Psss : the script uses puppeteer library which uses Chromium , this means that this command will download  Chromium(~170MB Mac, ~282MB Linux, ~280MB Win)  
### Usage :
first rename `config.ex.json` to `config.json` or create it :
```
mv config.ex.json config.json
```
then replace email and password with yours :
```
{
    "email":"",
    "password":"",
    ...
}
```
after that create an account on [twilio](https://www.twilio.com/).
```
{
    ...
    "accountSid":"",
    "authToken":"",
    "from":"",
    "to":"<YOUR-PHONE-NUMBER>"
}
```
replace **"<YOUR-PHONE-NUMBER>"**  with your phone number . use +2126.... instead of 06....
Psss: allow calls to morocco from [Voice Geographic Permissions](https://www.twilio.com/console/voice/calls/geo-permissions/low-risk).

## Contribute
1337notifier isn't tested well so I assume that it has many bugs. We need your help.


