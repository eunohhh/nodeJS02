import searchDB from "./searchdb.js" // import DBjson
import forBind from "./binddb.js"; // import bind DB
import gltfObjs from "./modelsInfo.js"; // import model gltfs
"use strict";
console.log(navigator.userAgent)
document.body.style.margin = '0';
document.body.style.height = '100%';
document.body.style.boxSizing = 'border-box';
document.body.style.overflowY = 'auto';
let checkerH; // checker for body height changes...
let checkerW; // checker for body width changes...
const firstWidth = window.innerWidth; // when app start, check the window width
const firstHeight = window.innerHeight; // when app start, check the window width

/** ============== top level selectors && function ================ */
const isNotHover = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}; // =========> mobile device check function
const isMobile = () => {
	return /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}; // =========> mobile device check function
const getAgentSystem = () =>{
    if(!("navigator" in window)){
        
    }
    const platform = (navigator.userAgentData?.platform || navigator.platform)?.toLowerCase();
    if(platform.startsWith("win")) return "windows";
    if(platform.startsWith("mac")) return "macos";
    if(platform.startsWith("linux")) return "linux";
    return "unknown";
}

const ourClass = document.querySelector('.xyz-web-dev') // ======================> our common class name
const topDivMain = document.getElementById('screenxyz');  // ===============> main page
const topDivScan = document.getElementById('scanvaspage');  // =============> scanvas page
const topDivSketch = document.getElementById('sketchboxpage'); // ==========> sketchbox page
const topDivMeow = document.getElementById('meowartpage'); // ==============> meowart page
const topDivGpu = document.getElementById('gpupage'); // ===================> GPU page
const topDivDesign = document.getElementById('xyz-designpage'); // =========> desing page

const dropControl = document.querySelector('.elementor-menu-toggle');
const topNav = document.querySelector('.elementor-location-header');
const togBtn = document.querySelector('elementor-menu-toggle__icon--open');

// if(dropControl !== undefined && dropControl !== null && dropControl.style.display !== 'none'){
//     const innerUl = document.getElementById('menu-2-5b0aa3b');
//     document.addEventListener('click', (e)=>{
//         const dropMenu = document.querySelector('.elementor-nav-menu--dropdown');
//         if( e.target !== togBtn && e.target !== innerUl && e.target !== innerUl.childNodes ) {
//             if (dropMenu.clientHeight > 0 ) {
//                 dropControl.classList.remove('elementor-active') 
//             }
//         } 
//     })
//     document.addEventListener('touchstart', (e)=>{
//         const dropMenu = document.querySelector('.elementor-nav-menu--dropdown');
//         if( e.target !== togBtn && e.target !== innerUl && e.target !== innerUl.childNodes ) {
//             if (dropMenu.clientHeight > 0 ) {
//                 dropControl.classList.remove('elementor-active') 
//             }
//         } 
//     })
// }


if(ourClass !== undefined && ourClass !== null){
    mainDivSwitcher(ourClass);
}
/** ============== set def vh for media query && resize ============== */

setScreenSize(); // 최초 페이지 로드시 vh 세팅 함수 실행
window.addEventListener("orientationchange", ()=> { window.dispatchEvent(new Event("resize")),false });
window.addEventListener('resize', ()=>{
    checkerW = document.querySelector('body').clientWidth;
    if(ourClass !== undefined && ourClass !== null){
        setScreenSize(); // 화면 리사이즈(가로모드 세로모드 전환) 발생시 다시 vh 세팅 함수 실행
        mainDivSwitcher(ourClass); // 리사이즈 시 메인디브 스위쳐 함수 다시 실행
    }
});
function setScreenSize(){
    let vh = window.innerHeight * 0.01; // 현재 창의 세로 높이를 구해서 100으로 나눠서 1/100 값을 구함
    document.documentElement.style.setProperty('--vh', `${vh}px`); // 현재 document 의 :root 스타일에 1vh 를 위에 구한 값으로 설정
};

