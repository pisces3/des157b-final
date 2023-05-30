import {loadGLTF, loadTexture} from "./libs/loader.js";
const THREE = window.MINDAR.FACE.THREE;

(function(){

    //Variables

    //Data
    let globalData; 

    async function getData(){
    const myData = await fetch ("data.json");
    const data = await myData.json();
    globalData = data;
    createEvents();
    }
    

    //Pages
    const homePage = document.querySelector('#homepage');
    const mapPage = document.querySelector('#mappage');
    const popup = document.querySelectorAll(".popup");
    const placeinfo = document.querySelector("#placeinfo");

    //Buttons
    const startBtn = document.querySelector('#homepage .primary');
    const instructions = document.querySelector('#homepage .secondary');
    const cameras = document.querySelectorAll('.camera');
    const faceFilterSection = document.querySelector('#facefilter');
    const backMap = document.querySelector('#backMap');
    const back = document.querySelector("#back");

    //Face Filters
    const centennial = document.querySelector('#seal');
    const market = document.querySelector('#market');
    const arbs = document.querySelector('#arboretum');
    const railroad = document.querySelector('#railroad');
    const bicycle = document.querySelector('#bike');
    const eggHead = document.querySelector('#egghead');

    // Show/hide functions
    startBtn.addEventListener('click', function(){
        homePage.className = 'hidden';
        mapPage.className = 'showing';
    })

    back.addEventListener('click', function(){
      placeinfo.className = "hidden";
      mapPage.className = 'showing';
    })


    // Davis Leaflet Map
    var map = L.map('map').setView([38.544087, -121.743363],15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);  

    var centralpark = L.marker([38.5453, -121.7445]).addTo(map);
    centralpark.bindPopup(`<img src= "images/bike.png" class"popupimg" width ="100"><br><b>Central Park</b><br>5th St & B St, Davis, CA 95616<br>Home to the Davis Farmer’s Market, playgrounds, and community events.<br><button class= "primary popBTN" id="centralpark">I'm Here</button>`).openPopup();

    var bike = L.marker([38.5443, -121.7443]).addTo(map);
    bike.bindPopup(`<img src= "images/bike.png" class"popupimg" width ="100"><br><b>US Bicycling Hall of Fame</b><br>303 3rd St, Davis, CA 95616<br>Exhibiting bikes and cyclists throughout American history.<br><button class= "primary popBTN" id="bike">I'm Here</button>`).openPopup();

    var arboretum = L.marker([38.5402, -121.7417]).addTo(map);
    arboretum.bindPopup(`<img src= "images/bike.png" class"popupimg" width ="100"><br><b>Arboretum</b><br>Davis, CA 95616<br>Enjoy a walk in the arboretum along the creek and you may spot squirrels, turkeys, and ducks.<br><button class= "primary popBTN" id="arboretum">I'm Here</button>`).openPopup();

    var seal = L.marker([38.5432, -121.7406]).addTo(map);
    seal.bindPopup(`<img src= "images/seal.png" class"popupimg" width ="100"><br><b>Centennial Seal</b><br>Davis, CA 95616<br>Come learn about the history of Davis.<br><button class= "primary popBTN" id="seal">I'm Here</button>`).openPopup();

    var egghead = L.marker([38.5419, -121.7478]).addTo(map);
    egghead.bindPopup(`<img src= "images/bike.png" class"popupimg" width ="100"><br><b>Stargazer Egg Head</b><br>North Hall, 180 E Quad, Davis, CA 95616<br>One of five bronze Egghead Sculptures at UC Davis.<br><button class= "primary popBTN" id="egghead">I'm Here</button>`).openPopup();

    var amtrak = L.marker([38.5436, -121.7376]).addTo(map);
    amtrak.bindPopup(`<img src= "images/bike.png" class"popupimg" width ="100"><br><b>Southern Pacific Railroad Station</b><br>840 2nd St, Davis, CA 95616<br>Currently the Amtrak Station and historically the Southern Pacific Railroad Station.<br><button class= "primary popBTN" id="amtrak">I'm Here</button>`).openPopup();

  // Json Data 

    function createEvents(){
        const buttons = document.querySelectorAll('.popBTN');
        console.log(buttons);
    
        for (const button of buttons){
            button.addEventListener('click', function(event){
                const id = event.target.id; 
                console.log(id)
                updateInterface(id, globalData);
                placeinfo.className = "showing";
                mapPage.className = "hidden";
                console.log('clicking popbtn');
            })
        }
    }

    // <img src="images/${jsonData[value].img}" alt="${jsonData[value].alt}"></img>

    function updateInterface(value, jsonData){
        let text = '';
        text+= `<img src="images/seal.png" alt="Davis Centennial Seal" width="402" height="215">
        <h2>${jsonData[value].title}</h2>
        <p>${jsonData[value].p1}</p>
        <p>${jsonData[value].p2}</p>
        <p>${jsonData[value].p3}</p>`
        document.querySelector("#placetext").innerHTML = text;
    }

    getData();


    // Face Filter
    backMap.addEventListener('click', function(){
      console.log('clicking back to map button');
      homePage.className = 'hidden';
      faceFilterSection.className = 'hidden';
      mapPage.className = 'showing';
    });

    document.addEventListener('DOMContentLoaded', () => {
        const start = async() => {
            const mindarThree = new window.MINDAR.FACE.MindARThree({
            container: faceFilterSection,
          });
          const {renderer, scene, camera} = mindarThree;
      
          const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
          scene.add(light);
      
          //facemesh variable ; different from anchor; returned face mesh 
          const faceMesh = mindarThree.addFaceMesh();
          // const texture = await loadTexture("../../assets/facemesh/face-mask-template/Face_Mask_Template.png");
          const texture = await loadTexture("assets/bike.png");
      
          faceMesh.material.map = texture;
          faceMesh.material.transparent = true;
          faceMesh.material.needsUpdate = true;
      
          scene.add(faceMesh);
      
          await mindarThree.start();
          renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
          });
        }
        cameras.forEach((camera) => {
          camera.addEventListener('click', () => {
            faceFilterSection.className = 'showing';
            homePage.className = 'hidden';
            placeinfo.className = 'hidden';
            start();
          });
        });

        centennial.addEventListener('click', async () => {
          // const texture = await loadTexture('assets/seal.png');
          // const faceMesh = mindarThree.addFaceMesh();
          // faceMesh.material.map = texture;
          // faceMesh.material.transparent = true;
          // faceMesh.material.needsUpdate = true;
        });
    });
    
      

})();