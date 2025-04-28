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
        joinGuild: (text) => `I joined ${text}.`,
        leaveGuild: (text) => `I left ${text}.`,
        joinTown: () => `I have joined the town.`,
        leaveTown: (text) => `"I have left ${text}. A new adventure awaits!"`
    }
}
