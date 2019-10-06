/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
Step 1: setup the page
Step 2: display desired results
Step 3: give the user the options needed to display only the ones they wish to see
Note: step 3 may require magic
*/

//store the whole div element holding the content
let pageDiv = document.querySelector(".page");

//store the header div to be used later for the search tool
let headerDiv = pageDiv.querySelector(".page-header");

//create a div to place our search box
let searchDiv = document.createElement("div");
searchDiv.className = "student-search";
//create a search box and button after creatiung them, append them to the searchDiv
let input =  document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search for students...");
input.id = "search"
searchDiv.append(input);
let button = document.createElement("button");
button.textContent = "Search";
searchDiv.append(button);

headerDiv.append(searchDiv);

//create a div to place all our links in
let selectionDiv = document.createElement("div");
selectionDiv.className = "pagination";


/*
setup a normally hidden div that activates only when no search results are returned
*/
let classUL = document.querySelector(".student-list");
let noResults = document.createElement("div");
noResults.style.display = "none";
noResults.style.textAlign = "center";
let noResultsText = document.createElement("span");
noResultsText.style.fontSize = "18px";
noResultsText.textContent = "We don't seem to have a student that meets your search criteria, but here's a pretty picture."
noResults.append(noResultsText);
let noResultsImg = document.createElement("img");
noResultsImg.setAttribute("src", "https://picsum.photos/800");
noResults.append(noResultsImg);

classUL.append(noResults);

//Store the list of students in an array 
let studentList = pageDiv.querySelectorAll(".student-item");

//variable to hold the total items per page
let perPage = 10;


/*
list is the array of elements that we will be working with, page is the index value of the first element to be displayed
we will need to first set all elements to display = none before we can determine which should be displayed, then we should display those
*/
function showPage(list, page){

   let sIndex = page;
   let eIndex = page + perPage;

   //set all the elements to display = none
   for(let i = 0; i < list.length; i++){
      list[i].style.display = "none";
   }

   /* 
   while starting index value is less than the ending index value, if the value exists, set it to be displayed 
   the if block prevents errors when we have fewer elements in the set than the max per page
   */
   while(sIndex < eIndex){
      if( list[sIndex] ){
         list[sIndex].style.display = "";
      }
      sIndex++;
   }

}

/*
function creates a unordered list of links and appends it to the page 
the list should contain numbers 1 though X, where X is the max number of pages, and 
should be the value of the total list of students divided by the max per page count rounded up. Rounding up accounts for any stray students dangling at the end
*/

function appendPageLinks(studentList){

   let totalPages = Math.ceil( studentList.length / perPage );

   //create an unorder list
   let ul = document.createElement("ul");
   ul.className = "unordered"; //assign it a class so we can easily find it later

   //count the total pages and paste the li elements to the page
   for(let i = 0; i < totalPages; i++){
      let li = document.createElement("li");
      let anchor = document.createElement("a");
      anchor.href = "#";
      anchor.textContent = i + 1;
      li.append(anchor);
      ul.append(li);
   }

   selectionDiv.append(ul);
   pageDiv.append(selectionDiv);
}

//fire the 2 functions that should get the ball rolling
showPage(studentList, 0);
appendPageLinks(studentList);


//find the pagination unordered list
let ul = document.querySelector(".unordered");
//add on click events to the whole list
ul.addEventListener('click', (e) => {
   //change all classnames to "" so we can assign only the one we clicked to active
   let list = ul.children;
   for(let i = 0; i < list.length; i++){
      list[i].children[0].className = "";
   }
   //since we clicked it, set it to active
   e.target.className = "active";

   //then do some math to figure out the value of the index, so we can fire the page function to display the specified set
   let index = (e.target.textContent - 1) * perPage;
   showPage(studentList, index)
   })

//add an event listener to the search div box that can handle either keyups or search button clicks
input.addEventListener("keyup", (e) => {
   search(e.target.value);
})
button.addEventListener("click", (e) => {
   //find the search box then get its value
   let box = e.target.parentNode.children[0];
   search(box.value);
})

function search(query){
   
   let searchList = [];

   for(let i = 0; i < studentList.length; i++){

      studentList[i].style.display = "none";

      let name = studentList[i].getElementsByTagName("h3")[0].textContent;

      if(name.indexOf(query) != -1){
         searchList.push( studentList[i] )
      }
      else {
         
      }
   }
   if(searchList.length == 0){
      noResults.style.display = "";
   }
   else {
      noResults.style.display = "none";
   }

   showPage(searchList, 0);   



}

// Remember to eat the comments that came with this file, and drink water with every meal.