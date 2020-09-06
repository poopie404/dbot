const config = {
    "ownerID": "Owner ID",

    "admins": "Admin ID",
  
    "support": [],

    "token": "Bot Token https://discordapp.com/developers/applications/me",

    "fkeytoken": "Fortnite key token (Unused right now) https://fortnitetracker.com/site-api/create",

    "ytKey": "Youtube API Key https://developers.google.com/",
  
    "dashboard" : {
      "oauthSecret": "Oauth Secret https://discordapp.com/developers/applications/me",
      "callbackURL": "Domain (must end with /callback)",
      "sessionSecret": "Unused but can enter if want.",
      "domain": "Domain (without the callback)",
      "port": 80
    },

    "defaultSettings" : {
      "prefix": "!",
      "pollChannel": "polls",
      "starboardChannel": "starboard",
      "systemNotice": "true",
      "serverLogs": "false",
      "serverLogsChannel": "logs",
      "modLogChannel": "mod-log",
      "modRole": "Moderator",
      "adminRole": "Administrator",
      "welcomeChannel": "welcome",
      "welcomeMessage": "Welcome {{user}} to {{guild}}! You are the {{amount}} user to join!",
      "welcomeEnabled": "false",
      "suggestionvote": "suggestion-vote"
    },
  
    permLevels: [
      { level: 0,
        name: "User", 
        check: () => true
      },
  
      { level: 2,
        name: "Moderator",
        check: (message) => {
          try {
            const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
            if (modRole && message.member.roles.has(modRole.id)) return true;
          } catch (e) {
            return false;
          }
        }
      },
  
      { level: 3,
        name: "Administrator", 
        check: (message) => {
          try {
            const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
            return (adminRole && message.member.roles.has(adminRole.id));
          } catch (e) {
            return false;
          }
        }
      },

      { level: 4,
        name: "Server Owner", 
        check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
      },

      { level: 8,
        name: "Bot Support",
        check: (message) => message.client.config.support.includes(message.author.id)
      },
  
      { level: 9,
        name: "Bot Admin",
        check: (message) => message.client.config.admins === message.author.id
      },
  
      { level: 10,
        name: "Bot Owner", 
        check: (message) => message.client.config.ownerID === message.author.id
      }
    ]
  };
  
  module.exports = config;
