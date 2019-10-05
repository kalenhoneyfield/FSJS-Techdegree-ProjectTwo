/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
//store the whole div element holding the content
let pageDiv = document.querySelector(".page");

//store the header div to be used later for the search tool
let headerDiv = pageDiv.querySelector(".page-header");

//create a div to place the search box in, then place the search box div into the header
let searchDiv = document.createElement("div");
searchDiv.className = "searchBoxDiv";
searchDiv.style.textAlign = "center";
let searchBox = document.createElement("input");

searchBox.setAttribute("type", "text");
searchBox.id = "search";
let searchBoxLabel = document.createElement("label");
searchBoxLabel.htmlFor = "search";
searchBoxLabel.innerHTML = "Search ";

searchDiv.append(searchBoxLabel);



searchDiv.append(searchBox);



headerDiv.append(searchDiv);

search("search");

//Store the list of students in an array 
let studentList = pageDiv.querySelectorAll(".student-item");

//create a div to place all our links in and then style it so its in the middle
let selectionDiv = document.createElement("div");
selectionDiv.style.textAlign = "center";


//an object to store and rebuild items for the page
/*
{
   avatar: found with the avatar class and the src link
   name: found in the h3 tag
   email: found in the email class 
   date: found in the date class
}
*/
// let studentObject = [];

// for(let i = 0; i < studentList.length; i++){
//    let pic = studentList[i].querySelector(".avatar").src;
//    let name = studentList[i].getElementsByTagName("h3")[0].textContent;
//    let email = studentList[i].querySelector(".email").textContent;
//    let date = studentList[i].querySelector(".date").textContent;
//    studentObject.push({
//       "avatar": pic,
//       "name": name,
//       "email": email,
//       "date": date,
//    });
// }


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

/*
Step 1: setup the page
Step 2: display desired results
Step 3: give the user the options needed to display on the ones they wish to see
Note: step 3 may require magic
*/
function showPage(list, show){

   for(let i = 0; i < list.length; i++){
      list[i].style.display = "none";
   }
   
   let counter = 10;
   while(counter > 0){
      if( list[show -1] ){
         list[show -1].style.display = "";
      }
      
      show--;
      counter--;
   }
   appendPageLinks(list);
}
showPage(studentList, 10);
//appendPageLinks(studentList);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(studentList){

   let totalPages = Math.ceil( studentList.length / 10 );

   selectionDiv.innerHTML = "";

   for(let i = 0; i < totalPages; i++){
      let value = i + 1;
      let anchor = document.createElement("a"); 
      anchor.textContent = value;
      anchor.style.padding = "10px";
      anchor.style.margin = "4px 4px";
      anchor.style.borderRadius = "5px";
      anchor.style.color = "white";
      anchor.style.textShadow = "1px 1px black";
      anchor.style.backgroundColor = getRandomColorCode();
      
      anchor.onclick = () => {
         showPage(studentList, Number(value + "0"));
      }
      
      selectionDiv.append( anchor );
   }
   pageDiv.append(selectionDiv);
}

function search(id){
   let el = document.getElementById(id);
   let searchList = [];
   el.onkeyup = () => {
      searchList = [];
      let query = el.value;
      for(let i = 0; i < studentList.length; i++){

         studentList[i].style.display = "none";

         let name = studentList[i].getElementsByTagName("h3")[0].textContent;

         if(name.indexOf(query) != -1){
            searchList.push( studentList[i] )
         }
         else {
            
         }
      }
      showPage(searchList, 10);   
   }

}

/*
I used a function very similar to this in my unit 1 project, it is not identical but close enough for me, to warrant a note
This function simply returns a random color value formated as RGB.
*/
function getRandomColorCode(){
   let randR = Math.floor(Math.random() * 255);
   let randG = Math.floor(Math.random() * 255);
   let randB = Math.floor(Math.random() * 255);
   return "rgb(" + [randR,randG,randB].join(',') + ")";
 }


// Remember to delete the comments that came with this file, and replace them with your own code comments.