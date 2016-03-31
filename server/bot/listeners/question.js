import _ from 'lodash';
import botModel from '../botModel.js';
import sentiment from 'sentiment';
import natural from 'natural';
import getUserInfo from '../../utils/botUtils';
import google from 'google';

export default (controller) => {
  controller.hears('', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
    // bot.reply(message, 'Hello yourself.',message.text);
    let parseNumber = Math.abs(Number(message.text.split(' ').pop()));
    if (parseNumber) {
      let keyword = message.text.split(' ');
      keyword = keyword.slice(0, keyword.length - 1).join(' ');
      google.resultsPerPage = parseNumber;
      google(keyword, (err, res) => {
        if (err) console.log(err);
        for (var i = 0; i < ( parseNumber > 5 ? 5 : parseNumber ); i ++) {
          bot.reply(message, res.links[i].title + '\n' + res.links[i].link);
        }
      });
    }
  });

  controller.hears('', 'ambient', (bot, message) => {
    getUserInfo(bot, message.user)
      .then((user) => {
        // add real name to message object and convert timestamp to Date object
        Object.assign(message, {
          profile: user.profile,
          name: user.name,
          ts: new Date(parseFloat(message.ts) * 1000)
        });
        botModel.storeUser(user);

        // categorizes message by whether it is a question or a statement
        if (isQuestion(message.text)) {
          classifyQuestion(bot, message, user);
        } else {
          //bot.reply(message, sentiment(message.text).score.toString());
          // saves raw statements
          botModel.storeMessage(message);
        }
        // bot.reply(message,'messaged received');
      });
  });

  const isQuestion = (message) => {
    const array = message.split(' ');
    const questionWords = ['who', 'what', 'where', 'how', 'when', 'why', 'does', 'can', 'is'];
    if (questionWords.indexOf(array[0]) !== -1) {
      return true;
    }
    if (array[array.length - 1][array[array.length - 1].length - 1] === '?') {
      return true;
    }

    return false;
  };

  // TODO: find a way to extract classifier so we aren't loading the json file on each request
  const classifyQuestion = (bot, message, user) => {
    natural.BayesClassifier.load('./data/classifier.json', null, (err, classifier) => {
      botModel.checkUser(user, (status) => {
          if(status === false || status === undefined){
            bot.startPrivateConversation(message, (err, convo) => {
              convo.ask('Was your question about ' + classifier.classify(message.text) + '? If you would like to stop recieving these messages, please reply with "stop".', [
                {
                  pattern: bot.utterances.yes,
                  callback: (response, convo) => {
                    convo.say('Noted, thanks for making me smarter!');

                    saveMsg(message, classifier.classify(message.text));

                    console.log(JSON.stringify(classifier.getClassifications(classifier.classify(message.text))));
                    classifier.addDocument(message.text, classifier.classify(message.text));

                    classifier.train();
                    classifier.save('./data/classifier.json', function (err, results) {
                      if (err) {
                        console.error(err);
                      }
                    });

                    console.log(JSON.stringify(classifier.getClassifications(classifier.classify(message.text))));
                    convo.next();
                  }
                },
                {
                  pattern: bot.utterances.no,
                  default: true,
                  callback: (response, convo) => {
                    let sortedArr = classifier.getClassifications(message.text).sort(function (a, b) {
                        return b.value - a.value;
                    });

                    let topThree = [sortedArr[0].label, sortedArr[1].label, sortedArr[2].label];
                    //convo.say(JSON.stringify(sortedArr));
                    convo.ask('Hmm, was it about ' + topThree[0] + ', ' + topThree[1] + ' or ' + topThree[2] + '? If you do not see a fitting category, reply with "none"', [
                      {
                        pattern: 'none',
                        default: false,
                        callback: (response, convo) => {
                          convo.say("Okay, sorry we couldn't categorize your question!");
                          convo.next();
                        },
                      },
                      {
                        default: true,
                        callback: (res, convo) => {
                          convo.next();
                          //check to make sure user entered a valid category
                          if(res.text === topThree[0] || res.text === topThree[1] || res.text === topThree[2]){

                            saveMsg(message, res.text);
                            convo.say('Recorded your question about ' + res.text + ', thanks for making me smarter!');
                            classifier.addDocument(message.text, res.text);
                            classifier.train();
                          } else{
                            convo.say('Sorry, that wasn\'t one of the categories listed, I\'ll try again next time.');
                          }
                          convo.next();
                        }
                      }
                    ]

                    );
                    convo.next();
                  }
                },
                {
                  pattern: 'stop',
                  default: false,
                  callback: (response, convo) => {
                    convo.say('You have been added to my do not disturb list, if you would ever like to contribute in the future please DM me with they keyword, "join", thanks!');
                    user.dnd = true;
                    botModel.updateUser(user);
                    convo.next();
                  }
                }
              ]);
            });
          }
      });



      const saveMsg = (message, label) => {
        let classification = {
          classification: label
        };
        let allData = _.extend(message, classification);
        botModel.storeMessage(allData, () => {
          console.log('I am categorizing your question');
        });
      };
    });
  };
};
