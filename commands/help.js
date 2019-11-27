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

'use strict';

exports.help_general = function(command, input, Discord, message) { // general help command
    if (command === 'help' && input.length == 0) {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
            .setTitle('Sadbot User Manual')
            .setDescription('Sadbot: a general purpose bot, filled to the brim with sadcats. Guaranteed to make you cry on every use.')
            .addField('**Prefix is \***', 'For example: \*command')
            .addField(`*ping`, 'Bot replies pong', true)
            .addField('*help', 'Gives this screen', true)
            .addField('Moderation', '*help moderation', true)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
        message.channel.send(embed);
    }
}

exports.help_moderation = function(command, input, Discord, message) { // help on moderation section
    if (command === 'help' && input[0] === 'moderation') {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
            .setTitle('Sadbot User Manual - Moderation')
            .addField('*kick <@user>', 'A simple command to kick a user', true)
            .addField('*ban <@user> [days] [reason]', 'A less simple command to ban a user', true)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
        message.channel.send(embed);
    }
}

exports.help_per_command = function(command, input, Discord, message) { // help per command, e.g. *help kick
    if (command === 'help') {
        if (input[0] === 'ping') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Ping')
                .addField('Usage', '*ping')
                .addField('Description', 'Bot replies "pong" to you, mostly for debugging. However, I thought it would be fun to leave in to commands users can access.')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }
        
        if (input[0] === 'kick') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Kick')
                .addField('Usage', '*kick <@user> [reason]')
                .addField('Description', 'Kick a user by mentioning them. There is also an optional reason argument. **Like all other moderation commands, the caller must have the "Sadbot Admin" role.**')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }

        if (input[0] === 'ban') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Ban')
                .addField('Usage', '*ban <@user> [days of messages to delete] [reason]')
                .addField('Description', 'Ban a user. There are 2 optional arguments behind the user mention: days and reason. The "days" option is how many days of messages to delete, and it defaults to 0. The reason argument is more self-explanitory. To trigger the reason argument, however, you must include a "days" argument (which can be 0). **Like all other moderation commands, the caller must have the "Sadbot Admin" role.**')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }
    }
}