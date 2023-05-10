// ==============================================================1-game===================================================================

let click = document.querySelector('.game__dino')
let cactus = document.querySelector('.game__cactus')

document.addEventListener('click', (e) => {
  run()
})

document.addEventListener('keydown', (e) => {
  run()
})

function run() {
  if (click.classList != "jump") {
    click.classList.add('jump')
  } setTimeout(() => {
    click.classList.remove('jump')
  }, 550);
}

let bang = setInterval(function () {
  let clickTop = parseInt(window.getComputedStyle(click).getPropertyValue("top"))
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))


  if (cactusLeft < 50 && cactusLeft > 0 && clickTop >= 253) {
    // alert("GAME OVER!!")
  }
}, 10)