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

    //* ping command
    if (message.content === '*ping') {
        message.channel.send(`${message.author.toString()}, pong!`);
    }

    //* help commands
    // help general
    if (message.content === '*help') {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('Sadbot User Manual')
            .setDescription('Sadbot: a general purpose bot, filled to the brim with sadcats. Guaranteed to make you cry on every use.')
            .addField('**Prefix is \***', 'For example: \*command')
            .addField('*ping', 'Bot replies pong', true)
            .addField('Moderation', '*help moderation', true)
            .setTimestamp()
            .setFooter('by helpme#6529')
        message.channel.send(embed);
    }
    // help moderation
    if (message.content === '*help moderation') {
        const embed = new Discord.RichEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('Sadbot User Manual - Moderation')
            .addField('*kick @user', 'Mention a user where @user is, and they will be kicked.')
            .setTimestamp()
            .setFooter('by helpme#6529')
        message.channel.send(embed);
    }
    
    //! moderation commands
    // get mod role (temp)
    let adminrole = message.guild.roles.find(role => role.name === "Sadbot Admin");
    if (message.member.roles.has(adminrole.id)) { // member is admin
        // kick
        if (message.content.startsWith('*kick')) {
            const user = message.mentions.users.first(); // get user object
            if (user) { // if there is a user mentioned
                const member = message.guild.member(user); // get member object
                if (member) { // if the member is in the guild
                    /**
                     * @function *kick <@user> reason
                     * @param user A mentioned user to kick
                     * @param reason An optional reason
                     */
                    var kick_reason = message.content.split(' ').slice(2).join(' ').trim();
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
                message.reply('im sowwy, i cant kick nobody ;('); // no user to kick
            }
        }
    }
})

//! Login
client.login(process.env.API_TOKEN);