function mainDivSwitcher(target){
    switch(target.getAttribute('id')){
        case 'screenxyz':
            break;
        case 'scanvaspage':
            setMainDivH(target);
            dontLandscape()
            break;
        case 'sketchboxpage':
            setMainDivH(target);
            break;
        case 'meowartpage':
            // setMainDivH(target);
            break;
        case 'gpupage':
            setMainDivH(target);
            break;
        case 'xyz-designpage':
            let curHeight = window.innerHeight;
            let eleTop = document.querySelector('.elementor-location-header'); 
            let eleFoot = document.querySelector('.elementor-location-footer'); 
            if(window.innerWidth > window.innerHeight && !isMobile()){
                console.log('디자인페이지 가로형 pc');
                if(window.innerWidth <= 1024){
                    console.log('가로형인데 아무튼 1024px 보다 작음 스크롤생기게')
                    target.style.height = '100vh';
                } else {
                    let pH = curHeight - eleTop.clientHeight - eleFoot.clientHeight;
                    target.style.height = `${pH}px`;
                }
            } else if(window.innerWidth < window.innerHeight && isMobile()) {
                console.log('디자인페이지 모바일 세로형');
                target.style.height = '100%';
            } else if(/iPad/i.test(navigator.userAgent)) {
                console.log('디자인페이지 아이패드')
                let pH = curHeight - eleTop.clientHeight - eleFoot.clientHeight;
                target.style.height = `${pH}px`
            }
            break;
    }
}

function setMainDivH(target){
    checkerH = document.querySelector('body').clientHeight;
    checkerW = document.querySelector('body').clientWidth;
    let curHeight = window.innerHeight; // current inner height
    let eleTop = document.querySelector('.elementor-location-header'); // 엘리멘터 헤더 높이 변수 저장
    let eleFoot = document.querySelector('.elementor-location-footer'); // 엘리멘터 푸터 높이 변수 저장
    let openState = document.querySelector('.xyz-exfolder');
    let perfectH;
    if(eleTop !== undefined && eleTop !== null || eleFoot !== undefined && eleFoot !== null ){
        if(checkerH === firstHeight && checkerH === curHeight){ // 바디 높이 === 현재 창높이 
            console.log('바디높이가 윈도우 높이와 일치합니다')
            perfectH = curHeight - eleTop.clientHeight - eleFoot.clientHeight;
            if(ourClass.clientHeight <= curHeight ){
                console.log('높이일치, 메인디브 <= 현재높이 높이수정')
                target.style.height = `${perfectH}px`;
            } else {
                console.log('높이일치, 메인디브 > 현재높이 높이 100%')
                target.style.height = '100%';
            }
        } else if(checkerH > firstHeight || checkerH > curHeight){
            console.log('바디높이가 윈도우 높이보다 큽니다');
            perfectH = curHeight - eleTop.clientHeight - eleFoot.clientHeight;
            if(ourClass.clientHeight >= curHeight){
                // console.log('엥?', openState.clientHeight)
                if(openState && openState.clientHeight > 0){
                    console.log('열려있음')
                    target.style.height = '100%';
                } else if(openState && openState.clientHeight <= 0){
                    console.log('닫혀있음')
                    target.style.height = `${perfectH}px`;
                } else if(!openState){
                    console.log('스캔버스아님')
                    if(/iPad/i.test(navigator.userAgent)){
                        console.log('스캔버스 아니고 아이패드임')
                        perfectH = curHeight - eleTop.clientHeight - eleFoot.clientHeight;
                        target.style.height = `${perfectH}px`
                    } else if(window.innerWidth > window.innerHeight){
                        console.log('가로모드임 높이 100vh')
                        target.style.height = '100vh';
                    } else if(window.innerWidth < window.innerHeight){
                        console.log('세로모드임 높이 재조정')
                        perfectH = curHeight - eleTop.clientHeight - eleFoot.clientHeight;
                        target.style.height = `${perfectH}px`;
                    }
                }
            } else {
                console.log('닫혀있음 변화');
                target.style.height = `${perfectH}px`;
            }        
        } else if(checkerH < firstHeight || checkerH < curHeight){ /** 여기가 중요 */
            console.log('바디높이가 윈도우 높이보다 작습니다')
            perfectH = curHeight - eleTop.clientHeight - eleFoot.clientHeight; // 정확한 우리가만든 div 높이값;
            if(ourClass.clientHeight >= curHeight){
                console.log('열려있음 그대로')
                target.style.height = '100%';
            } else {
                console.log('닫혀있거나 스캔버스 아님 변화****');
                if(/iPad/i.test(navigator.userAgent)){
                    console.log('닫혀있거나 스캔버스 아니고 아이패드임');
                    perfectH = curHeight - eleTop.clientHeight - eleFoot.clientHeight;
                    target.style.height = `${perfectH}px`
                } else {
                    // window.innerWidth > window.innerHeight && getAgentSystem() === 'unknown' ? target.style.height = '100vh' : target.style.height = `${perfectH}px`;
                    window.innerWidth > window.innerHeight && window.innerWidth < 1025 ? target.style.height = '100vh' : target.style.height = `${perfectH}px`;
                }
            }
        }
        if(firstWidth > checkerW || firstWidth < checkerW){
            console.log('바디 넓이가 변하였습니다');
            let tempCheckerH = document.querySelector('body').clientHeight; // 바디 전체의 높이
            if(tempCheckerH <= window.innerHeight){ // 바디 전체의 높이가 윈도우 높이 보다 작으면
                console.log('여기도 걸리냐?')
                perfectH = window.innerHeight - eleTop.clientHeight - eleFoot.clientHeight;
                target.style.height = `${perfectH}px`;
            }    
        }
    } 
}

