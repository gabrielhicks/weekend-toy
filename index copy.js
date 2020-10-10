let addToy = false;
const toysURL = "http://localhost:3000/toys/"
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

//////////////////our code lives here///////////////////
// Fetch Andy's Toys
function fetchToys() {
/// "getting" the toys from our db.json file to the left
    fetch(toysURL)
  // we are receiving a promise, and "parsing" the promise to JSON format
    .then(resp => resp.json())
    // saving the JSON response to an object "toys", and passing it to our function
    .then(toys => addToys(toys))
}

    // this function will show each toy and display it inside the HTML tags
    // we are making below/inside
    function addToys(toys) {
      // for each toy inside the hash of toys
        toys.forEach(toy => {
        console.log(toy);
        
        
        // finding where we want to show the toys with the HTML we are creating
        // # == id // . == class
        const toyContainer = document.getElementById("toy-collection")
        
        //creating HTML tags/elements
        //adding text inside the HTML elements we created from our toys
        let newDiv = document.createElement('div')
        newDiv.classList = ('card')
        newDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar">
        <p>Likes: ${toy.likes} </p>
        <button class="like-btn">Like <3</button>
        `

        // append div to the toy container
        toyContainer.appendChild(newDiv)
      })
    }



    const submitHandler = () => {
      const form = document.querySelector('.add-toy-form')
        form.addEventListener('submit', e => {
          e.preventDefault()
          let input = e.target

          const newToy = { 
            name: input.name.value, 
            image: input.image.value, 
            likes: 0 
          }

          form.reset() 

          let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(newToy)
          }
          

          fetch(toysURL, options)
            .then(resp => resp.json())
            .then(thisToy => addToys(thisToy))
          
        })
    }
    fetchToys();
    submitHandler();

})
