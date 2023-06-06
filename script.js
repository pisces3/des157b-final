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
    // createEvents();
    }
    

    //Pages
    const homePage = document.querySelector('#homepage');
    const mapPage = document.querySelector('#mappage');
    const popup = document.querySelectorAll(".popup");
    const placeinfo = document.querySelector("#placeinfo");

    //Buttons
    const startBtn = document.querySelector('#homepage .primary');
    const backHome = document.querySelector('#backHome');
    const faceCamera = document.querySelector('.camera');
    const cameras = document.querySelectorAll('.primary camera');
    const faceFilterSection = document.querySelector('#facefilter');
    const backMap = document.querySelector('#backMap');
    const back = document.querySelector("#back");

    //Face Filters
    const centennial = document.querySelector('#sealBTN');
    const market = document.querySelector('#centralparkBTN');
    const arbs = document.querySelector('#arbBTN');
    const railroad = document.querySelector('#amtrakBTN');
    const bicycle = document.querySelector('#bikeBTN');
    const eggHead = document.querySelector('#eggheadBTN');

    // Show/hide functions
    startBtn.addEventListener('click', function(){
        homePage.className = 'hidden';
        mapPage.className = 'showing';
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
      placeinfo.className = "hidden";
    })

  //   function backButton (){
  //     for (let i = 0; i < sections.length; i++) {
  //       if (sections[i].id === 'mappage') {
  //           backHome.className = 'showing';
  //         } else{
  //           backHome.className = 'hidden';
  //         }
  //   }
  // }

  //   // backButton();

    

    // Davis Leaflet Map
    var map = L.map('map').setView([38.544087, -121.743363],15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);  

    var centralpark = L.marker([38.5453, -121.7445]).addTo(map);
    centralpark.bindPopup(`<img src= "images/centralpark.png" class"popupimg" width ="180"><br><b>Central Park</b><br>5th St & B St, Davis, CA 95616<br>Home to the Davis Farmer’s Market, playgrounds, and community events.<br><button class= "primary popBTN" id="centralpark">I'm Here</button>`);

    var bike = L.marker([38.5443, -121.7443]).addTo(map);
    bike.bindPopup(`<img src= "images/bike.png" class"popupimg" width ="180"><br><b>US Bicycling Hall of Fame</b><br>303 3rd St, Davis, CA 95616<br>Exhibiting bikes and cyclists throughout American history.<br><button class= "primary popBTN" id="bike">I'm Here</button>`);

    var arboretum = L.marker([38.5402, -121.7417]).addTo(map);
    arboretum.bindPopup(`<img src= "images/arboretum.png" class"popupimg" width ="180"><br><b>Arboretum</b><br>Davis, CA 95616<br>Enjoy a walk in the arboretum along the creek and you may spot squirrels, turkeys, and ducks.<br><button class= "primary popBTN" id="arboretum">I'm Here</button>`);

    var seal = L.marker([38.5432, -121.7406]).addTo(map);
    seal.bindPopup(`<img src= "images/seal.png" class"popupimg" width ="180"><br><b>Centennial Seal</b><br>Davis, CA 95616<br>Come learn about the history of Davis.<br><button class= "primary popBTN" id="seal">I'm Here</button>`);

    var egghead = L.marker([38.5419, -121.7478]).addTo(map);
    egghead.bindPopup(`<img src= "images/egghead.png" class"popupimg" width ="180"><br><b>Stargazer Egg Head</b><br>North Hall, 180 E Quad, Davis, CA 95616<br>One of five bronze Egghead Sculptures at UC Davis.<br><button class= "primary popBTN" id="egghead">I'm Here</button>`);

    var amtrak = L.marker([38.5436, -121.7376]).addTo(map);
    amtrak.bindPopup(`<img src= "images/amtrak.png" class"popupimg" width ="180"><br><b>Southern Pacific Railroad Station</b><br>840 2nd St, Davis, CA 95616<br>Currently the Amtrak Station and historically the Southern Pacific Railroad Station.<br><button class= "primary popBTN" id="amtrak">I'm Here</button>`);

  // Json Data 

    // function createEvents(){
    //     const buttons = document.querySelectorAll('.popBTN');
    //     console.log(buttons);
    
    //     for (const button of buttons){
    //         button.addEventListener('click', function(event){
    //             const id = event.target.id; 
    //             console.log(id)
    //             updateInterface(id, globalData);
    //             placeinfo.className = "showing";
    //             mapPage.className = "hidden";
    //             mapPage.style.opacity = '0';
    //             console.log('clicking popbtn');
    //         })
    //     }
    // }

    // <img src="images/${jsonData[value].img}" alt="${jsonData[value].alt}"></img>

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

  function hideButtons() {
    // to hide any buttons that are not being used
    centennial.className = 'primary camera hidden';
    market.className = 'primary camera hidden';
    arbs.className = 'primary camera hidden';
    railroad.className = 'primary camera hidden';
    bicycle.className = 'primary camera hidden';
    eggHead.className = 'primary camera hidden';
  }

  function updateInterface(value, jsonData){

    //need to fix changing id for buttons
    let text = '';
    text+= `<img src="images/${jsonData[value].img}" alt="${jsonData[value].title}" width="402" height="215">
    <h2>${jsonData[value].title}</h2>
    <p>${jsonData[value].p1}</p>
    <p>${jsonData[value].p2}</p>
    <p>${jsonData[value].p3}</p>`
    // <button class='primary camera' id=${jsonData[value].filter}>Launch Face Filter</button>
    document.querySelector("#placetext").innerHTML = text;
    hideButtons();

    //changes which button is showing depending on what content is seen
    if (jsonData[value].filter == 'seal') {
      centennial.className = 'primary camera showing';
    }
    else if (jsonData[value].filter == 'bike') {
      bicycle.className = 'primary camera showing';
    }
    else if (jsonData[value].filter == 'centralpark') {
      market.className = 'primary camera showing';
    }
    else if (jsonData[value].filter == 'egghead') {
      eggHead.className = 'primary camera showing';
    }
    else if (jsonData[value].filter == 'amtrak') {
      railroad.className = 'primary camera showing';
    }
    else if (jsonData[value].filter == 'arboretum') {
      arbs.className = 'primary camera showing';
    }

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

    const capture = (mindarThree) => {
      const {video, renderer, scene, camera } = mindarThree;
      const renderCanvas = renderer.domElement;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext('2d');
      canvas.width = renderCanvas.width;
      canvas.height = renderCanvas.height;

      const sx = (video.clientWidth - renderCanvas.clientWidth) / 2 * video.videoWidth / video.clientWidth;
      const sy = (video.clientHeight - renderCanvas.clientHeight) / 2 * video.videoHeight / video.clientHeight;
      const sw = video.videoWidth - sx * 2; 
      const sh = video.videoHeight - sy * 2; 

      context.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      renderer.preserveDrawingBuffer = true;
      renderer.render(scene, camera); // empty if not run
      context.drawImage(renderCanvas, 0, 0, canvas.width, canvas.height);
      renderer.preserveDrawingBuffer = false;

      const data = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'photo.png';
      link.href = data;
      link.click();
    }

    document.addEventListener('DOMContentLoaded', async () => {
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
        document.querySelector("#capture").addEventListener("click", () => {
          capture(mindarThree);
        });
    
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

      if (centennial.className = 'primary camera showing') {
          //change centennial seal filter
          centennial.addEventListener('click', async () => {
          console.log('clicking seal');
          texture = await loadTexture('assets/seal.png');
          console.log(texture);
          faceMesh.material.map = texture;
          faceMesh.material.needsUpdate = true;
        });
      }
      if (market.className = 'primary camera showing') {
          //change farmers market seal filter
          market.addEventListener('click', async () => {
          console.log('clicking market');
          texture = await loadTexture('assets/market.png');
          console.log(texture);
          faceMesh.material.map = texture;
          faceMesh.material.needsUpdate = true;
        });
      }
      if (railroad.className = 'primary camera showing') {
              //change farmers market seal filter
        railroad.addEventListener('click', async () => {
          console.log('clicking railroad');
          texture = await loadTexture('assets/railroad.png');
          console.log(texture);
          faceMesh.material.map = texture;
          faceMesh.material.needsUpdate = true;
        });
      }

      if (bicycle.className = 'primary camera showing') {
         //change bicycle seal filter
          bicycle.addEventListener('click', async () => {
          console.log('clicking market');
          texture = await loadTexture('assets/bike.png');
          console.log(texture);
          faceMesh.material.map = texture;
          faceMesh.material.needsUpdate = true;
        });
      }
      if (eggHead.className = 'primary camera showing') {
         //change bicycle seal filter
          eggHead.addEventListener('click', async () => {
          console.log('clicking market');
          texture = await loadTexture('assets/egghead.png');
          console.log(texture);
          faceMesh.material.map = texture;
          faceMesh.material.needsUpdate = true;
        });
      }
      else {
        faceMesh.material.map = null;
        faceMesh.material.needsUpdate = true;
      }
     

    });
    
      

})();