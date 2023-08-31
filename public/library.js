// === UTILITY LIBRARY ===

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


// convertPXL(arg) -  converts number to a string "calc(var(--scale)*ARGpx" OR converts string to an integer
function checkRadio(idString){
    console.log(`checking radio button ${idString}`);
    let radio = document.getElementById(idString);
    console.log(radio);
    if (radio.checked){
        console.log(`checked!`);
        return true
    } 
    return false
}
function convertPXL(arg){
    //console.log(`converting pixels`)
    if (typeof(arg) === "string"){
        let regx = /-?\d+/;
        let thisArray = arg.match(regx);
        let thisNum = thisArray[0];
        //console.log(`returning ${typeof(thisNum)}... ${thisNum}`);
        return thisNum
    }
    if (typeof(arg) === "number"){
        return `calc(var(--scale)*${arg}px)`
    }
}
function getNumFromString(string){
    console.log(`getting num from ${string}`)
    let regx = /-\d+/;
    let thisArray = string.match(regx);
    console.log(thisArray)
    let thisNum = thisArray[0];
    console.log(`returning ${thisNum}`)
    return Number(thisNum)

}
//shifts background image in a direction (arg 1) a specified number of pixels (arg 2)
function moveMap(index){
    let route = routes[index];
    //console.log(route)
    let mapX = route.mapX;
    //console.log(`map y to ${mapX}`);
    let mapY = route.mapY
    //console.log(`map y to ${mapY}`)
    let map = document.getElementById('map');
    map.style.backgroundPositionX = convertPXL(mapX);
    map.style.backgroundPositionY = convertPXL(mapY);
}
function moveMap1px(direction){
    let styles = getComputedStyle(background)
    //console.log(background);
    //console.log(styles.backgroundPositionX);
    let currentXpos = styles.backgroundPositionX;
    //console.log(currentXpos);
    //console.log(typeof(currentXpos));
    let incriment = number*scale;
    //console.log(incriment);
    let xPosNumber = getNumFromString(currentXpos);
    //console.log(xPosNumber);
    //console.log(xPosNumber+incriment);
    if(direction === "L"){     
        background.style.backgroundPositionX = xPosNumber-incriment+"px";
    }
    if(direction === "R"){        
        background.style.backgroundPositionX = xPosNumber+incriment+"px";
    }

}
function pauseFor(aLilBit) {
    return new Promise(resolve => setTimeout(resolve, aLilBit));
}
function removeChildrenOf(parentElem){
    while (parentElem.firstChild) {
        parentElem.removeChild(parentElem.lastChild);
    }
}
function starString(stars) {
    let result = "";
    if(stars<1){return result}
    if(stars>4) {console.error(`something screwy in the stars of thiis route`)} 
    for(let i=stars; i>0; i--){
        result = result+"*";
    }  
    return result  
}

