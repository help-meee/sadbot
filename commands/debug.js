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

// helpme, sergei
const developers = ['580941857530576898', '513874030412169216'];

exports.ping_command = function(command, message) {
    if (!developers.includes(message.author.id)) return; // dev-only command
    
    if (command === 'ping') {
        message.channel.send(`${message.author.toString()}, pong!`);
    }
}

exports.db_add = function(command, input, message, Tags) {
    if (!developers.includes(message.author.id)) return; // dev-only command
    
    if (command === 'db-add') {
        database_add().catch(e => console.error(e));

        async function database_add() {
            let name = input.join(' ').split(', ')[0];
            let description = input.slice(1).join(' ');

            try {
                const tag = await Tags.create({
                    name: name,
                    description: description,
                    username: message.author.username,
                });
                return message.reply(`Tag ${tag.name} added.`);
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return message.reply('that tag already exists ):');
                }
                return message.reply(`oh noes, something went wrong with adding a tag: ${e}`);
            }
        }
    }
}

exports.db_read = function(command, input, message, Tags) {
    if (!developers.includes(message.author.id)) return; // dev-only command
    
    if (command === 'db-read') { 
        database_read().catch(e => console.error(e));

        async function database_read() {
            const tagName = input;
            const tag = await Tags.findOne({ where: { name: tagName } });
            if (tag) {
                tag.increment('usage_count');
                return message.channel.send(`${tag.get('description')}\nUsage count: ${tag.get('usage_count') + 1}`);
            }
            return message.reply(`couldnt find tag ${tagName} ;c`);
        }
    }
}

exports.db_edit = function(command, input, message, Tags) {
    if (!developers.includes(message.author.id)) return; // dev-only command
    
    if (command === 'db-edit') {
        let name = input.join(' ').split(', ')[0];
        let description = input.slice(1).join(' ');

        database_edit().catch(e => console.error(e));

        async function database_edit() {
            const affected_rows = await Tags.update({ description: description }, { where: { name: name } });
            if (affected_rows > 0) {
                return message.reply(`Tag ${name} was edited.`);
            }
            return message.reply(`Couldn't find a tag with the name ${name}.`);
        }
    }
}

exports.db_list = function(command, message, Tags) {
    if (!developers.includes(message.author.id)) return; // dev-only command
    
    if (command === 'db-list') { 
        database_list().catch(e => console.error(e));

        async function database_list() {
            const tagList = await Tags.findAll({ attributes: ['name'] });
            const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
            return message.channel.send(`List of tags: ${tagString}`);
        }
    }
}

exports.db_delete = function(command, input, message, Tags) {
    if (!developers.includes(message.author.id)) return; // dev-only command
    
    if (command === 'db-delete') {
        database_delete().catch(e => console.error(e));

        async function database_delete() {
            const tagName = input.join(' ');
            const rowCount = await Tags.destroy({ where: { name: tagName } });
            if (!rowCount) return message.reply('That tag did not exist.');
            return message.reply('Tag deleted');
        }
    }
}