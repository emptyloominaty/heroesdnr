let messages = {
    heroLog: {
        levelUp: (text) => `I have leveled up to level ${text}!`,
        newFriend: (text) => `${text} is now my friend.`,
        newItemFound: (text) => `I found ${text} in the dungeon.`,
        newItemBought: (text) => `I bought ${text}.`,
        dungeonSuccess: (text) => `I successfully cleared ${text}.`,
        dungeonFailure: (text) => `I failed to finish ${text}.`,
        dungeonCriticalFailure: (text) => `I critically failed to finish ${text} and lost some skill.`,
        joinGuild: (text) => `I joined ${text}.`,
        leaveGuild: (text) => `I left ${text}.`,
        joinTown: () => `I have joined the town.`,
        leaveTown: (text) => `"I have left ${text}. A new adventure awaits!"`
    }
}
