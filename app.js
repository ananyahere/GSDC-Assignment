gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.section').forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    pin: true,
    pinSpacing: false
  });
});

// Sliding Functionality!

let i_img=0;
let j_img=3;
let i_card=0;
let j_card=4;

const nextBtnImg = document.querySelector('#next-img')
const prevBtnImg = document.querySelector('#prev-img')
const nextBtnCard = document.querySelector('#next-user')
const prevBtnCard = document.querySelector('#prev-user')
const fetchUserBtn = document.querySelector('.fetchUserBtn')
const fetchImgBtn = document.querySelector('.fetchImgBtn')
let userCardContainer = document.querySelector('.userCard-container')
let imageContainer = document.querySelector('.image-container')

// functions
const nextImg = () => {
  document.getElementById(`content${i_img+1}`).classList.remove("img-active")
  i_img = (j_img+i_img+1) % j_img
  document.getElementById(`content${i_img+1}`).classList.add("img-active")
}

const prevImg = () => {
  console.log('prev')
  document.getElementById(`content${i_img+1}`).classList.remove("img-active")
  i_img=(j_img+i_img-1)%j_img;
  document.getElementById(`content${i_img+1}`).classList.add("img-active")
}

const nextCard = () => {
  document.getElementById(`card${i_card+1}`).classList.remove("card-active")
  i_card = (j_card+i_card+1) % j_card
  document.getElementById(`card${i_card+1}`).classList.add("card-active")
}

const prevCard = () => {
  document.getElementById(`card${i_card+1}`).classList.remove("card-active")
  i_card = (j_card+i_card-1) % j_card;
  document.getElementById(`card${i_card+1}`).classList.add("card-active")
}

const getUsers = async () => {
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    j_card = data.length
    console.log(data)
    formatUserData(data)
  }catch(e){
    console.log(e)
  }
}

const getImages = async () => {
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    const data = await response.json()
    j_img=data.length
    formateImageData(data)
  }catch(e){
    console.log(e)
  }
}

const formatUserData = (data) => {
  userCardContainer.innerHTML=``
  let singleUser = ``
  let output = ``
  let className=``
  data.forEach(user => {
    if (user.id === 1){
      className="card card-active"
    }else{
      className="card"
    }
    singleUser = `<div class="${className}" id="card${user.id}">
    <h2 class="profile-name">${user.name}</h2>
    <p class="profile-position">${user.username}</p>
    <div class="profile-body">
      <div class="list-1">
        <ul>
          <li><span>email: </span>${user.email}</li>
          <li><span>address: </span>${user.address.suite}, ${user.address.street}, ${user.address.city}</li>
          <li><span>website: </span>${user.website}</li>
        </ul>
      </div>
      <div class="list-2">
        <ul>
          <li><span>phone: </span>${user.phone}</li>
          <li><span>company: </span>${user.company.name}</li>
          <li><span>zipcode: </span>${user.address.zipcode}</li>
        </ul>
      </div>
    </div>
  </div>`
  output = output + singleUser
  })
  userCardContainer.innerHTML=output
  console.log(output)
}

const formateImageData = (data) => {
  let singleImg=``
  let output=``
  let className=``
  data.forEach(img => {
    if (img.id === 1){
      className="img-active"
    }else{
      className=""
    }
    singleImg= `<img src="${img.url}" id="content${img.id}" class="${className}">`

    output=output+singleImg
  })
  imageContainer.innerHTML=output
}


// event listeners
nextBtnImg.addEventListener('click', nextImg)
prevBtnImg.addEventListener('click', prevImg)
nextBtnCard.addEventListener('click', nextCard)
prevBtnCard.addEventListener('click', prevCard)
fetchUserBtn.addEventListener('click', getUsers)
fetchImgBtn.addEventListener('click', getImages)
