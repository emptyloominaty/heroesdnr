
let open_settings = function (btn_el = undefined, reload = false, update = false) {
    let windowId = 9
    let dontClose = false
    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Settings", windowId,btn_el)
    }

    if (currentWindow[windowId] === "settings" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "settings"

    let settingsList = [
        {name:"Gameplay",settingKey:"",options:[],category:true},
        {name:"Speed Mode",settingKey:"gameSpeedMode",options:[{name:"Performance",val:"Performance"},{name:"Precise",val:"Precise"}]},
        {name:"Max Hero Log Size",settingKey:"maxLogSize",options:[],rangeMin:50,rangeMax:200,rangeStep:10,range:true,digits:0},
        {name:"Max Dungeon Log Size",settingKey:"maxLogSizeDungeons",options:[],rangeMin:50,rangeMax:1000,rangeStep:50,range:true,digits:0},
        {name:"Max Dead Heroes Size",settingKey:"maxLogSizeDeadCharacters",options:[],rangeMin:100,rangeMax:1000,rangeStep:100,range:true,digits:0},
        {name:"Max Inactive Heroes Size",settingKey:"maxSizeInactiveHeroes",options:[],rangeMin:100,rangeMax:1000,rangeStep:100,range:true,digits:0},

        {name:"Interface",settingKey:"",options:[],category:true},
        {name:"Debug Speed Modes",settingKey:"debugSpeeds",options:[{name:"Off",val:false},{name:"On",val:true}]},
        {name:"Show Hero Names (DONT)",settingKey:"drawHeroNames",options:[{name:"Off",val:false},{name:"On",val:true}]},

        {name:"Graphics",settingKey:"",options:[],category:true},
        {name: "Particle Visuals", settingKey: "particleVisuals", options: [{name: "Off", val: 0}, {name: "Low", val: 1}, {name: "Medium", val: 2}, {name: "High", val: 3}]},
        //particleGlow
        //particleTimer???
        {name:"Terrain",settingKey:"terrain",options:[{name:"Off",val:0},{name:"Very Low",val:1},{name:"Low",val:2},{name:"High",val:3}]},
        {name:"Lights",settingKey:"lights",options:[{name:"Off",val:false},{name:"On",val:true}]},
        {name:"Shadows",settingKey:"shadows",options:[{name:"Off",val:0},{name:"Low",val:1},{name:"High",val:2}]},
    ]




    let html = ""

    for (let i = 0; i<settingsList.length; i++) {
        let classes = "window_settings_flex "
        if (settingsList[i].category) {
            classes += "window_settings_category "
        }
        if (i === 0) {
            classes +="window_settings_category_first "
        }

        html += "<div class='"+classes+"'> <span>"+settingsList[i].name+"</span> <div>"

        if (settingsList[i].range) {
            html += "<div><input type='range' onchange='settings[\""+settingsList[i].settingKey+"\"] = Number(this.value); open_settings(undefined,true);settingsUpdate();' step='"+settingsList[i].rangeStep+"' value='"+settings[settingsList[i].settingKey]+"' min='"+settingsList[i].rangeMin+"' max='"+settingsList[i].rangeMax+"' >" +
                "<span>"+settings[settingsList[i].settingKey].toFixed(settingsList[i].digits)+"</span></div>"
        }

        for (let j = 0; j<settingsList[i].options.length; j++) {
            let option = settingsList[i].options[j]
            let val = option.val
            let classes = "window_settings_button "

            if (val==settings[settingsList[i].settingKey]) {
                classes += "window_settings_button_true"
            }

            if (typeof(val) === typeof(String())) {
                val = "\""+val+"\""
            }

            html+= "<button class='"+classes+"' onclick='settings[\""+settingsList[i].settingKey+"\"] = "+val+"; open_settings(undefined,true);settingsUpdate();'>"+option.name+"</button>"
        }

        html +="</div></div>"
    }


    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}
