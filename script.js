const API_KEY="92c99c5b03cd457a94ae84432d7afff2";

const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

function reload() {
    window.location.reload();
}
async function fetchNews (query) {
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function  bindData(articles) {
    const cardsContainer =document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    /* below code is written cause 
    whenever binds data is called i'am making the 
    conatiner empty so that whenever api gets called 
    fresh news gets updated inside the container and old
     ones gets removed
   */
   cardsContainer.innerHTML="";

    articles.forEach((article) =>{
        // if no image is inside the news article then that news is not displayed
        if(!article.urlToImage) return;


        const cardClone=newsCardTemplate.content.cloneNode(true);
 
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone)
    });
    
}

function  fillDataInCard(cardClone,article) {
    const newsImg= cardClone.querySelector('#news-img')
    const newsTitle= cardClone.querySelector('#news-title')
    const  newsSource= cardClone.querySelector('#news-source')
    const newsDesc= cardClone.querySelector('#news-desc')
    
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;


    // taking date from each article thorugh aPI
    const date =new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:'Asia/Jakarta'
    });

    newsSource.innerHTML=`${article.source.name} . ${date}`
  
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");

       
    })

}

let curSelectedNav=null;
// for nav and search functionality
function  onNavItemClick(id) {
    fetchNews(id)
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItem;
    curSelectedNav.classList.add("active");
}

const  searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    //if nothing is searched then and search button is clicked to handle that case
    if(!query) return;
   fetchNews(query);
 
   // to handle the case when user search news and also click on nav bar then the
   // active status from nav will be removed means curr selecte news will become null
   curSelectedNav?.classList.remove("active");
   curSelectedNav=null;
});