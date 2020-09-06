const SQLite = require("better-sqlite3");
    const moment = require("moment");
module.exports = async(client, message) => {
  //Message Leaderboard SQL Tables
  const sql = new SQLite('./SQL/msgleaderboard/msg.sqlite');
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
  }

    //Dashboard Owner Sync
    client.appInfo = await client.fetchApplication();
    setInterval( async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);
    require("../modules/dashboard")(client); 

    //Console Log for startup.
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    console.log(`${timestamp} ${client.user.tag}, ${client.guilds.reduce((p, c) => p + c.memberCount, 0)} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);

    //Auto Activities List
    const activities_list = [
      "Need help? !help", 
      "Any Bugs or problems? DM: 𝓭𝓪𝓷𝓲𝓮𝓵𝓹𝓶𝓬#0666",
      "Tons of new updates coming!",
      "Need To Change Prefix? !settings"
      ];
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      client.user.setActivity(activities_list[index]); 
  }, 10000);
};
