const leaf__fall = document.querySelector('.leaf__fall');




function GetRandomPos() {
    return Math.floor(Math.random() * leaf__fall.getBoundingClientRect().width);
  }
  
function Create(particle, pos){
    particle.src = 'interface_items/petals.png' 
    particle.classList.add('leaf');
    leaf__fall.appendChild(particle);
    particle.style.left = pos + 'px';
}

function Falling_Animation(){
        const leaf = document.createElement('img');
        let leaf_count = GetRandomPos();
        Create(leaf, leaf_count)

        setTimeout(() => { leaf.remove()}, 8000);
    // //  let raw = requestAnimationFrame(Falling_Animation)
    if(document.visibilityState == "hidden")
    {
            leaf__fall.innerHTML = "";
            console.log("yep");


    }
}

    // const leafs = document.querySelectorAll('.leaf');

window.addEventListener('DOMContentLoaded', () => {

        setInterval(Falling_Animation, 1000);
    



    
});
