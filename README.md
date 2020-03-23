# guild-contrib

#### **Weekly guild contribution**
Writes guild members weekly contribution to a .tsv file. 

Chat commands: 
- `gc dump` writes a `gc <date>.tsv` file with the following columns:

| id | name | level | rank | class | message |
| :------------: | :------------: | :------------: | :------------: | :------------: | :------------: |
| *player id* | *player name* | *player level* | *guild rank* | *player class* | *guild message* |

- `gc pvp <file_name>` writes a `<file_name><date>.tsv` with the following columns:

| id | name | level | rank | class | pvpRank | pvpRating | message |
| :------------: | :------------: | :------------: | :------------: | :------------: | :------------: | :------------: | :------------: |
| *player id* | *player name* | *player level* | *guild rank* | *player class* | *leaderboard ranking* | *leaderboard rating* | *guild message* |

To save PvP ranking list correctly, you have to open PvP Leaderboard, select the battleground, class and season filters you want and then use the command. The resulting file will only contain guild members that are included in the rankings, if any.

Make sure to open guild window at least once after login before using the commands.


#### **Civil Unrest participants**

Upon leaving Civil Unrest, automatically dumps a list of guildies that joined the war. 
Users are added to the list when they enter view range.
