const bot = new SlackBot({token: `${process.env.BOT_TOKEN}`,name: 'slacklearnbot'});


bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'random',
        'Get inspired while working with SlackLearBot',
        params
    );
})