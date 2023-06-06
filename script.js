import {loadGLTF, loadTexture} from "./libs/loader.js";
const THREE = window.MINDAR.FACE.THREE;

(function(){

  // alert('Hello, fellow tester! Welcome to Davis Destinations! \r Here, you’ll get to learn more about the different places around Davis and know more about their history. \r Here are some tasks we prepared for you: \r1. Click the start here button \r2. Go to map and click on the Centennial Seal Pop up\r3. Click “I’m Here" Learn more about the detailed history of each Davis Destination and launch the face filter')

    //Variables

    //Data
    let globalData; 

    async function getData(){
    const myData = await fetch ("data.json");
    const data = await myData.json();
    globalData = data;
    // createEvents();
    }
    

    //Pages
    const homePage = document.querySelector('#homepage');
    const mapPage = document.querySelector('#mappage');
    const popup = document.querySelectorAll(".popup");
    const placeinfo = document.querySelector("#placeinfo");

    //Buttons
    const startBtn = document.querySelector('#homepage .primary');
    // const backHome = document.querySelector('#backHome')
    const faceCamera = document.querySelector('.camera');
    const cameras = document.querySelectorAll('.primary camera');
    const faceFilterSection = document.querySelector('#facefilter');
    const backMap = document.querySelector('#backMap');
    const back = document.querySelector("#back");

    //Face Filters
    //Laura – Added BTN because other buttons are using these ids on their own
    const centennial = document.querySelector('#sealBTN');
    const market = document.querySelector('#centralparkBTN');
    const arbs = document.querySelector('#arbBTN');
    const railroad = document.querySelector('#amtrakBTN');
    const bicycle = document.querySelector('#bikeBTN');
    const eggHead = document.querySelector('#eggheadBTN');

    // Show/hide functions
    startBtn.addEventListener('click', function(){
        homePage.className = 'hidden';
        mapPage.style.opacity = '1';
    })

    back.addEventListener('click', function(){
      placeinfo.className = "hidden";
      mapPage.className = 'showing';
      mapPage.style.opacity = '1';
    })

    backHome.addEventListener('click', function(){
      homePage.className = 'showing';
      mapPage.style.opacity = '0';
    });


    // Davis Leaflet Map
    var map = L.map('map').setView([38.544087, -121.743363],15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);  

    var centralpark = L.marker([38.5453, -121.7445]).addTo(map);
    centralpark.bindPopup(`<img src= "images/centralpark.png" class"popupimg" width ="180"><br><b>Central Park</b><br><i>5th St & B St, Davis, CA 95616</i><br>Home to the Davis Farmer’s Market, playgrounds, and community events.<br><button class= "primary popBTN" id="centralpark">I'm Here</button>`);

    var bike = L.marker([38.5443, -121.7443]).addTo(map);
    bike.bindPopup(`<img src= "images/bike.png" class"popupimg" width ="180"><br><b>US Bicycling Hall of Fame</b><br><i>303 3rd St, Davis, CA 95616</i><br>Exhibiting bikes and cyclists throughout American history.<br><button class= "primary popBTN" id="bike">I'm Here</button>`);

    var arboretum = L.marker([38.5402, -121.7417]).addTo(map);
    arboretum.bindPopup(`<img src= "images/arboretum.png" class"popupimg" width ="180"><br><b>Arboretum</b><br><i>Davis, CA 95616</i><br>Enjoy a walk in the arboretum along the creek and you may spot squirrels, turkeys, and ducks.<br><button class= "primary popBTN" id="arboretum">I'm Here</button>`);

    var seal = L.marker([38.5432, -121.7406]).addTo(map);
    seal.bindPopup(`<img src= "images/seal.png" class"popupimg" width ="180"><br><b>Centennial Seal</b><br><i>610 2nd St, Davis, CA 95616</i><br>Come learn about the history of Davis.<br><button class= "primary popBTN" id="seal">I'm Here</button>`);

    var egghead = L.marker([38.5419, -121.7478]).addTo(map);
    egghead.bindPopup(`<img src= "images/egghead.png" class"popupimg" width ="180"><br><b>Stargazer Egg Head</b><br><i>North Hall, 180 E Quad, Davis, CA 95616</i><br>One of five bronze Egghead Sculptures at UC Davis.<br><button class= "primary popBTN" id="egghead">I'm Here</button>`);

    var amtrak = L.marker([38.5436, -121.7376]).addTo(map);
    amtrak.bindPopup(`<img src= "images/amtrak.png" class"popupimg" width ="180"><br><b>Southern Pacific Railroad Station</b><br><i>840 2nd St, Davis, CA 95616</i><br>Currently the Amtrak Station and historically the Southern Pacific Railroad Station.<br><button class= "primary popBTN" id="amtrak">I'm Here</button>`);

  // Json Data 

   // from glenda: use event delegation (adding a click listener to the document and then checking what was clicked on) bc the popBTNs are not in the DOM until the marker is clicked. I found this out by using "inspect" and watching the DOM elements change. I can explain more when we talk next.
   document.addEventListener('click', function(event){
    // console.log(event.target.className);
    if(event.target.className == 'primary popBTN'){
      // console.log(event.target.id);
      updateInterface(event.target.id, globalData);
      placeinfo.className = "showing";
      mapPage.className = "hidden";
      mapPage.style.opacity = '0';
    }
  })

  function updateInterface(value, jsonData){

    //need to fix changing id for buttons
    //Laura 6/5 – adds correct button but not getting it in the DOM
    let text = '';
    text+= `<img src='images/${jsonData[value].img}' alt="${jsonData[value].title}" width="402" height="215">
    <h2>${jsonData[value].title}</h2>
    <p>${jsonData[value].p1}</p>
    <p>${jsonData[value].p2}</p>
    <p>${jsonData[value].p3}</p>
    <button class='primary camera' id=${jsonData[value].filter}BTN>Launch Face Filter</button>`
    document.querySelector("#placetext").innerHTML = text;
}

    getData();


    // Face Filter
    backMap.addEventListener('click', function(){
      // console.log('clicking back to map button');
      homePage.className = 'hidden';
      faceFilterSection.className = 'hidden';
      mapPage.className = 'showing';
      mapPage.style.opacity = '1';

    });

    document.addEventListener('DOMContentLoaded', () => {
      let mindarThree;
      let texture;
      let faceMesh;
    
      const start = async () => {
        mindarThree = new window.MINDAR.FACE.MindARThree({
          container: faceFilterSection,
        });
        const { renderer, scene, camera } = mindarThree;
    
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
    
        faceMesh = mindarThree.addFaceMesh();
        texture = await loadTexture("assets/bike.png");
    
        faceMesh.material.transparent = true;
        faceMesh.material.needsUpdate = true;
    
        scene.add(faceMesh);
    
        await mindarThree.start();
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      };

      document.addEventListener('click', (event) => {
        if (event.target.classList.contains('camera')) {
          console.log('clicking face camera');
          faceFilterSection.className = 'showing';
          homePage.className = 'hidden';
          placeinfo.className = 'hidden';
          start();
        }
      });

        // faceCamera.addEventListener('click', () => {
        //   console.log('clicking face camera');
        //   faceFilterSection.className = 'showing';
        //   homePage.className = 'hidden';
        //   placeinfo.className = 'hidden';
        //   start();
        // });
    
      // cameras.forEach((camera) => {
      //   camera.addEventListener('click', () => {
      //     faceFilterSection.className = 'showing';
      //     homePage.className = 'hidden';
      //     placeinfo.className = 'hidden';
      //     start();
      //   });
      // });

      

      //change centennial seal filter
      centennial.addEventListener('click', async () => {
        console.log('clicking seal');
        texture = await loadTexture('assets/seal.png');
        console.log(texture);
        faceMesh.material.map = texture;
        faceMesh.material.needsUpdate = true;
      });

      //change farmers market seal filter
      market.addEventListener('click', async () => {
        console.log('clicking market');
        texture = await loadTexture('assets/market.png');
        console.log(texture);
        faceMesh.material.map = texture;
        faceMesh.material.needsUpdate = true;
      });

      //change farmers market seal filter
      railroad.addEventListener('click', async () => {
        console.log('clicking market');
        texture = await loadTexture('assets/railroad.png');
        console.log(texture);
        faceMesh.material.map = texture;
        faceMesh.material.needsUpdate = true;
      });

      //change bicycle seal filter
      bicycle.addEventListener('click', async () => {
        console.log('clicking market');
        texture = await loadTexture('assets/bike.png');
        console.log(texture);
        faceMesh.material.map = texture;
        faceMesh.material.needsUpdate = true;
      });

      //change egghead filter
      eggHead.addEventListener('click', async () => {
        console.log('clicking market');
        texture = await loadTexture('assets/egghead.png');
        console.log(texture);
        faceMesh.material.map = texture;
        faceMesh.material.needsUpdate = true;
      });

    });
    
      

})();