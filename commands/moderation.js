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

const moment = require('moment');

exports.kick_command = function(command, input, message, adminrole) {
    if (adminrole != undefined) { // if "Sadbot Admin" exists
        if (message.member.roles.has(adminrole.id)) {
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
                            message.reply('im sry i failed... i cant kick them... (the culprit is most likely missing permissions or role hierarchy).');
                        })
                    } else {
                        message.reply('the mentioned user is not in the server ;c'); // user is not in server, how are you gonna kick them
                    }
                } else {
                    message.reply('pls mention a user to kick ;('); // no user to kick
                }
            }
        }
    }
}

exports.ban_command = function(command, input, message, adminrole) {
    if (adminrole != undefined) { // if "Sadbot Admin" role exists
        if (message.member.roles.has(adminrole.id)) {
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
    }
}

function getSeconds(str) { // for the slowmode function
    var output = 0;
    var hours = str.match(/(\d+)\s*h/);
    var minutes = str.match(/(\d+)\s*m/);
    var seconds = str.match(/(\d+)\s*s/);
    if (hours) { output += parseInt(hours[1])*3600; }
    if (minutes) { output += parseInt(minutes[1])*60; }
    if (seconds) { output += parseInt(seconds[1]); }
    return output;
}





exports.slowmode = function(command, input, message, adminrole) {
    if (adminrole != undefined) { // if "Sadbot Admin" role exists
        if (message.member.roles.has(adminrole.id)) { // if user of command has "Sadbot Admin" role
            if (command === 'slowmode') {

                let is_valid = false; // if the slowmode timer is valid
                let failure_reason = 'pls use a number of seconds or off/non ;-( (do *help slowmode for clarification)';
                let full_input = input.join(' ');
                let parsed_input;

                if (!isNaN(full_input.trim())) {
                    parsed_input = Number(full_input.trim());
                } else {
                    parsed_input = getSeconds(full_input);
                }

                if (parsed_input != 0) { // it's a number
                    if (parsed_input >= 0 && parsed_input <= 21600) { // between 0 and 120
                        message.channel.setRateLimitPerUser(parsed_input);
                        is_valid = true;
                        message.reply(`slowmode is now ${moment("2015-01-01").startOf('day').seconds(parsed_input).format('H:mm:ss')}`);
                    } else {
                        failure_reason = `the time ${moment("2015-01-01").startOf('day').seconds(parsed_input).format('H:mm:ss')} is not in range of 0 seconds to 6 hours, im sorry...`
                    }
                } else if (full_input === 'off' || full_input === 'none' || full_input === '0' || full_input === '0s' || full_input === '0m' || full_input === '0h') {
                    message.channel.setRateLimitPerUser(0);
                    message.reply('okay slowmode is off :c');
                    is_valid = true;
                }

                if (!is_valid) {
                    message.reply(failure_reason);
                }
            }
        }
    }
}