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

/**
 * * Sadbot
 * * A general purpose bot filled to the brim with sadcats.
 * * Guarenteed to make you cry on every use.
*/

//! Initiation
// constants
const PREFIX = '*';
// dontenv init
const dotenv_result = require('dotenv').config();
if (dotenv_result.error) { // log errors
    throw dotenv_result.error
}
// imports
const Discord = require('discord.js');
// create client instance
const client = new Discord.Client();
// confirm ready event
client.on('ready', () => {
    console.log('Ready!');
});

//! Event loop
client.on('message', message => {

    // make sure other bots cannot interface
    if (message.author.bot) return;
    // split up UIN into usable chunks
    const input = message.content.slice(PREFIX.length).split(' ');
	const command = input.shift();

    //* ping command
    if (command === 'ping') {
        message.channel.send(`${message.author.toString()}, pong!`);
    }

    //* help commands
    // help general
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
    // help moderation
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

    // help for each command
    if (command === 'help' && input[0] === 'ping') { // ping
        message.channel.send('**Ping command manual**\nUsage: *ping\nDescription: Bot replies "pong" to you, mostly for debugging.');
    } else if (command === 'help' && input[0] === 'kick') { // kick
        message.channel.send('**Kick command manual**\nUsage: *kick <@user> [reason (optional)]\nDescription: Kick a user by mentioning them. There is also an optional reason argument.');
    } else if (command === 'help' && input[0] === 'ban') { // ban
        message.channel.send('**Ban command manual**\nUsage: *ban <@user> [days of messages to delete (optional) [reason (optional)]\nDescription: Ban a user. There are 2 optional arguments behind the user mention: days and reason. The "days" option is how many days of messages to delete, and it defaults to 0. The reason argument is more self-explanitory.')
    }


    //! moderation commands
    // get mod role (temp)
    let adminrole = message.guild.roles.find(role => role.name === "Sadbot Admin");
    if (message.member.roles.has(adminrole.id)) { // member is admin

        //* kick
        if (command === 'kick') {
            const user = message.mentions.users.first(); // get user object
            if (user) { // if there is a user mentioned
                const member = message.guild.member(user); // get member object
                if (member) { // if the member is in the guild
                    /**
                     * @function *kick <@user> reason
                     * @param user A mentioned user to kick
                     * @param reason An optional reason
                     */
                    var kick_reason = input.slice(2).join(' ').trim();
                    member.kick(kick_reason).then(() => {
                        if (kick_reason != '') { // was there a kick reason given?
                            message.channel.send(`;c ${message.author.toString()} had me kick ${user.tag} for *${kick_reason}*, rip`); // all went well, kick reason was given
                        } else {
                            message.channel.send(`;c ${message.author.toString()} had me kick ${user.tag}, rip`); // if all went well, and no kick reason was given
                        }
                    }).catch(err => {
                        // Error happened, most likely due to missing permissions or role hierarchy.
                        message.reply('im sowwy i failed... i cant kick them... (the culprit is most likely missing permissions or role hierarchy).');
                    })
                } else {
                    message.reply('the mentioned user is not in the server ;c'); // user is not in server, how are you gonna kick them
                }
            } else {
                message.reply('pls mention a user to kick ;('); // no user to kick
            }
        }

        //* ban
        if (command === 'ban') {
            const user = message.mentions.users.first(); // get user object
            if (user) { // if there is a user mentioned
                const member = message.guild.member(user); // get member object
                if (member) { // if the member is in the guild
                    /**
                     * @function *ban <@user> days reason
                     * @param user A mentioned user to kick
                     * @param days How many days of messages to delete, optional, default 0
                     * @param reason An optional reason
                    **/
                    
                    let days = undefined;

                    if (input.length > 1) { // means that, if the command was correctly done, there is a days amount
                        if (!isNaN(input[1])) { // value is a number
                            days = parseInt(input[1]);
                        } else {
                            message.channel.send('the command goes like this pwease ;c...\n> *ban <@user> <days (optional)> <reason (optional)>\nto put a reason, you need to write the amount of days of messages to delete (this can be 0)');
                        }
                    } else {
                        days = 0;
                    }
                    
                    if (days != undefined) { // make sure there is a days value to use
                        
                        var ban_reason = input.slice(2).join(' ').trim();
                        member.ban({reason: ban_reason, days: days}).then(() => {
                            if (ban_reason != '') { // was there a ban reason given?
                                message.channel.send(`;c ${message.author.toString()} had me ban ${user.tag} for *${ban_reason}*, rip`); // all went well, kick reason was given
                            } else {
                                message.channel.send(`;c ${message.author.toString()} had me ban ${user.tag}, rip`); // if all went well, and no kick reason was given
                            }
                        }).catch(err => {
                            // Error happened, most likely due to missing permissions or role hierarchy.
                            message.reply('im sowwy i failed... i cant ban them... (the culprit is most likely missing permissions or role hierarchy).');
                        });
                    }
                } else {
                    message.reply('the mentioned user is not in the server ;c'); // user is not in server, how are you gonna kick them
                }
            } else {
                message.reply('pls mention a user to ban ;('); // no user to kick
            }
        }
    }
});

//! Login
client.login(process.env.API_TOKEN);