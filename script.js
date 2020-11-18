const section_center = document.querySelector('.section-center')
const overlay = document.querySelector(".overlay")
let btns = document.querySelectorAll(".btns button")
let page = document.querySelector(".page span")
let bodyOverLay = document.querySelector('.bodyOverLay')
let errorText = document.querySelector('.errortext p');
let articles
let interval;
let count =0
btns = Array.from(btns)
// window onload
const initFun = ()=>{
   fetchApi()
}
window.onload = initFun

// insert data into the DOM
function showIndexedData(index, len, data) {
   let html = '';
	for (let x = index; x <= len; x++) {
      html += `<article class="arti" data-id="${x}">
      <div class="card cardFront">
      <img src="${data[x].flag}">
      <div class="name"><p>${data[x].name}</p></div>
      <div class="details">
      <div class="detail"> <span class="first">Country's capital</span> <span>${data[x].capital}</span></div>
      <div class="detail"> <span class="first">Continent/Region</span> <span>${data[x].region}</span></div>
      <div class="detail"> <span class="first">Subregion</span> <span>${data[x].subregion}</span></div>
      <div class="detail"> <span class="first">Population</span> <span>${+data[x].population}</span></div>
      </div></div>
      <div class=" card cardBack">
      <div class="back">
      <div class="title"> Language(s)</div>
      <div class="small" data-id=${x}>${data[x].languages.map(item=>{
         return `<span>${item.name}</span>`
      })}</div>
      </div>
      <div class="back">
      <div class="title"> currencies</div>
      <div class="small" data-id=${x}>${data[x].currencies.map(item=>{
         return `<span>${item.name}</span>`
      })}</div>
      </div>
      <div class="back">
      <div class="title"> TimeZone(s)</div>
      <div class="small" data-id=${x}> ${data[x].timezones.map(item=>{
         return ` <span>${item}</span> `
      })}</div>
      </div>
      <div class="back">
      <div class="title"> Calling Code(s)</div>
      <div class="small" data-id=${x}>${data[x].callingCodes.map(item=>{
         return `<span> +${item}</span>`
      })}</div>
      </div>
      </div>
      </article>` 
	}
   section_center.innerHTML = html
}
// buttons
const displayData = (data)=>{
   btns.forEach((btn)=>{
      btn.onclick=function(e){
         page.innerHTML= e.target.innerHTML
         let index = +this.dataset["index"]
         let arrlen= + this.value
         btns.forEach(item=>{
            item.style.backgroundColor = '#0384CE';
         })
         if(btn.value==arrlen){
            btn.style.backgroundColor="green"
         }
         showIndexedData(index, arrlen, data)
      }
   })
}
// error message
function displayErrorMessage(error){
   if(error){
      clearInterval(interval)
      bodyOverLay.classList.add('showBodyOverlay');
      errorText.innerHTML=error
      interval= setTimeout(function(){
         bodyOverLay.classList.remove('showBodyOverlay');
      },8000)
   }
}
// fetch Api
async function fetchApi(){
   const url=" https://restcountries.eu/rest/v2/all"
   try{
      const fetchData = await fetch(url)
      const jsonData =  await fetchData.json()
      overlay.classList.add('showOverly')
      setTimeout(()=>{
         overlay.classList.remove('showOverly');
         btns[0].style.backgroundColor = 'green';
         page.innerHTML=1
         showIndexedData(0, 50,jsonData);
         displayData(jsonData)},3000)
      
   }catch(error){
      displayErrorMessage(error.message)
   }
}