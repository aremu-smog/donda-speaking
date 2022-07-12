const donda = document.querySelectorAll(".donda")

export const comeToLife = price => {
  const jail = document.querySelector(".jail")
  jail.style.opacity = price
}

export const startChanting = () => {
  donda.forEach(row => {
    row.style.animationPlayState = "running"
  })
}
export const stopChanting = () => {
  donda.forEach(row => {
    row.style.animationPlayState = "paused"
  })
}
