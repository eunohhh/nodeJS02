import searchDB from "./searchdb.js" // import DBjson
import forBind from "./binddb.js"; // import bind DB
"use strict";

/** ============== set DB =============== */
let dbToArr = []; // arr for DBjson copy
let dbObj = {}; // obj for DBjson coy
let everyKeywords = []; // arr for every keywords form DBjson
searchDB.forEach((e,i)=>{
    dbObj = {  // obj copy
        _id : e._id,
        title : e.title,
        keywords : e.keywords.split(","), // original DB is sting, so change to arr
        url : e.url
    }
    dbToArr.push(dbObj) // shallow copy
});
dbToArr.forEach((e, i)=>{ // start from shallow copied array
    everyKeywords.push( ...e.keywords );  // every keywords in one array
});
let reducedKeywords = [...new Set(everyKeywords)]; // reduce keywords
// console.log(reducedKeywords);

/** ============== top level selectors && function ================ */
const isNotHover = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}; // =========> mobile device check function

const topDivMain = document.querySelector('.screenxyz');  // ===============> main page
const topDivScan = document.querySelector('.scanvaspage');  // =============> scanvas page
const topDivSketch = document.querySelector('.sketchboxpage'); // ==========> sketchbox page
const topDivMeow = document.querySelector('.meowartpage'); // ==============> meowart page
const topDivGpu = document.querySelector('.gpupage'); // ===================> GPU page
const topDivDesign = document.querySelector('.xyz-designpage'); // =========> desing page

