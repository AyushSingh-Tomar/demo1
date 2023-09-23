const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {                              // anuj , divyansh this function works when we click on the Ayush-magazine on header 
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);    //string of first url,query,returns promise
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);//data is packed in articles 
}

function bindData(articles) {
    //calling all necessary ids from html and setting inner html
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    //added in order to curtail the flaw that the re-calling of api will summon 100 more cards beneath the existing cards

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); //deep cloning ,each element(div) in card will be cloned
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",//already java library
    });// t-z to date time format

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => { //when ever any element is clicked take to window.open for article.url on a blank page 
        window.open(article.url, "_blank"); //url is also given in api summoned so we can access it trough that url so we will open a new blank page for it
    });
}

let curSelectedNav = null;      //if current selected class is not null then only
function onNavItemClick(id) {                           //guys it is code to attach the javascript function to html tag list item
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active"); //swapping of active class
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");      //guys it is code to attach the javascript function to html tag button
const searchText = document.getElementById("search-text");            //so that other news we cant access through predefined query can be passed through this text input

searchButton.addEventListener("click", () => {       //whenever button is clicked,
    const query = searchText.value;                  //getting text as query
    if (!query) return;                              //if the button is clicked uselessly
    fetchNews(query);                                //now we pass the text query in our fetch function
    curSelectedNav?.classList.remove("active");      //so as to remove selected from the button while another query is entertained
    curSelectedNav = null;
});




