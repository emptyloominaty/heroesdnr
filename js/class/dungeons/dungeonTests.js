
let testDungeon = function () {
    for (let i = 1; i < 100; i++) {
        let dCh = 0
        let cfCh = 0
        let dCh2 = 0
        let cfCh2 = 0
        let sCh = 0
        let sCh2 = 0
        let j = 0
        for (j = 0; j <= 50; j++) {
            let hero = new Hero("", 20, i, 100, "Warrior", "dps", {x: 0, y: 0}, false, true)

            Object.keys(hero.slots).forEach(key => {
                hero.slots[key] = new Item(key, i, 1)
            })
            hero.updateItems()


            let c = dungeonControllers[0].startDungeon([hero], hero)

            let dCh3 = 0
            let cfCh3 = 0
            let sCh3 = 0

            for (let a = 0; a < c.length; a++) {
                sCh3 += c[a].chances.success
                dCh3 += c[a].chances.death
                cfCh3 += c[a].chances.criticalFailure
            }
            sCh2 += sCh3 / c.length
            dCh2 += dCh3 / c.length
            cfCh2 += cfCh3 / c.length
        }
        sCh = sCh2 / j
        dCh = dCh2 / j
        cfCh = cfCh2 / j

        let text = i + ": " + Math.round(sCh) + " / " + Math.round(cfCh) + " / " + Math.round(dCh)
        console.log(text)
    }
}


let testDungeonSoloCsv = function () {
    const rowsByIlvl = []
    const headerRow = ["lvl"]
    for (let i = 5; i < 100; i += 5) {
        rowsByIlvl.push([i])
    }

    Object.keys(heroesConfig).forEach(className => {
        Object.keys(heroesConfig[className]).forEach(specName => {
            headerRow.push(`${className}-${specName.charAt(0).toUpperCase()}`)
            for (let i = 5; i < 100; i += 5) {
                let dCh = 0, cfCh = 0, sCh = 0
                for (let j = 0; j <= 50; j++) {
                    let hero = new Hero("", 20, i, 100, className, specName, {x: 0, y: 0}, false, true)
                    Object.keys(hero.slots).forEach(key => {
                        hero.slots[key] = new Item(key, i, 1)
                    })
                    hero.updateItems()

                    let c = dungeonControllers[0].startDungeon([hero], hero)
                    let sCh3 = 0, dCh3 = 0, cfCh3 = 0
                    for (let a = 0; a < c.length; a++) {
                        sCh3 += c[a].chances.success
                        dCh3 += c[a].chances.death
                        cfCh3 += c[a].chances.criticalFailure
                    }
                    sCh += sCh3 / c.length
                    dCh += dCh3 / c.length
                    cfCh += cfCh3 / c.length
                }
                const avgSuccess = Math.round(sCh / 51)
                const avgCritFail = Math.round(cfCh / 51)
                const avgDeath = Math.round(dCh / 51)

                const rowIndex = i / 5 - 1
                rowsByIlvl[rowIndex].push(avgSuccess)
            }
        })
    })

    const csvData = [headerRow, ...rowsByIlvl]

    const csvContent = csvData.map(row => {
        return row.map(cell => {
            const str = String(cell);
            const escaped = str.replace(/"/g, '""')
            return `"${escaped}"`
        }).join(";")
    }).join("\n")

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "dungeon_results.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

}




function getPercentiles(values, percentiles) {
    values.sort((a, b) => a - b);
    const result = {};
    for (const p of percentiles) {
        const index = Math.floor(p / 100 * (values.length - 1));
        result[p] = values[index];
    }
    return result;
}

function getAllByRole(role) {
    const result = [];
    for (const className in heroesConfig) {
        for (const specName in heroesConfig[className]) {
            if (specName === role) {
                result.push({className, specName});
            }
        }
    }
    return result;
}

function getAllDpsTriplets() {
    const pool = getAllByRole("dps");
    const triplets = [];
    const n = pool.length;

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            for (let k = j; k < n; k++) {
                triplets.push([pool[i], pool[j], pool[k]]);
            }
        }
    }
    return triplets;
}

