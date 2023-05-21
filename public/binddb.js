const forBind = {
    main : {
        midbox : {
            liClass : 'li-group-item',
            spanClass : 'material-icons-outlined',
            liIcon : ['expand_more', 'navigate_next', 'navigate_next', 'navigate_next', 'navigate_next'],
            liStr : ['screenxyz', 'scanvas', 'sketchbox', 'meowart', 'GPU'],
        },
        rightBox : {
            divClass : 'li-contents',
            divCon : [
                ['screenxyz ( studio )는 어쩌구저쩌구 입니다.','그래서 무슨 콘텐츠가 있습니다.','','x','x'],
                ['3d scan . . .', '', '▶ go library', 'logo-imgbox', 'scanvas-logo'],
                ['누구든지 원하는 작업물을 올리는 공간입니다.', '', '▶ go library', 'logo-imgbox', 'sketchbox-logo'],
                ['https://www.youtube.com/<br>@meowart_o_o', '', '▶ go library', 'logo-imgbox', 'meowart-logo'],
                ['전시를 기획하고 운영하는 공간입니다.', '', '▶ go library', 'logo-imgbox', 'gpu-logo' ]
            ]
        }
    },
    meowart : {
        logoClass : ['meowart-logo-img', 'meowart-logo-white'],
        catClass : 'cat-img',
        catImg : './meowart-cat.png',
        youtubeClass : 'meowart-youtube',
        youtubeHref : 'https://www.youtube.com/@meowart_o_o',
        youtubeHrefClass : 'meowaccount',
        youtubeStr : 'https://<br>www.youtube.com/<br>@meowart_o_o',
        catJellyClass : 'cat-img-jelly',
        catJellyImg : './meowart-jelly.png'
    },
    scanvas : {
        dummy2 : 'dummy'
    },
    gpu : {
        firBoxClass : 'postoutline',
        secBoxClass : 'post-contents',
        firLogoClass : 'gpu-logoimg',
        secLogoclass : 'gpu-logo-post',
        txtClass : 'gpu-text',
        txtSmile : 'smile',
        txtStr : '.GPU는 전시를 기획하고,<br>온라인 공간 및 오프라인 공간을<br>대여해드리고 있어요',
        addClass : 'gpu-adress',
        addAClass : 'gpu-web',
        addAHref : 'https://gpuseoul.com',
        addAstr : 'gpuseoul.com',
        instaClass : 'gpu-insta',
        instaHref : 'https://www.instagram.com/gpuseoul/',
        instaSvgClass : 'xyzinsta'
    },
    design : {
        logoBox : 'xyzd-logobox',
        weaveDivs : 8,
        logo : {
            main : 'xyzdesign logo',
            circle : 'xyz-d-circle logo',
            title : 'xyz-d-logotitle',
            bg : 'xyzd-l-background',
            top : 'xyz-l-b top',
            mid : 'xyz-l-b mid',
            midCon : 'xyzd-l-con',
            logoArr : ['xyzlogo_black', 'screenxyz_logo_black', 'scanvas-logoimg', 'sketchbox_logo_black', 'meowart_logo_black', 'gpu_logo_black'],
            logoPng : './sketchbox_logo_black.png',
            bottom : 'xyz-l-b bottom'        
        },
        palette : {
            main : 'xyzdesign palette',
            circle : 'xyz-d-circle palette',
            title : 'xyz-d-p-title',
            bg : 'xyzd-p-background',
            weave : 'xyz-weave',
        },
        font : {
            main : 'xyzdesign font',
            circle : 'xyz-d-circle font',
            title : 'xyz-d-fonttitle',
            bg : 'xyzd-f-background',
            top : 'xyz-f-b top',
            mid : 'xyz-f-b mid',
            strWrapper : 'xyzd-f-con',
            str : ['D2Coding ligature', 'Rubik Puddles', '둥근모꼴', 'IBM Plex sans KR', 'UhBee mysen', 'Raleway'],
            bottom : 'xyz-f-b bottom'
        }
    }
}
export default forBind;
