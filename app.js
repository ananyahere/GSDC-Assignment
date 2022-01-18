// Global Variable
let i_img=0;
let j_img=3;
let i_card=0;
let j_card=4;
// if -1, no user/img loaded yet.
let activeImgId=-1;
let activeUserId=-1;

// DOM Variables
const nextBtnImg = document.querySelector('#next-img')
const prevBtnImg = document.querySelector('#prev-img')
const nextBtnCard = document.querySelector('#next-user')
const prevBtnCard = document.querySelector('#prev-user')
const fetchUserBtn = document.querySelector('.fetchUserBtn')
const fetchImgBtn = document.querySelector('.fetchImgBtn')
let userCardContainer = document.querySelector('.userCard-container')
let imageContainer = document.querySelector('.image-container')
const randomImgBtn = document.querySelector('#random_image')
const randomUserBtn = document.querySelector('#random_user')
let errorUserPara = document.querySelector('.user_error')
let errorImgPara = document.querySelector('.img_error')

// functions
const nextImg = () => {
  document.getElementById(`content${i_img+1}`).classList.remove("img-active")
  i_img = (j_img+i_img+1) % j_img
  document.getElementById(`content${i_img+1}`).classList.add("img-active")
  activeImgId = i_img+1
}

const prevImg = () => {
  console.log('prev')
  document.getElementById(`content${i_img+1}`).classList.remove("img-active")
  i_img=(j_img+i_img-1)%j_img
  document.getElementById(`content${i_img+1}`).classList.add("img-active")
  activeImgId = i_img+1
}

const nextCard = () => {
  document.getElementById(`card${i_card+1}`).classList.remove("card-active")
  i_card = (j_card+i_card+1) % j_card
  document.getElementById(`card${i_card+1}`).classList.add("card-active")
  activeUserId = i_card+1
}

const prevCard = () => {
  document.getElementById(`card${i_card+1}`).classList.remove("card-active")
  i_card = (j_card+i_card-1) % j_card;
  document.getElementById(`card${i_card+1}`).classList.add("card-active")
  activeUserId = i_card+1
}

const getUsers = async () => {
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    j_card = data.length
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
  activeUserId=1
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
  activeImgId=1
}

const getRandomImg = () => {
  if(activeImgId === -1){
    // Error Handling
    console.log('error in img')
    errorImgPara.innerHTML = `PLEASE FETCH THE IMAGES FIRST`
    setTimeout(() => {
      errorImgPara.innerHTML = ``
    }, 5000)    
    return
  }
  document.getElementById(`content${activeImgId}`).classList.remove("img-active")
  randomImgId=Math.floor(Math.random() * j_img)
  console.log(randomImgId)
  document.getElementById(`content${randomImgId}`).classList.add("img-active")
  activeImgId = randomImgId
}

const getRandomUser = () => {
  if(activeUserId === -1){
    // Error Handling
    errorUserPara.innerHTML = `PLEASE FETCH THE USERS FIRST`
    setTimeout(() => {
      errorUserPara.innerHTML = ``
    }, 5000)
    return
  }
  document.getElementById(`card${activeUserId}`).classList.remove("card-active")
  randomUserId=Math.floor(Math.random() * j_card)
  console.log(randomUserId)
  document.getElementById(`card${randomUserId}`).classList.add("card-active")
  activeUserId = randomUserId
}

// Event Listeners
nextBtnImg.addEventListener('click', nextImg)
prevBtnImg.addEventListener('click', prevImg)
nextBtnCard.addEventListener('click', nextCard)
prevBtnCard.addEventListener('click', prevCard)
fetchUserBtn.addEventListener('click', getUsers)
fetchImgBtn.addEventListener('click', getImages)
randomImgBtn.addEventListener('click', getRandomImg)
randomUserBtn.addEventListener('click', getRandomUser)
