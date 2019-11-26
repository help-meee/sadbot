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

'use strict';

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
const Sequelize = require('sequelize');

const HelpCommands = require('./commands/help.js');
const DebugCommands = require('./commands/debug.js');
const ModerationCommands = require('./commands/moderation.js')

const DatabaseModels = require('./database_models');

// create client instance
const client = new Discord.Client();

//! database init
const sequelize = new Sequelize('database', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});

const Tags = sequelize.define('tags', DatabaseModels.Tags);
const ServerSettingsModel = sequelize.define('server_settings', DatabaseModels.ServerSettings);

//! confirm ready event
client.on('ready', () => {
    console.log('Ready!');

    Tags.sync({ force: true });
    ServerSettingsModel.sync({ force: true });

    client.user.setPresence({
        game: {
            name: 'the barrage of pings',
            type: 'LISTENING'
        }
    })
});

//! Listener
client.on('message', message => {

    // make sure other bots cannot interface
    if (message.author.bot) return;

    // if it was a ping to the bot
    if (message.content === '<@646581444637884435>') {
        message.channel.send('do `*help` to start :c')
    }

    // split up UIN into usable chunks
    if (message.content.startsWith(PREFIX)) {
        
        const input = message.content.slice(PREFIX.length).split(' ');
        const command = input.shift();

        let adminrole = undefined;

        try {
            adminrole = message.guild.roles.find(r => r.name === "Sadbot Admin");
        } catch (e) {
            adminrole = undefined;
        }

        DebugCommands.ping_command(command, message);
        DebugCommands.db_add(command, input, message, Tags);
        DebugCommands.db_read(command, input, message, Tags);
        DebugCommands.db_edit(command, input, message, Tags);
        DebugCommands.db_list(command, message, Tags);
        DebugCommands.db_delete(command, input, message, Tags);

        HelpCommands.help_general(command, input, Discord, message);
        HelpCommands.help_moderation(command, input, Discord, message);
        HelpCommands.help_per_command(command, input, Discord, message);

        ModerationCommands.kick_command(command, input, message, adminrole);
        ModerationCommands.ban_command(command, input, message, adminrole);
    }
});

//! Login
client.login(process.env.API_TOKEN);