function dontLandscape(){
    if(isMobile() && window.matchMedia('(orientation: portrait)').matches){
        let toDel = document.querySelector('.xyz-landscape');
        let toDelw = document.querySelector('.xyzbgwhite');
        
        if(toDel !== undefined && toDel !== null){
            toDelw.remove();
            toDel.remove();
        }

    } else if(isMobile() && window.matchMedia('(orientation: landscape)').matches){
        let toDel = document.querySelector('.xyz-landscape');
        let toDelw = document.querySelector('.xyzbgwhite');
        if(toDel !== undefined && toDel !== null){
            toDelw.remove();
            toDel.remove();
        } else {
            let str = ['looks good in portrait mode', '세로모드에서 잘 보여요'];
            let bg = document.createElement('div');
                bg.setAttribute('class', 'xyz-landscape');
            let bgWhite = document.createElement('div');
                bgWhite.setAttribute('class', 'xyzbgwhite');
                bgWhite.style.height = "100vh";
                bgWhite.style.width = "100vw";
                bgWhite.style.zIndex = "400";
                bgWhite.style.backgroundColor = "#fff";
            let warn;
            let smile = `<div class="smily"><object data="../assets/screenweb_asset/xyzsmilewhite.svg"></object></div>`;
            bg.insertAdjacentHTML('beforeend', smile)
            str.forEach((e)=>{
                    warn = document.createElement('p');
                    warn.innerHTML = e;
                bg.insertAdjacentElement('beforeend', warn);
            })
            bg.querySelectorAll('p')[1].style.fontSize = '1.5rem';
            bg.querySelectorAll('p')[1].style.paddingTop = '0.5rem';

            document.body.insertAdjacentElement('afterbegin', bgWhite)
            document.body.insertAdjacentElement('afterbegin', bg)
            setTimeout(()=>{
                bg.classList.add('xyz-slow');
            },20)
        }
    }
}

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
        let p = `<p>${shorten[i][0]}</p><p>${shorten[i][1]}</p><p data-lib = "${shorten[i][5]}">${shorten[i][2]}<p>`;
        let div = `<div class="${shorten[i][3]}"><div data-icon = "${shorten[i][5]}"class="${shorten[i][4]}"></div></div>`;
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

    rightBox.addEventListener('click', function(e){
        let lib = e.target.dataset.lib;
        let icon = e.target.dataset.icon;
        if(typeof lib === 'string' || typeof icon === 'string'){
            mainSwitch(lib);
            mainSwitch(icon);
        };

        function mainSwitch(target){
            switch(target){
                case 'scanvas':
                    window.location.href = main.rightBox.href[0]
                    break;
                case 'sketchbox':
                    window.location.href = main.rightBox.href[1]
                    break;
                case 'meowart':
                    window.location.href = main.rightBox.href[2]
                    break;
                case 'gpu':
                    window.location.href = main.rightBox.href[3]
                    break;  
            }
        }
    })

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
            e.preventDefault();
            searching(searchedString);
            searchInput.blur();
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
                noRes.innerHTML = '검색결과가 없어요 ㅠㅠ';
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
        mainUl.style.color = `#88fd93`;
        mainContents[targetNum].classList.add('con-show'); // add classlist 
    }
}