/** ============== if main page do this ================ */
if(topDivMain !== null && topDivMain !== undefined){

    /** ============== make HTML elements ================ */
    const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'box-con');

    // make left box
    let leftBoxDiv = document.createElement('div');
        leftBoxDiv.setAttribute('class', 'leftbox');
    let leftBoxEle = `<div class="lefticon"><span_1 class="material-icons-outlined concopy lefticon-show" data-inum="0">content_copy</span_1><br><span_1 class="material-icons-outlined" style="transform:rotate(90deg);" data-inum="1">search</span_1></div>`;
    leftBoxDiv.insertAdjacentHTML('beforeend', leftBoxEle);

    mainDiv.insertAdjacentElement('beforeend', leftBoxDiv); // leftbox to maindiv

    // make mid box
    let midBoxDiv = document.createElement('div');
        midBoxDiv.setAttribute('class', 'midbox');
    let midboxUl = document.createElement('ul');
        midboxUl.setAttribute('class', 'li-group li-group-show');
    
    const main = forBind.main;
    for(let i = 0; i < main.midbox.liIcon.length; i++){
        let li = document.createElement('li');
            li.setAttribute('class', main.midbox.liClass);
        let span_1 = document.createElement('span');
            span_1.setAttribute('class', main.midbox.spanClass);
            span_1.innerText = main.midbox.liIcon[i];

        li.insertAdjacentElement('beforeend', span_1);

        let span_2 = document.createElement('span');
            span_2.setAttribute('data-num', i);
            span_2.innerText = main.midbox.liStr[i];

        li.insertAdjacentElement('beforeend', span_2);
        midboxUl.insertAdjacentElement('beforeend', li);
    }
    midBoxDiv.insertAdjacentElement('beforeend', midboxUl);

    let inputHtml = `<div class="inputWrap"><input type="search" name="search" placeholder="검색.." /><button class="material-icons-outlined sbtn" style="transform:rotate(90deg);">search</button><button class="btnClear">x</button></div>`
    midBoxDiv.insertAdjacentHTML('beforeend', inputHtml);

    mainDiv.insertAdjacentElement('beforeend', midBoxDiv); // midbox to maindiv

    // make right box
    let rightMainBoxDiv = document.createElement('div');
        rightMainBoxDiv.setAttribute('class', 'rightbox');
    let rightConBoxDiv = document.createElement('div');
        rightConBoxDiv.setAttribute('class', 'li-contents-box');

    const shorten = main.rightBox.divCon;
    for(let i = 0; i < shorten.length; i++){
        let rightCon = document.createElement('div');
            rightCon.setAttribute('class', 'li-contents');
        let p = `<p>${shorten[i][0]}</p><p>${shorten[i][1]}</p><p><a>${shorten[i][2]}</a><p>`;
        let div = `<div class="${shorten[i][3]}"><div class="${shorten[i][4]}"></div></div>`;
        rightCon.insertAdjacentHTML('beforeend', p);
        rightCon.insertAdjacentHTML('beforeend', div);

        rightConBoxDiv.insertAdjacentElement('beforeend', rightCon);
    }
    rightMainBoxDiv.insertAdjacentElement('beforeend', rightConBoxDiv);

    mainDiv.insertAdjacentElement('beforeend', rightMainBoxDiv); // right box to maindiv

    // apply to top div
    topDivMain.insertAdjacentElement('beforeend', mainDiv); // maindiv to top maindiv(screenxyz)
        

    const delRegex = /[{}()<>`~!@#$%^&*|\[\]\\\'\";:\/?|\r\n]/gim; // useful Regex when delete special characters or prevent attack, need del nbsp add \s


    /** ============== main page selectors ================ */
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
    let searchIcon = document.querySelector('.inputWrap').children[1]; // select searchInput search icon
    let cancelSearchIcon = document.querySelector('.inputWrap').children[2]; // select search cancel icon

    let rightBox = document.querySelector('.rightbox'); // select right box


    /** ============== main page app ================ */
    mainContents[3].firstChild.setAttribute('class', 'meowartfont'); // append meowart font hardcoding...

    leftIconBox.addEventListener('click', (e)=>{ // add event listner to left icons
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

    mainUl.addEventListener('click', (e)=>{ // add event listner to main ul
        if(e.target.dataset.num !== undefined){
            mainTabSelec(e.target.dataset.num) // run tab open func
        }      
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

    cancelSearchIcon.addEventListener('click',(e)=>{ // when cancel search icon clicked, prevent default
        e.preventDefault();
    })

    /** ============== main page functions ================ */
    // search function
    function searching(search){
        let nbspSearchArr = [];
        if(delRegex.test(search)){
            alert("don't do that");
        } else if(search.length > 10){
            alert('10자 이내로 검색하세요');
        } else {
            let searchRes = [];
            if(/\s/.test(search)){
                nbspSearchArr = search.split(/\s/);
                searchRes = dbToArr.filter((e, i)=>{ // filter == search
                    return e.keywords.includes(nbspSearchArr[0]);
                })
            } else {
                searchRes = dbToArr.filter((e, i)=>{ // filter == search
                    return e.keywords.includes(search);
                })
            }
            makeSearchedEle(searchRes); // search result to element function exe
        }        
    }

    // make element for search result
    function makeSearchedEle(searchResult){
        if(rightBox.children[1] !== undefined && rightBox.children[1] !== null ){  // start with removing existing div
            rightBox.children[1].remove();
        }  
        let resDiv = document.createElement('div'); // make result div
            resDiv.setAttribute('class', 'search-res-div');

        if(searchResult.length === 0){  // if no search result 
            let noRes = document.createElement('h3');
                noRes.setAttribute('class', 'search-res-h');
                noRes.innerHTML = '<h3>검색결과가 없어요 ㅠㅠ</h3>';
            resDiv.insertAdjacentElement('beforeend', noRes);
            rightBox.insertAdjacentElement('beforeend', resDiv);
        } else {  // if search result 
            let resA;
            let resH;
            searchResult.forEach((e,i)=>{ // because search result is array
                resA = document.createElement('a');
                    resA.setAttribute('target', 'blank');
                    resA.setAttribute('href', e.url);
                resH = document.createElement('h3');
                    resH.setAttribute('class', 'search-res-h');
                    resH.innerHTML = `${e.title}`;
                resA.insertAdjacentElement('beforeend', resH)
                resDiv.insertAdjacentElement('beforeend', resA);
            });
            rightBox.insertAdjacentElement('beforeend', resDiv);
        } 
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

/** ============== if scanvas page do this ================ */
if(topDivScan !== null && topDivScan !== undefined){
    let xyzcl = document.querySelector('.xyz-closefolder');
    let xyzex = document.querySelector('.xyz-exfolder');
    
    xyzcl.addEventListener('click', function(){
        this.style.display = 'none';
        xyzex.style.display = 'block';
    })

    let xyzDownLoad = document.querySelector('.xyzpc p');
        xyzDownLoad.style.cursor = 'crosshair';
    let downHref = 'https://screenxyz.net/wp-content/uploads/2023/05/%EC%BD%94%ED%8B%B0%EB%93%9C%ED%85%8C%EC%8A%A4%ED%8A%B8.pdf';
    xyzDownLoad.addEventListener('click', function(){
        window.open(downHref);
    });

    let xyzMouse = document.querySelector('.xyzmouse');
        xyzMouse.style.cursor = 'crosshair';
    let goHref = 'https://screenxyz.net/help';
    xyzMouse.addEventListener('click',function(){
        window.open(goHref);
    });

    let xyzSerB = document.querySelector('.xyz-service-b');
        xyzSerB.style.cursor = 'crosshair';
    xyzSerB.addEventListener('click', function(){
        window.open('https://screenxyz.net/contact/');
    });





    let scanBtn = document.querySelectorAll('.xyz-focus div');

    scanBtn.forEach(function(e,i,a){
        e.style.cursor = 'crosshair';
        let scanHref = ['https://screenxyz.net','https://screenxyz.net/spaces','https://screenxyz.net/contact'];
        e.addEventListener('click', function(){
            window.open(scanHref[i])
        });
    });

};


/** ============== if sketchbox page do this ================ */
if(topDivSketch !== null && topDivSketch !== undefined){
    let brush = document.querySelectorAll('.xyzbrush img');

    let brushrandom = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }

    brush.forEach(function(e,i,a){
        brush[i].style.top = `${brushrandom(0, window.innerHeight - 240)}px`;
        brush[i].style.left = `${brushrandom(0, window.innerWidth - 240)}px`;
    });
};

/** ============== if meowart page do this ================ */
if(topDivMeow !== null && topDivMeow !== undefined){
    const meowart = forBind.meowart;

    let meowLogo = `<div class="${meowart.logoClass[0]}"><div class="${meowart.logoClass[1]}"></div></div>`;
    topDivMeow.insertAdjacentHTML('beforeend', meowLogo);

    let catImg = `<div class="${meowart.catClass}"><img src="${meowart.catImg}"></div>`;
    topDivMeow.insertAdjacentHTML('beforeend', catImg);

    let meowYoutube = `<div class="${meowart.youtubeClass}"><a href="${meowart.youtubeHref}" class="${meowart.youtubeHrefClass}" target="_blank">${meowart.youtubeStr}</a></div>`;
    topDivMeow.insertAdjacentHTML('beforeend', meowYoutube);

    let catJelly = `<div class="${meowart.catJellyClass}"><img src="${meowart.catJellyImg}"></div>`;

    topDivMeow.insertAdjacentHTML('beforeend', catJelly);

    const meowtablet = document.querySelector(`.${meowart.youtubeHrefClass}`);
    if(isNotHover()){
        let start = new Date().getTime();
        let counter = 0;
        let isPink = false;
        meowtablet.style.transition = `all 1s`;
        let changeColor = function() {
            let ts = new Date().getTime();
            if (ts - 6000 > start) {
            // console.log('End');
            } else {
                counter ++;
                if( counter % 90 === 0 ){
                    meowtablet.style.color = isPink ? '#fff' : '#ffaced';
                    isPink = !isPink;
                }
                requestAnimationFrame(changeColor);              
            }
        }
        requestAnimationFrame(changeColor);
    }
}

/** ============== if GPU page do this ================ */
if(topDivGpu !== null && topDivGpu !== undefined){
    const gpu = forBind.gpu;

    let firstBox = document.createElement('div');
        firstBox.setAttribute('class', gpu.firBoxClass);
    let secondBox = document.createElement('div');
        secondBox.setAttribute('class', gpu.secBoxClass);

    let gpuLogo = `<div class="${gpu.firLogoClass}"><div class="${gpu.secLogoclass}"></div></div>`;
    secondBox.insertAdjacentHTML('beforeend', gpuLogo);

    let gpuText = `<div class="${gpu.txtClass}"><p class="${gpu.txtSmile}">◡̈</p><p>${gpu.txtStr}</p></div>`;
    secondBox.insertAdjacentHTML('beforeend', gpuText);

    let gpuAdd = `<div class="${gpu.addClass}"><p><a href="${gpu.addAHref}" class="${gpu.addAClass}" target="_blank">${gpu.addAstr}</a></p><a href="${gpu.instaHref}" class="${gpu.instaClass}" target="_blank"><div class="${gpu.instaSvgClass}"></div></a></div>`;
    secondBox.insertAdjacentHTML('beforeend', gpuAdd);

    firstBox.insertAdjacentElement('beforeend', secondBox);

    topDivGpu.insertAdjacentElement('beforeend', firstBox);

    let addForAni = document.querySelector(`.${gpu.addClass}`).firstChild;
        addForAni.setAttribute('class', 'animate__animated animate__bounce');
    let instaForAni = document.querySelector(`.${gpu.instaSvgClass}`);
        instaForAni.classList.add('animate__animated');
        instaForAni.classList.add('animate__headShake');
}

/** ============== if Design page do this ================ */
if(topDivDesign !== null && topDivDesign !== undefined){
    const de = forBind.design;
    
    makeLeftRight(de.logo);

    let palMain = document.createElement('div');
        palMain.setAttribute('class', de.palette.main);
        makeLogoBox(de.palette, palMain);
        let palBg = document.createElement('div');
            palBg.setAttribute('class', de.palette.bg);
        let weaveSvg = `<div class="${de.palette.bg}"><div class="${de.palette.weave}"></div></div>`;
            palBg.insertAdjacentHTML('beforeend', weaveSvg);
        palMain.insertAdjacentElement('beforeend', palBg);
    topDivDesign.insertAdjacentElement('beforeend', palMain);

    makeLeftRight(de.font)

    function makeLogoBox(where, insert){
        let logoBox = document.createElement('div');
            logoBox.setAttribute('class', de.logoBox );
        let circleLogo  = `<div class="${where.circle}"></div><div class="${where.title}"></div>`;
            logoBox.insertAdjacentHTML('beforeend', circleLogo);
        insert.insertAdjacentElement('beforeend', logoBox);
    }

    function makeLeftRight(pos){
        let main = document.createElement('div');
            main.setAttribute('class', pos.main);
            makeLogoBox(pos, main);
            let bg = document.createElement('div');
                bg.setAttribute('class', pos.bg);
            let mid = makeWeave(pos, bg);
            if(pos === de.logo){
                let imgCon = document.createElement('div');
                    imgCon.setAttribute('class', de.logo.midCon);
                    let imgimg = de.logo.logoArr.map((e)=>{
                        let imgDiv = document.createElement('div');
                            imgDiv.setAttribute('class', e);
                            imgCon.insertAdjacentElement('beforeend', imgDiv);
                        return imgDiv;
                    });
                    let imgEle = document.createElement('img');
                        imgEle.setAttribute('src', de.logo.logoPng);
                    imgimg[3].insertAdjacentElement('beforeend', imgEle);
                mid.insertAdjacentElement('beforeend', imgCon);
            } else {
                let fontCon = document.createElement('div');
                    fontCon.setAttribute('class', de.font.strWrapper);
                    de.font.str.forEach((e)=>{
                        let p = document.createElement('p');
                            p.innerHTML = e;
                        fontCon.insertAdjacentElement('beforeend', p);
                    });     
                mid.insertAdjacentElement('beforeend', fontCon);
            }            
            main.insertAdjacentElement('beforeend', bg)
            bg.insertBefore(mid, bg.childNodes[1]);
        topDivDesign.insertAdjacentElement('beforeend', main);
    }

    function makeWeave(order, bg){
        let top = document.createElement('div');
        let mid = document.createElement('div');
        let bottom = document.createElement('div');
        for(let i = 0; i < de.weaveDivs; i++){
            let divsUp = document.createElement('div');
            let divsBottom = document.createElement('div');
            top.insertAdjacentElement('beforeend', divsUp);
            bottom.insertAdjacentElement('beforeend', divsBottom);
        }    
        if(order === de.logo){
            topMidBottom(de.logo, bg);
            return mid;
        } else if (order === de.font){
            topMidBottom(de.font, bg);
            return mid;
        }
        function topMidBottom(cla, where){
            top.setAttribute('class', cla.top);
            mid.setAttribute('class', cla.mid);
            bottom.setAttribute('class', cla.bottom);
            
            where.insertAdjacentElement('beforeend', top);
            where.insertAdjacentElement('beforeend', mid);
            where.insertAdjacentElement('beforeend', bottom);
        }
    }
}