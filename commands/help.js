// Copyright 2019 helpme
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

exports.help_general = function(command, input, Discord, message) { // general help command
    if (command === 'help' && input.length == 0) {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('Sadbot User Manual')
            .setDescription('Sadbot: a general purpose bot, filled to the brim with sadcats. Guaranteed to make you cry on every use.')
            .addField('**Prefix is \***', 'For example: \*command')
            .addField(`*ping`, 'Bot replies pong', true)
            .addField('*help', 'Gives this screen', true)
            .addField('Moderation', '*help moderation', true)
            .setTimestamp()
            .setFooter('by helpme#6529');
        message.channel.send(embed);
    }
}

exports.help_moderation = function(command, input, Discord, message) { // help on moderation section
    if (command === 'help' && input[0] === 'moderation') {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('Sadbot User Manual - Moderation')
            .addField('*kick <@user>', 'A simple command to kick a user', true)
            .addField('*ban <@user> [days] [reason]', 'A less simple command to ban a user', true)
            .setTimestamp()
            .setFooter('by helpme#6529');
        message.channel.send(embed);
    }
}

exports.help_per_command = function(command, input, Discord, message) { // help per command, e.g. *help kick
    if (command === 'help' && input[0] === 'ping') { // ping
        message.channel.send('**Ping command manual**\nUsage: *ping\nDescription: Bot replies "pong" to you, mostly for debugging.');
    } else if (command === 'help' && input[0] === 'kick') { // kick
        message.channel.send('**Kick command manual**\nUsage: *kick <@user> [reason (optional)]\nDescription: Kick a user by mentioning them. There is also an optional reason argument.');
    } else if (command === 'help' && input[0] === 'ban') { // ban
        message.channel.send('**Ban command manual**\nUsage: *ban <@user> [days of messages to delete (optional) [reason (optional)]\nDescription: Ban a user. There are 2 optional arguments behind the user mention: days and reason. The "days" option is how many days of messages to delete, and it defaults to 0. The reason argument is more self-explanitory.')
    }
}