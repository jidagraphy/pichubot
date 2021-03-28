require('dotenv').config()
const tmi = require('tmi.js');

var block = false;
let chatSinceLastAnnouncement = 0;
const announcementTimer = 10 * 60 * 1000;
const minimumChatLine = 3;
const spamTimer = 1000;



const announcementMessage = "같이 놀아요! 🌿 Discord : https://discord.gg/6BrrwD9sz5 🍀 Instagram : @jidagraphy";
const randomPichuNoises = [
  "피츄우우우!",
  "피이이이츄!",
  "핏! 핐!",
  "피유웃!",
  "피비비비비빗",
  "피츄피츄우우우우",
  "핏?",
]



const pichuChallenge = [
  "메테오피니시!",
  "쓰리스톡!!",
  "실드브레이크!",
  "풋스툴ㅋㅋㅋ",
  "메테오로 이겨봐ㅋㅋ",
  "수어사이드킬!",
  "잽락해봐잽락",
  "쓰리스톡할수있겟나",
  "스테이지 스파이크!!!",
  "미러전..ㅇㅇ",
  "스매시 한번도 안쓰고 이겨봐 ㅋㅋ",
  "메테오메테오",
  "잡기로 이겨봐",
  "리커버리 뺴고 B버튼 한번도 안쓰기 ㅋㅋ",
  "제로투데스가쟈",

]

const smashCharacters = [
  '마리오', '동키콩', '링크', '사무스', '다크사무스', '요시', '커피', '폭스', '피카츄', '루이지', '네스', '캡틴팔콘', '푸린', '피치', '데이지', '쿠파', '얼음타기', '시크', '젤다', '닥터마리오', '피츄', '팔코', '마르스', '루키나', '소년링크' , '가논돌프', '뮤츠', '로이', '크롬', '게임&워치', '메타나이트', '피트', '블랙피트', '제슈사', '와리오', '스네이크', '아이크', '포켓몬트레이너', '디디콩', '류카', '소닉', '디디디', '피크민&올리마', '루카리오', 'ROB', '툰링크', '울프', '마을주민', '록맨', '위핏트레이너', '로젤리나&치코', '리틀맥', '개굴닌자', '팔루테나', '팩맨', '리플레', '슈르크', '쿠파주니어', '덕헌트', '류', '켄', '클라우드', '카무이', '베요네타', '잉클링', '리들리', '사이먼' , '릭터', '킹크루루', '여울', '어흥염', '뻐끔플라워', '조커', '용사', '반조카주이', '테리', '벨레스', '민민', '스티브', '세피로스', '호무라히카리'
]


const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
});

client.connect().then((data) => {
  client.color("GoldenRod");
  client.say(process.env.CHANNEL_NAME, "피츄가 나타났다!");
  client.say(process.env.CHANNEL_NAME, announcementMessage)

  setInterval(() => {
    console.log(chatSinceLastAnnouncement);
    if(chatSinceLastAnnouncement > minimumChatLine){
      client.say(process.env.CHANNEL_NAME, announcementMessage)
      chatSinceLastAnnouncement = 0;
    }
  }, announcementTimer)

}).catch((err) => {

});




client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  chatSinceLastAnnouncement++;
  if(self) return;


  if (!block) {
    if(message.toLowerCase() === '피츄야') {
      client.say(channel, `@${tags.username} ` + getRandom(randomPichuNoises));
    }
    if(message.toLowerCase() === '!command'){
      client.say(channel, "ㅋㅋ안알랴쥼");
    }
    if(message === "피츄야뭐하지"){
      client.say(channel, `@${tags.username} ` + getRandom(smashCharacters + "!!"));
    }
    if(message === "피츄챌린지"){
      client.say(channel, `@${tags.username} ` + getRandom(pichuChallenge));
    }

    block = true;
    setTimeout(() => {
        block = false;
    }, (spamTimer));
}

});

// client.on("join", (channel, username, self)=>{
//   if(self) return;
//
//   client.say(channel, "안녕하세요 " + username + "님! 재밌게 놀아요!");
// })



let getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}