/** ============== if scanvas page do this ================ */
if(topDivScan !== null && topDivScan !== undefined){
    const scanvas = forBind.scanvas;
    
    let logoImg = `<div class="${scanvas.logo}"></div>`;
    topDivScan.insertAdjacentHTML('beforeend', logoImg);

    let exFolder = document.createElement('div');
        exFolder.setAttribute('class', scanvas.ex);
    
        let exFolderUpper = document.createElement('div');
            exFolderUpper.setAttribute('class', scanvas.exUp);

            let folder = document.createElement('div');
                folder.setAttribute('class', scanvas.exFol);

            scanvas.xyz4.forEach((e,i)=>{
                let template = `<div class="${e[0]}"><div><div class="${e[1]}"></div></div><p>${e[2]}</p></div>`;
                folder.insertAdjacentHTML('beforeend', template);
            });

            exFolderUpper.insertAdjacentElement('beforeend', folder);
        exFolder.insertAdjacentElement('beforeend', exFolderUpper);
    
        let cont = document.createElement('div');
            cont.setAttribute('class', scanvas.cont);

        let contIn = document.createElement('div');
            contIn.setAttribute('class', scanvas.contIn);

        let contTempl = `<div class="${scanvas.contFocus}"><div></div><div></div><div><div></div></div><div></div></div><p>${scanvas.contStr}</p>`;
            contIn.insertAdjacentHTML('beforeend', contTempl);
        
            cont.insertAdjacentElement('beforeend', contIn);
        exFolder.insertAdjacentElement('beforeend', cont);

        let vrTempl = `<div class="${scanvas.vr[0]}"><p>${scanvas.vr[1]}</p><div class="${scanvas.vr[2]}"></div><p>${scanvas.vr[3]}</p><div class="${scanvas.vr[4]}"></div><div class="xyzvasinfo">"virtual art space는<br>Full 3D webGL 가상 공간 서비스로<br>현재 3타입의 공간을 선택하실 수 있습니다<br>공간샘플을 보시려면 아래 버튼을 클릭하세요"</div><div class="vasopen">공간 선택</div><p>${scanvas.vr[5]}</p><div class="${scanvas.vr[6]}"></div><div class="xyzviewopen">go to viewer</div></div>`;
        exFolder.insertAdjacentHTML('beforeend', vrTempl);

        let featureTemp = `<div class="${scanvas.feat[0]}"><div class="smily"><object data="../assets/screenweb_asset/xyzsmileblack.svg"></object><p>${scanvas.feat[1]}</p></div><div class="${scanvas.feat[2]}"><p>${scanvas.feat[3]}<br><span>${scanvas.feat[4]}</span></p></div><div class="${scanvas.feat[5]}"><p>${scanvas.feat[6]}</p></div><div></div></div>`;
        exFolder.insertAdjacentHTML('beforeend', featureTemp);

        let services = document.createElement('div');
            services.setAttribute('class', scanvas.serv[0]);
        
        let servTemp = `<p class="${scanvas.serv[1]}">${scanvas.serv[2]}</p><p>${scanvas.serv[3]}</p><div class="${scanvas.serv[4]}"></div><div class="${scanvas.serv[5]}"><p>${scanvas.serv[6]}</p></div>`;
        services.insertAdjacentHTML('beforeend', servTemp);
        exFolder.insertAdjacentElement('beforeend', services);

        let xyzTop = document.createElement('div');
            xyzTop.setAttribute('class', 'xyztop');
        let topTri = document.createElement('div');
        let topStr = document.createElement('div');
            topStr.innerHTML = 'top';

        xyzTop.insertAdjacentElement('beforeend', topTri);
        xyzTop.insertAdjacentElement('beforeend', topStr);
        exFolder.insertAdjacentElement('beforeend',xyzTop);

    topDivScan.insertAdjacentElement('beforeend', exFolder);

    let closeFol = document.createElement('div');
        closeFol.setAttribute('class', scanvas.closed);
        
        let closeFolWrap = document.createElement('div');
            closeFolWrap.setAttribute('class', scanvas.closedWrap);

            let closeTemp = `<div><div class="${scanvas.closeGrey[0]}"><div class="${scanvas.closeGrey[1]}"></div></div><div class="${scanvas.wrapone[0]}"><div class="${scanvas.wrapone[1][0]}"></div><div class="${scanvas.wrapone[1][1]}"></div><div class="${scanvas.wrapone[1][2]}"></div></div></div>`;
            closeFolWrap.insertAdjacentHTML('beforeend', closeTemp);
        
            let forwardTemp = `<div class="${scanvas.forward[0]}"><p>${scanvas.forward[1]}</p></div>`;
            closeFolWrap.insertAdjacentHTML('beforeend', forwardTemp);

        closeFol.insertAdjacentElement('beforeend', closeFolWrap);

    topDivScan.insertAdjacentElement('beforeend', closeFol);

    //여기서부터 기능
    let xyzMouse = document.querySelector('.xyzmouse');
        xyzMouse.style.cursor = 'crosshair';
    let xyzDownLoad = document.querySelector('.xyzpc p');
        xyzDownLoad.style.cursor = 'crosshair';
    let xyzSerB = document.querySelector('.xyz-service-b');
        xyzSerB.style.cursor = 'crosshair';
    let scanBtn = document.querySelectorAll('.xyz-focus div');
    let firstMoveTo = document.querySelector('.xyz-focus');
        firstMoveTo.setAttribute('id', 'xyzfirst');
    let secondMoveTo = document.querySelector('.xyz-features');
        secondMoveTo.setAttribute('id', 'xyzsecond');
    let thirdMoveTo = document.querySelector('.xyz-service');
        thirdMoveTo.setAttribute('id', 'xyzthird');
    let photog = document.querySelector('.xyzphoto');
    let iframeBox = document.querySelector('.xyzvr');
    let moveTop = document.querySelector('.xyztop');
    let scanLogo = document.querySelector('.scanvas-logoimg');
        scanLogo.setAttribute('id', 'scanlogo');
    let viewopen = document.querySelector('.xyzviewopen');
    let vas = document.querySelector('.xyzvirtual');
    let vasOpen = document.querySelector('.vasopen');

    viewopen.addEventListener('click', function(){
        window.open("https://screenxyz.net/model-viewer");
    });
    vasOpen.addEventListener('click',function(){
        window.open("https://screenxyz.net/vas");
    })
    
    moveToTop(moveTop, '#scanlogo');

    let toPageBind = gltfObjs.slice(0, 3);
    toPageBind.forEach((e)=>{
        let modelBox = document.createElement('div');
            modelBox.setAttribute('class', 'xyz-models');
        let modelV = document.createElement('model-viewer');
            modelV.setAttribute('src', e.obj);
            modelV.setAttribute('alt', e.name);
            modelV.setAttribute('poster', e.poster);
            modelV.setAttribute('shadow-intensity', '1');
            modelV.setAttribute('camera-controls', true);
            modelV.setAttribute('touch-action', 'pan-y');
            modelV.setAttribute('auto-rotate', true);
        modelBox.insertAdjacentElement('beforeend', modelV);
        photog.insertAdjacentElement('beforeend', modelBox);
    });

    let iframe = document.createElement('iframe');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('width', '99.5%');
        iframe.setAttribute('allow', 'xr-spatial-tracking');
        iframe.setAttribute('src', `https://screenxyz.net/${scanvas.iframe[4]}`);
    iframeBox.insertAdjacentElement('beforeend', iframe);

    let downHref = 'https://screenxyz.net/wp-content/uploads/2023/07/scanvas_proposal.pdf';
    let goHref = 'https://screenxyz.net/details';

    closeFol.addEventListener('click', function(){
        // mainDivSwitcher(ourClass);
        topDivScan.style.height = '100%'
        this.style.display = 'none';
        exFolder.style.display = 'block';
    })

    scanBtn.forEach(function(e,i,a){
        let scanHref = ['https://screenxyz.net/model-viewer','https://screenxyz.net/necessaries','https://screenxyz.net/sujanggo','https://screenxyz.net/sujanggo','https://screenxyz.net/vas'];
        e.addEventListener('click', function(){
            window.open(scanHref[i]);
        })
    });

    xyzDownLoad.addEventListener('click', function(){
        window.open(downHref);
    });

    xyzMouse.addEventListener('click',function(){
        window.open(goHref);
    });

    xyzSerB.addEventListener('click', function(){
        window.open('https://screenxyz.net/contact/');
    });
    vas.addEventListener('click', function(){
        window.open('https://screenxyz.net/sanctum/');
    });

    let xyzFcl = document.querySelector('.xyzfolder');
    xyzFcl.addEventListener('click', function(e){
        let str = e.target.innerText
        
        if(typeof str === 'string'){
            switch(str){
                case '3D scan?':
                    document.location.href = `#xyzfirst`;
                break;

                case 'features' :
                    document.location.href = '#xyzsecond';
                break;

                case 'service' :
                    document.location.href = '#xyzthird';
                break;

                case 'space' :
                    window.open('https://screenxyz.net/spaces')
                break;                
            }
        }
    })
};
/** ============== if sketchbox page do this ================ */
if(topDivSketch !== null && topDivSketch !== undefined){
    const sketch = forBind.sketchbox;

    let brushBox = document.createElement('div');
        brushBox.setAttribute('class', sketch.brush);

    sketch.brushImg.forEach((e,i) => {
        let img = document.createElement('img');
            img.setAttribute('src', e);
        brushBox.insertAdjacentElement('beforeend', img);
    });
    topDivSketch.insertAdjacentElement('beforeend', brushBox);


    let worm_1 = document.createElement('div');
        worm_1.setAttribute('class', sketch.worm[0]);
    worm_1.insertAdjacentHTML('beforeend', sketch.svg);
    topDivSketch.insertAdjacentElement('beforeend', worm_1);

    let skeCont = document.createElement('div');
        skeCont.setAttribute('class', sketch.sCon[0]);

        let temp1 =`<div class="${sketch.sCon[1]}"><div class="${sketch.sCon[2]}"></div></div>`;
        skeCont.insertAdjacentHTML('beforeend', temp1);

        let temp2 = `<div class="${sketch.sCon[3]}"><p>${sketch.sCon[4]}</p></div>`;
        skeCont.insertAdjacentHTML('beforeend', temp2);
        
    topDivSketch.insertAdjacentElement('beforeend', skeCont);

    let worm_2 = document.createElement('div');
        worm_2.setAttribute('class', sketch.worm[1]);
    worm_2.insertAdjacentHTML('beforeend', sketch.svg);
    topDivSketch.insertAdjacentElement('beforeend', worm_2);

    let brush = document.querySelectorAll('.xyzbrush img');

    let brushrandom = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }

    brush.forEach(function(e,i,a){
        brush[i].style.top = `${brushrandom(0, window.innerHeight - 240)+50}px`;
        brush[i].style.left = `${brushrandom(0, window.innerWidth - 240)}px`;
    });

    let xyzpaint = function(e){
        let eleTop = document.querySelector('.elementor-location-header'); // 엘리멘터 헤더 높이 변수 저장
        
        let newBrush = ['../assets/screenweb_asset/brush1.png', '../assets/screenweb_asset/brush2.png', '../assets/screenweb_asset/brush3.png', '../assets/screenweb_asset/brush4.png'];
        let brushdiv = document.createElement('div');
            brushdiv.style.position = 'relative';
        let brushimg = document.createElement('img');
            brushimg.setAttribute('src', newBrush[rand(0, 3)]);

        brushdiv.insertAdjacentElement('beforeend', brushimg)
        if(eleTop){
            if(eleTop.clientHeight + 50 > e.y){ 
                brushdiv.style.top = `20px`;
            }else{
                brushdiv.style.top = `calc(${e.y}px - 8rem)`;
            }
        }
        // brushdiv.style.top = `calc(${e.y}px - 8rem)`;
        brushdiv.style.left = `calc(${e.x}px - 8rem)`;
        brushdiv.style.zIndex = '-10';


        document.querySelector('.xyzbrush').appendChild(brushdiv)

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };
    window.addEventListener('click', xyzpaint)

    let instaIcon = document.querySelector('.xyzinsta');
    instaIcon.addEventListener('click', ()=>{
        window.open(sketch.href)
    })
    instaIcon.classList.add('animate__animated');
    instaIcon.classList.add('animate__flash');
    instaIcon.classList.add('animate__infinite');
    instaIcon.classList.add('animate__slow');
};

