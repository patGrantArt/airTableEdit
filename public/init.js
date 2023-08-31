//Globals
let codingData;





//initialisation function to handle responsive design within the DOM. This is called in HTML markup.
async function letsGo() {
    console.log(`we're away!`);
    update();
    listen();
}
function listen(){
    console.log(`listening`);
};

async function newItem(e){
    console.log(`creating a new item`);
    //get variables from form
    let itemName = document.getElementById('newName').value;
    console.log(itemName);
    console.log(`======== construction site =======`)
    console.log(codingData);
    let relevantCodingInfo = codingData.filter((elem) => {
      return document.getElementById('newType').value === elem[0]? true : false
    });
    console.log(relevantCodingInfo)
    let itemType = relevantCodingInfo[0][2];
    console.log(itemType);
    //create an object for the body
    let postObject = {name:itemName, type:itemType};
    console.log(postObject);
    //convert ot JSON
    let postBody = JSON.stringify(postObject)
    console.log(postBody);
    //sent post request to server
    fetch("/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: postBody
      })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

function tidyMyCodingData(obj){
  let result = []  
  obj.forEach(element => { 
    if(!element.fields.Name){return}
    result.push([element.fields.Name, element.fields.abbreviation, element.id])
  });
  return result;
}
async function update(){
  console.log(`updating`);
  let updatedData;
  await fetch("/load", {method: "GET"})
  .then((rawjson) => rawjson.json())
  .then((rawObj) => {
    updatedData = tidyMyCodingData(rawObj);
    console.log(updatedData)
  })
  codingData = updatedData
  updateForm(updatedData);
}
function updateForm(array){
  console.log(`updating the form`)
  let parentElem = document.getElementById("newType")
  //remove any existing children
  removeChildrenOf(parentElem);
  array.forEach((type)=> {
      console.log(`adding type: ${type[0]}`)
      let elem = document.createElement("option");
      elem.value = type[0];
      elem.innerText = type[0];
      parentElem.appendChild(elem);
  });

}







