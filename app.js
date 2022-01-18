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
  console.log('next')
  document.getElementById(`card${i_card+1}`).classList.remove("card-active")
  i_card = (j_card+i_card+1) % j_card
  document.getElementById(`card${i_card+1}`).classList.add("card-active")
}

const prevCard = () => {
  console.log('prev')
  document.getElementById(`card${i_card+1}`).classList.remove("card-active")
  i_card = (j_card+i_card-1) % j_card;
  document.getElementById(`card${i_card+1}`).classList.add("card-active")
}

// event listeners
nextBtnImg.addEventListener('click', nextImg)
prevBtnImg.addEventListener('click', prevImg)
nextBtnCard.addEventListener('click', nextCard)
prevBtnCard.addEventListener('click', prevCard)
