import { loadTexture } from "./libs/loader";

let mindarThree;
let texture;
let faceMesh;


//Click handlers
function centennialClickHandler() {
    console.log('clicking seal');
    removeEventListeners();
    texture = loadTexture('assets/seal.png');
    if (faceMesh) {
      faceMesh.material.map = texture;
      faceMesh.material.needsUpdate = true;
    }
  }
  
  function marketClickHandler() {
    console.log('clicking market');
    removeEventListeners();
    texture = loadTexture('assets/market.png');
    if (faceMesh) {
      faceMesh.material.map = texture;
      faceMesh.material.needsUpdate = true;
    }
  }
  


//directly from the udemy course
document.addEventListener('DOMContentLoaded', async() =>  {

    // start function
    const start = async () => {
        mindarThree = new window.MINDAR.FACE.MindARThree({
            container: faceFilterSection,
        });
        const {renderer, scene, camera} = mindarThree;

        const light = new mindarThree.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        //adding face filter
        faceMesh = mindarThree.addFaceMesh();
        faceMesh.material.transparent = true;
        faceMesh.material.needsUpdate = true;

        scene.add(faceMesh);
        document.querySelector('#capture').addEventListener('click', () => {
            capture(mindarThree);
        });

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    //opening the camera
    


})