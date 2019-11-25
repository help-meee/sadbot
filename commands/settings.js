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

exports.setup_database = function(message, ServerSettings) {
    database_add().catch(e => console.error(e));

    async function database_add() {
        try {
            const guild = await ServerSettings.create({ guild_id: message.guild.id });
        } catch (e) {
            if (!e.name === 'SequelizeUniqueConstraintError') {
                console.error(e);
            }
        }
    }
}

exports.get_prefix = function(message, ServerSettings) {
    database_read().catch(e => console.error(e));

    async function database_read() {
        const guild = await ServerSettings.findOne({ where: { guild_id: message.guild.id } });
        if (guild) {
            return guild.get('prefix');
        } else {
            console.error(`Could not find settings for server ${guild.id}`);
        }
    }
}

exports.change_prefix = function(command, input, message, ServerSettings) {
    if (command === 'settings' && input[0] === 'prefix') {
        console.log(input[2]);
    }
}