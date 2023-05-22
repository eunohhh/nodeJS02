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
    scanvas : {
        logo : 'scanvas-logoimg',
        ex : 'xyz-exfolder',
        exUp : 'xyzfolder-upper',
        exFol : 'xyzfolder',
        xyz4 : [
                ['threedscan xyz4', 'xyzline grey', '3D scan?'],
                ['xyzfeatures xyz4', 'xyzline green', 'features'],
                ['xyzservice xyz4', 'xyzline sky', 'service'],
                ['xyzspace xyz4', 'xyzline yellow', 'space' ] 
        ],
        cont : 'scanvas-contents',
        contIn : 'xyz-3dscan',
        contStr : '3D SCAN은 공간 및 오브젝트를 촬영하여<br>실제공간의 점군(pointcloud)정보를 취득하고<br>이를 바탕으로 3D 가상공간을 생성해내는 기술입니다.<br>사진, 영상 등 2D 데이터가 X,Y 값만 가지는 평면 정보라면,<br>3D SCAN은 X,Y,Z의 정보값을 가지는 입체적인 3차원 데이터입니다.',
        contFocus : 'xyz-focus',
        vr : ['xyz3d', '[VR]', 'xyzvr','[photogrammetry]', 'xyzphoto'],
        feat : ['xyz-features', '◡̈ 다양한 가능성을 확인해 보세요', 'xyzpc', '제안서다운로드', 'download', 'xyzmouse', 'gogo'],
        serv : ['xyz-service', 'xyz-servicetltle', '[service]', '안녕하세요.<br>scanvas에서 VR 및 photogrammetry 촬영은 상담 후 진행합니다.<br>3D scan 촬영을 원하신다면 contact페이지의 전화, e-mail 혹은<br>contact 페이지 내의 문의 폼을 사용하여 문의를 남겨주세요.<br>빠르게 답변해드리겠습니다.','xyz-pencil','xyz-service-b','contact'],
        closed : 'xyz-closefolder',
        closedWrap : 'xyzfolder-wrap',
        closeGrey : ['xyz-grey', 'xyz-grey-line'],
        wrapone : ['wrapone', ['xyzlinewrap green', 'xyzlinewrap sky', 'xyzlinewrap yellow']],
        forward : ['xyzforward', 'open']

    },
    sketchbox : {
        brush : 'xyzbrush',
        brushImg : ['../screenweb_asset/brush1.png', '../screenweb_asset/brush2.png', '../screenweb_asset/brush3.png', '../screenweb_asset/brush4.png'], // 최종적용시 확인
        href : 'https://www.instagram.com/sketchbox.xyz/',
        sCon : ['sketch-contents', 'skechboxinsta', 'xyzinsta', 'skechboxaccount', '.sketchbox{<br>&nbsp&nbsp&nbsp&nbspdisplay: flex;<br>&nbsp&nbsp&nbsp&nbspbackground: #fff;<br>}'],
        worm : ['xyzworm', 'xyzworm right'],
        svg : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.32 34.34"><path class="cls-1" fill="white" stroke="black" stroke-width="4" stroke-linecap="round" d="m2.61,4.52c5.48-.06,11.24,25.9,16.72,25.84S29.99,4.22,35.47,4.15s11.24,25.9,16.72,25.84S62.85,3.85,68.33,3.78s11.24,25.9,16.72,25.84S95.71,3.48,101.18,3.42s11.24,25.9,16.72,25.84"/><animate attributeType="CSS" attributeName="opacity" from="1" to="0" dur="3s" repeatCount="indefinite" /></svg>`
    },
    meowart : {
        logoClass : ['meowart-logo-img', 'meowart-logo-white'],
        catClass : 'cat-img',
        catImg : '../screenweb_asset/meowart-cat.png',
        youtubeClass : 'meowart-youtube',
        youtubeHref : 'https://www.youtube.com/@meowart_o_o',
        youtubeHrefClass : 'meowaccount',
        youtubeStr : 'https://<br>www.youtube.com/<br>@meowart_o_o',
        catJellyClass : 'cat-img-jelly',
        catJellyImg : '../screenweb_asset/meowart-jelly.png'
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
            logoPng : '../screenweb_asset/sketchbox_logo_black.png',
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
