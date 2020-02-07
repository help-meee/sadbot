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

const fs = require('fs');
const path = require('path');

exports.help_general = function(command, input, Discord, message) { // general help command
    if (command === 'help' && input.length == 0) {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
            .setTitle('Sadbot User Manual')
            .setDescription('Sadbot: a general purpose bot, filled to the brim with sadcats. Guaranteed to make you cry on every use.')
            .addField('**Prefix is \***', 'For example: \*command')
            .addField('*help', 'Gives this screen')
            .addField('*version', 'Get version info')
            .addField('Moderation', '*help moderation')
            .addField('Fun', '*help fun')
            .addField('*sadcat', 'Grabs you a sadcat from Reddit')
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
            .addField('*kick <@user>', 'A simple command to kick a user')
            .addField('*ban <@user> [days] [reason]', 'A less simple command to ban a user')
            .addField('*slowmode <on/off/[time]>', 'Set the slowmode on a channel with more precision')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
        message.channel.send(embed);
    }
}

exports.help_fun = function(command, input, Discord, message) { // help on moderation section
    if (command === 'help' && input[0] === 'fun') {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
            .setTitle('Sadbot User Manual - Fun')
            .addField('*sadcat', 'Makes you cry with a sadcat fresh from r/sadcats')
            .addField('*8ball (question)', 'Questionable accuracy')
            .addField('*blurry/*blurrycat/*blurrypictureofacat', 'Gives you a very blurry picture of a cat from r/blurrypicturesofcats')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
        message.channel.send(embed);
    }
}

exports.help_per_command = function(command, input, Discord, message) { // help per command, e.g. *help kick
    if (command === 'help') {
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

        if (input[0] === 'sadcat') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Sadcat')
                .addField('Usage', '*sadcat')
                .addField('Description', 'Grabs you a random post from /r/sadcats. On the off chance the bot says there was an error, just do the command again. The post was likely not an image, or was nsfw, etc.')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }

        if (input[0] === 'slowmode') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Slowmode')
                .addField('Usage', '*slowmode <off/none/[time in seconds]/[time in format of 2h, 3m, 16s]>')
                .addField('Description', 'Changes the slowmode on a channel. The argument has a few ways of being written. The first is none or off, which disables slowmode. Second is simply a number of seconds. The third is used like so: 6h, 2m, 1m 15s. The maximum slowmode is 6 hours and the minimum is 0.')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }

        if (input[0] === 'version') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Version')
                .addField('Usage', '*version')
                .addField('Description', 'Tells you the version of Sadbot, the JS version, and the Discord.js version it is using.')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }

        if (input[0] === 'help') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Sadcat')
                .addField('Usage', '*help [optional command or command section]')
                .addField('Description', 'Gives a list of command sections without an argument, a list of commands in a section with the section provided, and a guide on how to use a command with a provided command.')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }

        if (input[0] === '8ball') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Magic 8 ball')
                .addField('Usage', '*8ball (question)')
                .addField('Description', 'Gives a totally accurate 100% proven prediction of the future.*')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username} | *This is an outright lie lmao`, message.author.avatarURL);
            message.channel.send(embed);
        }

        if (input[0] === 'blurry' || input[0] === 'blurrycat' || input[0] === 'blurrypictureofacat') {
            const embed = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                .setTitle('Sadbot User Manual - Blurry picture of a cat')
                .addField('Usage', '*blurry/*blurrycat/*blurrypictureofacat')
                .addField('Description', 'When the cat is not sad, it zoom. -ghandi probably')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send(embed);
        }
    }
}

exports.version = function(command, Discord, message) {
    if (command === 'version') {
        var filepath = path.join(__dirname, '../VERSION');

        fs.readFile(filepath, {encoding: 'utf-8'}, (err, data) => {
            if (!err) {
                const embed = new Discord.RichEmbed()
                    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                    .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                    .setTitle('Sadbot Info')
                    .addField('<:sadbot:654806690641739777> Sadbot Version', data)
                    .addField(`<:node_js:654806232229740599> Node.js version`, process.version)
                    .addField(`<:discord_js:654807709740171294> Discord.js version`, 'v11.5.1')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
                message.channel.send(embed);
            } else {
                const embed = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
                    .setTitle('sorry it didn work :c')
                    .setDescription('pls try again')
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
                message.channel.send(embed);
            }
        });
    }
}