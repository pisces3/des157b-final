import {loadGLTF, loadTexture} from "/libs/loader.js";
const THREE = window.MINDAR.FACE.THREE;

(function(){

    //Variables

    //Pages
    const homePage = document.querySelector('#homepage');
    const mapPage = document.querySelector('#mappage');
    const popup = document.querySelectorAll(".popup")

    //Buttons
    const startBtn = document.querySelector('#homepage .primary');
    const instructions = document.querySelector('#homepage .secondary');
    const camera = document.querySelector('#camera');
    const faceFilterSection = document.querySelector('#facefilter');
    const backMap = document.querySelector('#backMap');

    // Show/hide functions
    startBtn.addEventListener('click', function(){
        homePage.className = 'hidden';
        mapPage.className = 'showing';
    })

    // Davis Leaflet Map
    var map = L.map('map').setView([38.544087, -121.743363],15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);  

    var centralpark = L.marker([38.5453, -121.7445]).addTo(map);

    centralpark.bindPopup("<b>Central Park</b><br>Community park and home of the Farmer's Market<br><a href='https://goo.gl/maps/g8gvunNGbCxnTUy39?coh=178571&entry=tt' target='blank'>Directions</a>").openPopup();


    // var bike = L.marker([38.5443, -121.7443]).addTo(map);

    // var arb = L.marker([38.5402, -121.7417]).addTo(map);

    // var seal = L.marker([38.5432, -121.7406]).addTo(map);

    // var egghead = L.marker([38.5419, -121.7478]).addTo(map);

    // var train = L.marker([38.5436, -121.7376]).addTo(map);

  // Json Data 

  // let globalData; 
    
  //   async function getData(){
  //   const myData = await fetch ("data.json");
  //   const data = await myData.json();
  //   globalData = data;
  //   const dayimg = document.querySelector("#dayimg");
  //   document.querySelector("#daybutton").innerHTML = createButton(data);
  //   createEvents();
  //   }


  //   function createButton(data){
  //       let htmlButton = ""
  //       const dataPoints = Object.keys(data);
  //       console.log(dataPoints);
  //       dataPoints.forEach(function(eachPoint){
  //           htmlButton += `<button id="${eachPoint}">${eachPoint}</button>`;
  //       });
  //       return htmlButton;
  //   }

  //   function createEvents(){
  //       const buttons = document.querySelectorAll('button');
    
  //       for (const button of buttons){
  //           button.addEventListener('click', function(event){
  //               const id = event.target.id; 
  //               console.log(id)
  //               updateInterface(id, globalData);
  //           })
  //       }
  //   }

  //   function updateInterface(value, jsonData){
  //       let text = '';
  //       text+= `<h2>${jsonData[value].date}</h2>
  //       <p>${jsonData[value].time}</p>
  //       <img src="images/${jsonData[value].img}" alt="${jsonData[value].alt}">
  //       <p>${jsonData[value].location}</p>`
    
  //       document.querySelector('#dayimg').innerHTML = text;
  //   }

  //   getData();



    // Face Filter
    backMap.addEventListener('click', function(){
      homePage.className = 'showing';
      faceFilterSection.className = 'hidden';
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
          const texture = await loadTexture("/assets/test.PNG");
      
          faceMesh.material.map = texture;
          faceMesh.material.transparent = true;
          faceMesh.material.needsUpdate = true;
      
          scene.add(faceMesh);
      
          await mindarThree.start();
          renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
          });
        }
        camera.addEventListener('click', () => {
            faceFilterSection.className = 'showing';
            homePage.className = 'hidden';
            start();
          });
    });
    
      

})();