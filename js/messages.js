let messages = {
    heroLog: {
        levelUp: (text) => `<span style="color:${colors.log.levelUp}">I have leveled up to level ${text}!</span>`,
        newFriend: (text) => `<span style="color:${colors.log.friend}">${text} is now my friend.</span>`,
        newItemFound: (text) => `I found ${text} in the dungeon.`,
        newItemBought: (text) => `I bought ${text}.`,
        dungeonSuccess: (text) => `<span style="color:${colors.log.success}">I successfully cleared ${text}.</span>`,
        dungeonGroupSuccess: (text) => `<span style="color:${colors.log.success}">We successfully cleared ${text}.</span>`,
        dungeonFailure: (text) => `I failed to finish ${text}.`,
        dungeonCriticalFailure: (text) => `I critically failed to finish ${text} and lost some skill.`,
        joinGuild: (text) => `<span style="color:${colors.log.success}">I have joined the ${text}.</span>`,
        formGuild: (text,test2) => `<span style="color:${colors.log.success}">I have formed the ${text} with ${test2}</span>`,
        leaveGuild: (text) => `<span style="color:${colors.Failure}">I have left the ${text}.</span>`,
        joinTown: () => `I have joined the town.`,
        leaveTown: (text) => `"I have left the ${text}."`
    }
}
