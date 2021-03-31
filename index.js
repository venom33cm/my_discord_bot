const Discord =require('discord.js')
require("dotenv").config();

const client =new Discord.Client();
client.on('ready',()=>{
    console.log("connected as: "+client.user.tag);
     client.user.setActivity("with mathematics");
    client.guilds.cache.forEach(guild => {
        console.log(guild.name);
        
        guild.channels.cache.map(channel=>{
            console.log(`${channel.name}  ${channel.id}  ${channel.type}`)
        })
    });

    var gen_chat =client.channels.cache.get(process.env.Secret_Id);
    const pics= new Discord.MessageAttachment("https://miro.medium.com/max/1600/1*_l0vaIoI0RQu9_io9pJJIw.gif")
    gen_chat.send(pics);



})


client.on('message',(recievedmessage)=>{
    if(recievedmessage.author==client.user)
    return;
    // else{
    //     recievedmessage.channel.send(`message recieved ${recievedmessage.author.toString()}: ${recievedmessage}`)
    // }
    else if(recievedmessage.content.startsWith('!')){
        processcommand(recievedmessage)
    }
})

function processcommand(recievedmessage){
    var actual_command = recievedmessage.content.substr(1);
    var  commands =actual_command.split(' ');
    var primary_command =commands[0];
    var secondary_command =commands.slice(1);
    if(primary_command=="help"){
           if(secondary_command.length==0){
            recievedmessage.channel.send(" what help are you looking for brief it by !help [topic]");
               recievedmessage.react("🙄")
           }
           else{
               recievedmessage.channel.send(`Is this the help you need: ${secondary_command.join(" ")} ${recievedmessage.author.toString()}`);
               recievedmessage.react("🙄")
           }
    }
    else if(primary_command=="add"){
        if(secondary_command.length<2){
            recievedmessage.channel.send(" please provide the values to be added minimum 2 like  !add 2 10");
            recievedmessage.react("➕")
        }
        else{
            let sum=0
            secondary_command.forEach((add)=>sum+=parseFloat(add) )
            recievedmessage.channel.send(`the sum of the numbers ${secondary_command} is: ${sum}`);
            recievedmessage.react("➕")
        }
    }
    else{
        recievedmessage.channel.send(`invalid command try for !help or !add`);
        recievedmessage.react("❓");
        
    }
}

 bot_token =process.env.Token;

client.login(bot_token);