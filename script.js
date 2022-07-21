const submitBtn = document.getElementById("submit-button")
const textValue = document.getElementById("text-value")
const alertion = document.querySelector(".show-hide")
const alertionContent = document.querySelector(".show-text")
const valuesDiv = document.querySelector(".added-items")
const deleteAllBtn = document.getElementById("delete-all")

let itemsArray = []
let textElement

submitBtn.addEventListener('click', function(e){
  e.preventDefault()
  
  if(textValue.value !== "")
    itemsArray.push(textValue.value)

  const regValue = /^[a-z][a-z\s]*$/i
  const result = textValue.value.match(regValue);

  if(submitBtn.value === 'Edit'){
    itemsArray.forEach((item, index) => {
      if(item === textElement){
        itemsArray.splice(index, 1, textValue.value)
        itemsArray.pop()
      }
    })
    submitBtn.value = 'Submit'
  }
  
  if(result){
    alertionContent.textContent = "Item added to the list!"
    alertion.style.background = "rgba(54, 209, 54, 0.8)"
    showDivTiming()
    itemAdded()
  }
  else{
    alertionContent.textContent = "Please enter valid value!"
    alertion.style.background = "rgba(252, 210, 0, 0.8)"
    showDivTiming()
  }

  textValue.value = ''

  deleteElement()
  editElement()
})

function showDivTiming(){
  alertion.style.visibility = "visible"
  setTimeout(() => {
    alertion.style.visibility = "hidden"
  }, 1500)
}

function itemAdded(){
  let itemsContent = itemsArray.map(item => {
    return `<div class="item">
              <p class="item-name">${item}</p>
              <div class="icons-div">
                <i class="fa fa-pencil-square-o icon" aria-hidden="true"></i>
                <i class="fa fa-trash icon" aria-hidden="true"></i>
              </div>
            </div>`
  })
  itemsContent = itemsContent.join("")

  valuesDiv.innerHTML = itemsContent 
  
  deleteBtnVisibility()
}

deleteAllBtn.addEventListener('click', () => {
  const items = document.querySelectorAll(".item")
  items.forEach(item => {
    valuesDiv.removeChild(item)
  })

  itemsArray.splice(0, itemsArray.length)
  
  deleteBtnVisibility()
})

function deleteElement(){
  const deleteItem = document.querySelectorAll(".fa-trash")
  
  deleteItem.forEach(icon => {
    icon.addEventListener('click', () => {
      const grandParentElement = icon.parentElement.parentElement
      const textElement = icon.parentElement.previousElementSibling.textContent
      grandParentElement.remove()

      deleteBtnVisibility()

      grandParentElement.remove()

      itemsArray = itemsArray.filter(currentItem => {
        return currentItem !== textElement
      })
    })
  })
}

function editElement(){
  const editItem = document.querySelectorAll(".fa-pencil-square-o")

  editItem.forEach(icon => {
    icon.addEventListener('click', () => {
      textElement = icon.parentElement.previousElementSibling.textContent
      textValue.value = textElement

      submitBtn.value = 'Edit'

      const end = textValue.value.length
      textValue.setSelectionRange(end, end)
      textValue.focus()

      
    })
  })
}

function deleteBtnVisibility(){
  if(valuesDiv.children.length > 0)
    deleteAllBtn.style.visibility = "visible"
  else
  deleteAllBtn.style.visibility = "hidden"
}