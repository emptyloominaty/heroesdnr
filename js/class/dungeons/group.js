class Group { //IDK
    leaderId = 0
    heroes = []
    destination = {x:0, y:0}


    checkMembersLocation() {
        let a = 0
        for (let i = 0; i<heroes.length; i++) {
            if (getDistance({x:heroes.location.x,y:heroes.location.y},{x:destination.x,y:destination.y})<10) {
                a++
            }
        }
        return a === heroes.length
    }

    startDungeon() {

    }



}