const fs = require('fs');
module.exports = function guild_contrib(mod){
    
    var guild = {};

    mod.hook('S_GUILD_MEMBER_LIST', 1, (p) => {
        p.members.forEach(member => {
            guild[member.playerID] = member;
        });
    });

    mod.command.add('gc', (cmd) => {
        var fileContent = "";
        Object.keys(guild).forEach(id => {
            var member = guild[id];
            var line = `${member.name}\t${member.contributionCurrent}\t${member.note}\r\n`;
            fileContent += line;

        });

        var now = new Date();

        var timeStr = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
        var filename ="mods/guild-contrib/gc "+timeStr+".tsv"; 
        fs.writeFile(filename, fileContent, function(err){
            if(err) console.log(err);
        });
        mod.command.message(`Guild members weekly contribution written to ${filename}`);
    });

}