/** ============== if meowart page do this ================ */
if(topDivMeow !== null && topDivMeow !== undefined){
    document.body.style.backgroundColor = '#88fd93';
    const meowart = forBind.meowart;

    let meowLogo = `<div class="${meowart.logoClass[0]}"><div class="${meowart.logoClass[1]}"></div></div>`;
    topDivMeow.insertAdjacentHTML('beforeend', meowLogo);

    let catImg = `<div class="${meowart.catClass}"><img src="${meowart.catImg}"></div>`;
    topDivMeow.insertAdjacentHTML('beforeend', catImg);

    if(isMobile()){
        let meowYoutube = `<div class="${meowart.youtubeClass}"><a href="${meowart.youtubeHref}" class="${meowart.youtubeHrefClass}" target="_blank">${meowart.youtubeStr[1]}</a></div>`;
        topDivMeow.insertAdjacentHTML('beforeend', meowYoutube);
    } else {
        let meowYoutube = `<div class="${meowart.youtubeClass}"><a href="${meowart.youtubeHref}" class="${meowart.youtubeHrefClass}" target="_blank">${meowart.youtubeStr[0]}</a></div>`;
        topDivMeow.insertAdjacentHTML('beforeend', meowYoutube);
    }
    
    let catJelly = `<div class="${meowart.catJellyClass}"><img src="${meowart.catJellyImg}"></div>`;

    topDivMeow.insertAdjacentHTML('beforeend', catJelly);

    const meowtablet = document.querySelector(`.${meowart.youtubeHrefClass}`);
    if(isNotHover()){
        let start = new Date().getTime();
        let counter = 0;
        let isPink = false;
        meowtablet.style.transition = `all 0.8s`;
        let changeColor = function() {
            let ts = new Date().getTime();
            if (ts - 12000 > start) {
            // console.log('End');
            } else {
                counter ++;
                if( counter % 60 === 0 ){
                    meowtablet.style.color = isPink ? '#fff' : '#ffaced';
                    isPink = !isPink;
                }
                requestAnimationFrame(changeColor);              
            }
        }
        requestAnimationFrame(changeColor);
    }

    let xyzTop = document.createElement('div');
        xyzTop.setAttribute('class', 'xyztop');
    let topTri = document.createElement('div');
    let topStr = document.createElement('div');
        topStr.innerHTML = 'top';

    xyzTop.insertAdjacentElement('beforeend', topTri);
    xyzTop.insertAdjacentElement('beforeend', topStr);
    topDivMeow.insertAdjacentElement('beforeend',xyzTop);


    let moveTop = document.querySelector('.xyztop');
    let meowLoImg = document.querySelector('.meowart-logo-img');
        meowLoImg.setAttribute('id', 'meowlogo')
    moveToTop(moveTop, '#meowlogo');
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

    let gpuText = `<div class="${gpu.txtClass}"><div class="smily g"><object data="../assets/screenweb_asset/xyzsmileblack.svg"></object></div><p>${gpu.txtStr}</p></div>`;
    secondBox.insertAdjacentHTML('beforeend', gpuText);

    let gpuAdd = `<div class="${gpu.addClass}"><p><a href="${gpu.addAHref}" class="${gpu.addAClass}" target="_blank">${gpu.addAstr}</a></p><a href="${gpu.instaHref}" class="${gpu.instaClass}" target="_blank"><div class="${gpu.instaSvgClass}"></div></a></div>`;
    secondBox.insertAdjacentHTML('beforeend', gpuAdd);

    firstBox.insertAdjacentElement('beforeend', secondBox);

    topDivGpu.insertAdjacentElement('beforeend', firstBox);

    let addForAni = document.querySelector(`.${gpu.addClass}`).firstChild;
        addForAni.setAttribute('class', 'animate__animated animate__bounce animate__infinite animate__slow');
    let instaForAni = document.querySelector(`.${gpu.instaSvgClass}`);
        instaForAni.classList.add('animate__animated');
        instaForAni.classList.add('animate__fadeIn');
        instaForAni.classList.add('animate__infinite');
        instaForAni.classList.add('animate__slow')
}

/** ============== if Design page do this ================ */
if(topDivDesign !== null && topDivDesign !== undefined){
    const de = forBind.design;

    let cover = document.createElement('div');
        cover.setAttribute('class', 'xyz-d-cover');
    
    makeLeftRight(de.logo);

    let palMain = document.createElement('div');
        palMain.setAttribute('class', de.palette.main);
        makeLogoBox(de.palette, palMain);
        let palBg = document.createElement('div');
            palBg.setAttribute('class', de.palette.bg);
        let weaveSvg = `<div class="${de.palette.weave}"></div>`;
            palBg.insertAdjacentHTML('beforeend', weaveSvg);
        palMain.insertAdjacentElement('beforeend', palBg);
    cover.insertAdjacentElement('beforeend', palMain);

    makeLeftRight(de.font)

    topDivDesign.insertAdjacentElement('beforeend', cover);

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
        cover.insertAdjacentElement('beforeend', main);
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

function moveToTop(topBtn, where){
    topBtn.addEventListener('click', function(){
        document.location.href = where;
    });
}