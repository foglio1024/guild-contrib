const fs = require('fs');
var inCU = false;
var ranksAvailable = false;
const classes = {
    0: "Warrior",
    1: "Lancer",
    2: "Slayer",
    3: "Berserker",
    4: "Sorcerer",
    5: "Archer",
    6: "Priest",
    7: "Mystic",
    8: "Reaper",
    9: "Gunner",
    10: "Brawler",
    11: "Ninja",
    12: "Valkyrie"
};

var ranks = {};
module.exports = function guild_contrib(mod)
{

    var guild = {};
    var cu = {};
    var myGuildName = "";
    if (mod.dispatch.protocolVersion === 363037)
    {
        mod.dispatch.addOpcode("S_GUILD_INFO", 33528);
        ranksAvailable = true;
    }

    mod.hook("S_GUILD_INFO", 1, e =>
    {
        ranks = {};
        e.ranks.forEach(r =>
        {
            ranks[r.id] = r.name;
        });
    });
    mod.hook('S_LOAD_TOPO', 3, e =>
    {
        let movedToCU = e.zone == 152;
        if (inCU && !movedToCU)
        {
            var fileContent = "";
            Object.keys(cu).forEach(id =>
            {
                var member = guild[id];
                var line = `${member.name}\r\n`;
                fileContent += line;
            });

            var now = new Date();
            var timeStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
            var filename = "mods/guild-contrib/cu " + timeStr + ".tsv";
            fs.writeFile(filename, fileContent, function (err)
            {
                if (err) console.log(err);
            });
            mod.command.message(`Guild info written to ${filename}`);
        }
        inCU = movedToCU;
    });
    mod.hook('S_SPAWN_USER', 15, e =>
    {
        if (!inCU) return;
        if (e.guildName == myGuildName)
        {
            cu[e.playerId] = e;
        }
    });
    mod.hook('S_GUILD_MEMBER_LIST', 1, (p) =>
    {
        myGuildName = p.guildName;
        p.members.forEach(member =>
        {
            guild[member.playerID] = member;
        });
    });

    mod.command.add('gc', (cmd) =>
    {
        let fileContent = "#id\tname\tlevel\trank\tclass\tmessage\r\n";
        Object.keys(guild).forEach(id =>
        {
            const member = guild[id];
            const rank = ranksAvailable ? ranks[member.rank] : member.rank;
            const line = `${member.playerID}\t${member.name}\t${member.level}\t${rank}\t${classes[member.class]}\t${member.note}\r\n`;
            fileContent += line;
        });

        const now = new Date();

        const timeStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
        const filename = "mods/guild-contrib/gc " + timeStr + ".tsv";
        fs.writeFile(filename, fileContent, function (err)
        {
            if (err) console.log(err);
        });
        mod.command.message(`Guild info written to ${filename}`);
    });
}