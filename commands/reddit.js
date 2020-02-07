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

const simple_get = require('simple-get');

function get_post(subreddit, callback) {
  simple_get(`https://reddit.com/r/${subreddit}/random.json`, (err, res) => {
    if (err) {
      console.log(err);
    }

    let body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      var post = JSON.parse(JSON.stringify(eval('(' + body + ')')));
      callback(post);
    });
  });
}

exports.sadcat = function(command, message, Discord) {

  if (command === 'sadcat') {
    get_post('sadcats', (post) => {
      var data = post[0].data.children[0].data;
      var embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
        .setTitle('sorry it didn work :c')
        .setDescription('pls try again')
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);

      if (!(data.stickied || data.is_video || data.is_image || data.over_18 || data.spoiler)) {
        var embed = new Discord.RichEmbed()
          .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          .setAuthor(`u/${data.author} on r/sadcats`, 'http://www.vectorico.com/download/social_media/Reddit-Icon.png', 'https://reddit.com/r/sadcats')
          .setTitle(data.title)
          .setURL('https://reddit.com' + data.permalink)
          .setImage(data.url)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
      }
      
      message.channel.send(embed);
    });
  }
}

exports.blurry_cat = function(command, message, Discord) {

  if (command === 'blurrycat' || command === 'blurry' || command === 'blurrypictureofacat') {
    get_post('blurrypicturesofcats', (post) => {
      var data = post[0].data.children[0].data;
      var embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor('Sadbot by helpme#6529', 'https://i.imgur.com/l4eSfpf.png', 'https://discordapp.com/users/580941857530576898')
        .setTitle('sorry it didn work :c')
        .setDescription('pls try again')
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);

      if (!(data.stickied || data.is_video || data.is_image || data.over_18 || data.spoiler)) {
        var embed = new Discord.RichEmbed()
          .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          .setAuthor(`u/${data.author} on r/blurrypicturesofcats`, 'http://www.vectorico.com/download/social_media/Reddit-Icon.png', 'https://reddit.com/r/blurrypicturesofcats')
          .setTitle(data.title)
          .setURL('https://reddit.com' + data.permalink)
          .setImage(data.url)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
      }
      
      message.channel.send(embed);
    });
  }
}