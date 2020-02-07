// Copyright 2020 helpme
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const EIGHT_BALL_RESPONSES = [
    // Positive
    'It is certain', 'Without a doubt', 'You may rely on it', 'Yes definitely', 'It is decidedly so',
    'As I see it, yes', 'Most likely', 'Yes', 'Outlook good', 'Signs point to yes',
    // Neutral
    'Reply hazy try again', 'Better not tell you now', 'Ask again later', 'Cannot predict now', 'Concentrate and ask again',
    'It\'s possible...', 'I\'m not sure', 'Answer unavailable', 'Cannot decode visions, ask again', 'idk fam sounds like a personal problem',
    // Negative
    'Don’t count on it', 'Outlook not so good', 'My sources say no', 'Very doubtful', 'My reply is no',
    'No', 'Improbable', 'I disagree', 'Probably not', 'Of course not'
]

exports.eight_ball = function(command, input, message, Discord) {
    if (command === '8ball') {
        let question = input.join(' ')
        if (question === '') {
            message.reply('The spirits say "dafuq you want ask a goddamned question"');
        } else {
            var embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setTitle('8ball - do yuo ned to be sad about thign')
                .addField('question :c', question)
                .addField('sad answer', EIGHT_BALL_RESPONSES[Math.floor(Math.random() * EIGHT_BALL_RESPONSES.length)])
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }   
    }
}