let testDungeonAverageAllGroupsCsv = function () {
    const tanks = getAllByRole("tank");
    const healers = getAllByRole("healer");
    const dpsTriplets = getAllDpsTriplets();

    const header = ["Level", "Avg Success", "Avg CritFail", "Avg Death"];
    const rows = [header];

    for (let level = 5; level < 100; level += 5) {
        let totalSuccess = 0;
        let totalCritFail = 0;
        let totalDeath = 0;
        let groupCount = 0;

        for (const tank of tanks) {
            for (const healer of healers) {
                for (const dpses of dpsTriplets) {
                    const groupDefs = [tank, healer, ...dpses];

                    const group = groupDefs.map(role => {
                        const hero = new Hero("", 20, level, 100, role.className, role.specName, {x: 0, y: 0}, false, true);
                        Object.keys(hero.slots).forEach(key => {
                            hero.slots[key] = new Item(key, level, 1);
                        });
                        hero.updateItems();
                        return hero;
                    });

                    const result = dungeonControllers[0].startDungeon(group, group[0]);
                    let sCh = 0, dCh = 0, cfCh = 0;
                    for (let a = 0; a < result.length; a++) {
                        sCh += result[a].chances.success;
                        dCh += result[a].chances.death;
                        cfCh += result[a].chances.criticalFailure;
                    }

                    totalSuccess += sCh / result.length;
                    totalCritFail += cfCh / result.length;
                    totalDeath += dCh / result.length;
                    groupCount++;
                }
            }
        }

        const avgSuccess = Math.round(totalSuccess / groupCount);
        const avgCritFail = Math.round(totalCritFail / groupCount);
        const avgDeath = Math.round(totalDeath / groupCount);

        rows.push([level, avgSuccess, avgCritFail, avgDeath]);
    }

    const csvContent = rows.map(row =>
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(";")
    ).join("\n");

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dungeon_avg_all_groups.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

let testDungeonPercentilesCsv = function () {
    const tanks = getAllByRole("tank");
    const healers = getAllByRole("healer");
    const dpsTriplets = getAllDpsTriplets();

    const percentilesToCompute = [1, 5, 10, 25, 50, 75, 90, 95, 99];
    const header = ["Level", ...percentilesToCompute.map(p => `P${p}`)];
    const rows = [header];

    for (let level = 5; level < 101; level += 5) {
        const successRates = [];

        for (const tank of tanks) {
            for (const healer of healers) {
                for (const dpses of dpsTriplets) {
                    const groupDefs = [tank, healer, ...dpses];

                    const group = groupDefs.map(role => {
                        const hero = new Hero("", 20, level, 100, role.className, role.specName, {x: 0, y: 0}, false, true);
                        Object.keys(hero.slots).forEach(key => {
                            hero.slots[key] = new Item(key, level, 1);
                        });
                        hero.updateItems();
                        return hero;
                    });

                    const result = dungeonControllers[0].startDungeon(group, group[0]);
                    let sCh = 0;
                    for (let a = 0; a < result.length; a++) {
                        sCh += result[a].chances.success;
                    }
                    const avgSuccess = sCh / result.length;
                    successRates.push(avgSuccess);
                }
            }
        }

        const percentiles = getPercentiles(successRates, percentilesToCompute);
        const row = [level, ...percentilesToCompute.map(p =>
            (Math.round(percentiles[p] * 10) / 10).toFixed(1).replace('.', ',')
        )];
        rows.push(row);
    }

    const csvContent = rows.map(row =>
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(";")
    ).join("\n");

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dungeon_success_percentiles.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};


function getPercentiles(values, percentiles) {
    values.sort((a, b) => a - b);
    const result = {};
    for (const p of percentiles) {
        const index = Math.floor(p / 100 * (values.length - 1));
        result[p] = values[index];
    }
    return result;
}

let testSpecDungeonPercentilesCsv = function () {
    const tanks = getAllByRole("tank");
    const healers = getAllByRole("healer");
    const dpsTriplets = getAllDpsTriplets();

    const percentilesToCompute = [1, 5, 10, 25, 50, 75, 90, 95, 99];
    const header = ["Level", "ClassSpec", ...percentilesToCompute.map(p => `P${p}`)];
    const rows = [header];

    for (let level = 5; level < 101; level += 5) {
        const specSuccessRates = {};

        for (const tank of tanks) {
            for (const healer of healers) {
                for (const dpses of dpsTriplets) {
                    const groupDefs = [tank, healer, ...dpses];

                    const group = groupDefs.map(role => {
                        const hero = new Hero("", 20, level, 100, role.className, role.specName, {x: 0, y: 0}, false, true);
                        Object.keys(hero.slots).forEach(key => {
                            hero.slots[key] = new Item(key, level, 1);
                        });
                        hero.updateItems();
                        return hero;
                    });

                    const result = dungeonControllers[0].startDungeon(group, group[0]);
                    let sCh = 0;
                    for (let a = 0; a < result.length; a++) {
                        sCh += result[a].chances.success;
                    }
                    const avgSuccess = sCh / result.length;

                    for (const hero of group) {
                        const key = `${hero.characterClass} [${hero.characterSpec}]`;
                        if (!specSuccessRates[key]) {
                            specSuccessRates[key] = [];
                        }
                        specSuccessRates[key].push(avgSuccess);
                    }
                }
            }
        }

        for (const [spec, values] of Object.entries(specSuccessRates)) {
            const percentiles = getPercentiles(values, percentilesToCompute);
            const row = [level, spec, ...percentilesToCompute.map(p =>
                (Math.round(percentiles[p] * 10) / 10).toFixed(1).replace('.', ',')
            )];
            rows.push(row);
        }
    }
    const roleOrder = {tank: 0, healer: 1, dps: 2};

    const dataRows = rows.slice(1);

    dataRows.sort((a, b) => {
        const levelA = parseInt(a[0], 10);
        const levelB = parseInt(b[0], 10);
        if (levelA !== levelB) return levelA - levelB;

        const roleA = a[1].match(/\[(.*?)\]/)[1];
        const roleB = b[1].match(/\[(.*?)\]/)[1];
        return roleOrder[roleA] - roleOrder[roleB];
    });

    rows.splice(1, rows.length - 1, ...dataRows);

    const csvContent = rows.map(row =>
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(";")
    ).join("\n");

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "spec_dungeon_success_percentiles.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

function getPercentiles(values, percentiles) {
    values.sort((a, b) => a - b);
    const result = {};
    for (const p of percentiles) {
        const index = Math.floor(p / 100 * (values.length - 1));
        result[p] = values[index];
    }
    return result;
}