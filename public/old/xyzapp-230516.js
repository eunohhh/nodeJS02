import searchDB from "./searchdb.js"

"use strict";
let dbToArr = [];
let dbObj = {};
searchDB.forEach((e,i)=>{
    dbObj = {
        _id : e._id,
        title : e.title,
        keywords : e.keywords.split(","),
        url : e.url
    }
    dbToArr.push(dbObj) // shallow copy

})

// main page
let mainUl = document.querySelector('.li-group'); // select main page ul
let mainConBox = document.querySelector('.li-contents-box');
let mainLists = document.querySelectorAll('.li-group-item'); // select main page lists
let mainContents = document.querySelectorAll('.li-contents'); // select main page content

let leftIconBox = document.querySelector('.lefticon'); // select left icon Box
let leftIcons = document.querySelector('.lefticon').children; // select left inner icons

// let searchChild = document.querySelector('.inputWrap').children // select search wrapper's every child
let searchWrapper = document.querySelector('.inputWrap'); // select search wrapper
let searchInput = document.querySelector('.inputWrap').children[0]; // select searchInput input
let searchIcon = document.querySelector('.inputWrap').children[2]; // select searchInput search icon

let rightBox = document.querySelector('.rightbox');

// console.log(searchDB)

if(mainLists !== null && mainLists !== undefined){

    leftIconBox.addEventListener('click', (e)=>{
        let ifSearched = document.querySelector('.search-res-div');
        if(ifSearched){
            ifSearched.remove();
        }
        for(let i = 0; i < leftIcons.length; i++){
            leftIcons[i].classList.remove('lefticon-show');
        }
        if(e.target.dataset.inum == 1){
            mainUl.classList.remove('li-group-show');
            searchWrapper.classList.add('inputWrap-show');
            mainConBox.style.display = 'none';
        } else if(e.target.dataset.inum == 0){
            searchWrapper.classList.remove('inputWrap-show');
            mainUl.classList.add('li-group-show');
            mainConBox.style.display = 'flex';
        }
        e.target.classList.add('lefticon-show');
    })

    mainLists.forEach((e, i)=>{
        e.setAttribute('data-num', i); // grant data set(number) to main page lists
    })

    mainUl.addEventListener('click', (e)=>{ // add event listner to main ul
        mainTabSelec(e.target.dataset.num) // run tab open func
    });

    
    let searchedString = '';
    searchInput.addEventListener('input', (e)=>{ // save input value to variable
        searchedString = e.target.value.toLowerCase();
    })
    
    searchInput.addEventListener('keydown', (e)=>{ // when enter keydowned, do searching
        if(e.keyCode === 13){
            searching(searchedString);
        }
    })

    searchInput.addEventListener('blur', ()=>{ // when input blured, auto clear value
        searchInput.value = '';
        // console.log(searchedString) // input is deleted, but value is preserved
    }) 

    searchIcon.addEventListener('click', ()=>{ // when search icon clicked, do searching
        searching(searchedString);
    })

    // search function
    function searching(search){

        const searchRegex = /[`~!@#$%^&*|\[\]\\\'\";:\/?|\s]/g


        let everyKeywords = [];
        dbToArr.forEach((e, i)=>{
            everyKeywords.push( ...e.keywords );
        });

        let searchRes = dbToArr.filter((e, i)=>{
                return e.keywords.includes(search)
        })


        let keywordsArr = [];
        let compareArr = [];
        searchDB.forEach((e, i)=>{
            keywordsArr.push( ...e.keywords.replace(searchRegex,'').split(",") );
        });

        let matchedRes = keywordsArr.filter((e,i)=>{
            compareArr.push(e.includes(search));
            if(compareArr[i] === true){
                return keywordsArr[i];
            }
        })

        console.log(matchedRes)

        let finalRes = {};
        searchDB.forEach((e,i)=>{
            let tempArr = e.keywords.replace(searchRegex,'').split(",");
            tempArr.forEach((ele)=>{
                if(matchedRes[0] === ele){
                    finalRes =  { title : e.title, url : e.url }  ;
                }
            })
            return finalRes;
        })

        let resDiv = document.createElement('div');
            resDiv.setAttribute('class', 'search-res-div');
        let resA = document.createElement('a');
            resA.setAttribute('target', 'blank');
        let resH = document.createElement('h3');
            resH.setAttribute('class', 'search-res-h');


        if(Object.keys(finalRes).length === 0){
            if(rightBox.children[1] !== undefined && rightBox.children[1] !== null ){
                console.log(rightBox.children[1])
                rightBox.children[1].remove();
            }
            resH.innerHTML = '검색결과가 없어요 ㅠㅠ';
            resDiv.insertAdjacentElement('beforeend', resH);
            rightBox.insertAdjacentElement('beforeend', resDiv);
        } else {
            if(rightBox.children[1] !== undefined && rightBox.children[1] !== null){
                rightBox.children[1].remove();
            }
            resH.innerHTML = `${finalRes.title}`;
            resA.setAttribute('href', finalRes.url);
            resA.insertAdjacentElement('beforeend', resH)
            resDiv.insertAdjacentElement('beforeend', resA);
            rightBox.insertAdjacentElement('beforeend', resDiv);
        }
        // console.log(finalRes)
    }

    // main tab open function
    function mainTabSelec(targetNum){ 
        mainContents.forEach(function(e, i){
            e.classList.remove('con-show');
            mainLists[i].classList.remove('list-show'); // remove existing classlist
        })
        mainLists[targetNum].classList.add('list-show');
        mainContents[targetNum].classList.add('con-show'); // add classlist 
    }

}

