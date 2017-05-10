function ready(cb) {
    /in/.test(document.readyState)
        ? setTimeout(ready.bind(null, cb), 90)

        : cb();
};
window.onload = function(){

    if(getCookie('intro')){
        if(document.querySelector('.intro-page')) {
            document.querySelector('.intro-page').classList.add("gone");
            document.querySelector('.wrapper').classList.remove("intro-animating");
            setCookie('intro', true, 0.2);
        }
    }

}
var App;
ready(function(){
    App = {
        "init": function () {
            window.mobileAndTabletcheck();
            this.bindEventListeners();
            App.nav.init();
            App.sidebar.init();
            App.contact.init();
            App.header.init();
            App.intro.init();
            App.news.init();
            App.background.init();
        },
        "bindEventListeners":function(){

        },
        "header": {
            "state":false,
            "init":function(){
                if(document.querySelector('.overview-toggle')){
                    App.header.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                var gridIcon = document.querySelector('.overview-toggle');
                gridIcon.addEventListener("mouseover", function () {
                    gridIcon.classList.remove("offhover");
                    gridIcon.classList.add("hover");
                    gridIcon.classList.add("link");
                });
                gridIcon.addEventListener("mouseleave", function () {
                    gridIcon.classList.remove("hover");
                    gridIcon.classList.remove("link");
                    gridIcon.classList.add("offhover");
                });
                gridIcon.addEventListener("click", function () {
                    window.history.back();
                })
            }
        },
        "nav":{
            "state":false,
            "init":function(){
                if(document.querySelector('.menu-toggle.menu')){
                    App.nav.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                //console.log("Binding Menu events");
                var icon = document.querySelector('.menu-toggle.menu');
                icon.addEventListener("click", function () {
                    var self = this;
                    App.nav.toggleNavigation();
                });
            },
            'toggleNavigation':function(){
                var icon = document.querySelector('.menu-toggle.menu');
                var body = document.querySelector('body');
                var navigation = document.querySelector('.navigation');
                if (App.nav.state) {
                    icon.classList.remove("active");
                    body.classList.remove("nav-open");
                    navigation.classList.remove("active");
                    App.nav.state = false;
                } else {
                    body.classList.add("nav-open");
                    icon.classList.add("active");
                    navigation.classList.add("active");
                    App.nav.state = true;
                }
            },
        },
        "sidebar":{
            "state":false,
            "shareState":false,
            "init":function(){
                if(document.querySelector('.sidebar-toggle')){
                    App.sidebar.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                //console.log('Binding sidebar events');

                var closer = document.querySelector('.sidebar-toggle');
                var shareToggle = document.querySelector('.share-toggle');
                var shareBox = document.querySelector('.share-container');
                var sidebar = document.querySelector('.sidebarContainer');
                var sidebarBox = document.querySelector('.sidebarContainer .bg-box');
                var content = document.querySelector('.detail-page-container');
                closer.addEventListener("click", function () {
                    if (App.sidebar.state) {
                        sidebar.classList.remove("shrink");
                        content.classList.remove("grow");
                        App.sidebar.state = false;
                    } else{
                        sidebar.classList.add("shrink");
                        content.classList.add("grow");
                        App.sidebar.state = true;
                    }
                });
                sidebarBox.addEventListener("click", function () {
                    if (App.sidebar.state) {
                        sidebar.classList.remove("shrink");
                        content.classList.remove("grow");
                        App.sidebar.state = false;
                    }
                });
                if(window.mobileAndTabletcheck()){
                    shareToggle.addEventListener("touchstart", function () {
                        var timout;
                        if (!App.sidebar.shareState) {
                            shareToggle.classList.add('active');
                            App.sidebar.shareState = true;
                        } else {
                            shareToggle.classList.remove('active');
                            App.sidebar.shareState = false;
                        }
                    });
                } else {
                    shareToggle.addEventListener("mouseenter", function () {
                        var timout;
                        if (!App.sidebar.shareState) {
                            shareToggle.classList.add('active');
                            App.sidebar.shareState = true;
                        }
                        shareBox.addEventListener("mouseleave", function () {
                            timout = setTimeout(function () {
                                shareToggle.classList.remove('active');
                                App.sidebar.shareState = false;
                            }, 3000);
                        });
                        shareBox.addEventListener("mouseenter", function () {
                            clearTimeout(timout);
                        });
                    });
                }
            }
        },
        'contact': {
            "message":null,
            "form":null,
            "statusMessage":null,
            "init":function(){
                if(document.querySelector('.contact-form')){
                    App.contact.bindEventListeners();
                }
            },
            "bindEventListeners":function(){
                if(document.querySelector('#gmap')){
                    App.contact.map.load();
                }
                document.querySelector('.form-btn').addEventListener("click", function (event) {
                    event.preventDefault();
                    App.contact.send();
                });
                document.onkeydown = function (e) {
                    e = e || window.event;
                    switch (e.which || e.keyCode) {
                        case 13 : //Your Code Here (13 is ascii code for 'ENTER')
                            App.contact.send();
                            break;
                    }
                }
                $('.form-item').each(function(){
                    var self = $(this);
                    self.on("focusout", function() {
                        self.removeClass('error');
                    });
                });
                App.contact.message = new Object();
                App.contact.message.loading = 'Versturen...';
                App.contact.message.success = 'Bedankt. Uw bericht is verzonden!';
                App.contact.message.failure = 'Oeps! Er was een probleem bij het versturen van je bericht!';
                App.contact.form = document.forms[0];

                App.contact.statusMessage = document.createElement('div');
                App.contact.statusMessage.className = 'status';
            },
            "send":function(){
                var button = document.querySelector('.form-btn');
                button.classList.add("fly-away");
                var error = false;
                var subject = $('.contact-form  #contact-subject').val(),
                    vmail = $('.contact-form  #contact-mail').val(),
                    name = $('.contact-form  #contact-name').val(),
                    message = $('.contact-form  #contact-message').val(),
                    gotcha = $('.contact-form  #contact-gotcha').val();

                if(!(vmail !== 'undefined' && vmail.length > 0 && vmail !== $('.contact-form #contact-mail').attr('placeholder'))) { $('.contact-form #contact-mail').addClass('error'); error = true; }
                if(!(name !== 'undefined' && name.length > 0 && name !== $('.contact-form #contact-name').attr('placeholder'))) { $('.contact-form #contact-name').addClass('error'); error = true; }
                if(!(subject !== 'undefined' && subject.length > 0 && subject !== $('.contact-form #contact-subject').attr('placeholder'))) { $('.contact-form #contact-subject').addClass('error'); error = true; }
                if(!(message !== 'undefined' && message.length > 0 && message !== $('.contact-form #contact-message').attr('placeholder'))) { $('.contact-form #contact-message').addClass('error'); error = true; }
                if(!isValidEmailAddress(vmail)) { $('.contact-form #contact-mail').addClass('error'); error = true; }
                if(gotcha.length > 0){ console.log('You are spammer and I caught ya bruh'); error = true; }

                if(!error){
                    //console.log('Sending message to: '+vmail +' with subject: ' +subject+' and the message: '+message );
                    $.ajax({
                        url: 'https://formspree.io/jensdwul1@student.arteveldehs.be',
                        method: 'POST',
                        data: {
                            "Naam":name,
                            "Email":vmail,
                            "_subject":"Arteveldehogeschool Trots:"+subject,
                            "Onderwerp":subject,
                            "Boodschap":message,
                        },
                        dataType: 'json',
                        beforeSend: function() {
                            App.contact.statusMessage.innerHTML = App.contact.message.loading;
                            $(button).attr('disabled', true);
                            console.log('Sending');
                        },
                        success: function(data) {
                            console.log('Great success');
                            App.contact.form.insertAdjacentHTML('beforeend', App.contact.message.success);
                            setTimeout(function(){
                                $(button).attr('disabled', false);
                                button.classList.remove("fly-away");
                            },1000);
                        },
                        error: function(err) {
                            App.contact.form.insertAdjacentHTML('beforeend', App.contact.message.failure);
                            console.log('Great FAILURE');
                            setTimeout(function(){
                                $(button).attr('disabled', false);
                                button.classList.remove("fly-away");
                            },1000);
                        }
                    });
                } else {

                }
            },
            "map":{
                "initialised":false,
                "initGoogleMaps":function(){
                    this.initialised = true;
                    App.contact.map.init();
                },
                "init":function(){
                    var myLatlng = new google.maps.LatLng(51.0873012,3.667899); // Add the coordinates

                    var mapOptions = {
                        zoom:15,
                        center: new google.maps.LatLng(51.0873012,3.667899),
                        panControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        overviewMapControl: false,
                        zoomControl: false,
                        styles: [
                            {
                                "featureType": "administrative",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#444444"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "color": "#f2f2f2"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 45
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "color": "#dbdbdb"
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            }
                        ],
                        scrollwheel: false
                    }
                    App.contact.map._map = new google.maps.Map(document.querySelector('#gmap'), mapOptions);
                    google.maps.visualRefresh = true;
                    google.maps.event.trigger(App.contact.map._map, 'resize');
                    App.contact.map._geoLocationMarker = new google.maps.Marker({
                        position: myLatlng,
                        icon: '/assets/img/logo/marker.png',
                        title: 'Arteveldehogeschool Campus Mariakerke.',
                        size: new google.maps.Size(35, 32),
                    });
                    var contentString = '<div class="map-marker-info">' +
                        '<h4>Arteveldehogeschool Campus Mariakerke</h4>'+
                        '<p>Industrieweg 232 - 9030 Gent<br>Belgie '+
                        '<br>T. +32(0)9 234 86 00'+
                        '</p>'+
                        ''+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    google.maps.event.addListener(App.contact.map._geoLocationMarker, 'click', function() {
                        infowindow.open(App.contact.map._map,App.contact.map._geoLocationMarker);
                    });
                    App.contact.map._geoLocationMarker.setMap(App.contact.map._map);
                    window.onresize = function(event) {
                        App.contact.map.resize(myLatlng);
                    }
                    App.contact.map.controlBind();

                },
                "load":function(){
                    var key = 'AIzaSyBdn8xMIp4qHAWal3I2VZ9QfxmS4UvWCGg'; // Use your own Key!
                    //Load Google Maps Async
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
                        + '&key=' + key
                        + '&callback=App.contact.map.initGoogleMaps';
                    document.body.appendChild(script);

                },
                'resize': function(myLatlng){
                    google.maps.event.trigger(App.contact.map._map, 'resize');
                    App.contact.map._map.setCenter(myLatlng);
                },
                'controlBind':function(){
                    google.maps.event.addDomListener(zoomout, 'click', function() {
                        var currentZoomLevel = App.contact.map._map.getZoom();
                        if(currentZoomLevel != 0){
                            App.contact.map._map.setZoom(currentZoomLevel - 1);}
                    });

                    google.maps.event.addDomListener(zoomin, 'click', function() {
                        var currentZoomLevel = App.contact.map._map.getZoom();
                        if(currentZoomLevel != 21){
                            App.contact.map._map.setZoom(currentZoomLevel + 1);}
                    });
                }
            },
        },
        'intro':{
            'sources': {
                'active': 'default',
                'default': [
                    '/assets/video/landingpage.mp4',
                    '/assets/video/landingpage.webm',
                    '/assets/video/landingpage.ogv'
                ],
                'mobile': [
                    '/assets/video/landingpagemobile.mp4',
                    '/assets/video/landingpagemobile.webm',
                    '/assets/video/landingpagemobile.ogv'
                ]
            },
            'timer':setTimeout(function(){},60000),
            'init':function(){
                if(document.querySelector('.intro-page')){
                    App.intro.bindEventListeners();
                    if(!getCookie('intro')){
                        document.querySelector('.wrapper').classList.add("intro-animating");
                        App.intro.timer = setTimeout(function(){ App.intro.hide();},60000);
                    } else {
                        //App.intro.hide();
                    }
                }
            },
            'bindEventListeners':function(){
                var btn = document.querySelector('.intro-continue-button');
                btn.addEventListener("click", function () {
                    var self = this;
                    App.intro.hide();
                });

                var backToVideo =  document.querySelector('.backToVid');
                backToVideo.addEventListener("click", function () {
                    var self = this;
                    App.intro.show();
                });
                document.querySelector('.intro-page').addEventListener('touchmove',function(){
                    App.intro.hide();
                });
                document.querySelector('.intro-page').addEventListener('wheel',function(){
                    App.intro.hide();
                });
                window.onresize = function(event) {
                    App.intro.resize();
                }
                App.intro.resize();
            },
            'resize': function(){
                var vid = document.querySelector('.video-container video');
                var sources = vid.querySelectorAll('source');
                var width = $(window).width();
                var progression = vid.currentTime;
                if(width >= 700 && App.intro.sources.active !== 'default'){
                    var i = 0;
                    [].forEach.call(sources, function(source) {
                        source.src = App.intro.sources.default[i];
                    });
                    App.intro.sources.active = 'default';
                    vid.load();
                    //vid.currentTime = progression;
                } else if(width <= 700 && App.intro.sources.active !== 'mobile') {
                    var i = 0;
                    [].forEach.call(sources, function(source) {
                        source.src = App.intro.sources.mobile[i];
                    });
                    App.intro.sources.active = 'mobile';
                    vid.load();
                    //vid.currentTime = progression;
                }
            },
            'hide':function(){
                document.querySelector('.intro-page').classList.add("hide");
                document.querySelector('.wrapper').classList.add("popin");
                setTimeout(function(){
                    document.querySelector('.video-container video').pause();
                    document.querySelector('.wrapper').classList.remove("intro-animating");
                    document.querySelector('.intro-page').classList.add("gone");
                    document.querySelector('.intro-page').classList.remove("hide");
                    setCookie('intro',true,0.2);
                },710);
                clearTimeout(App.intro.timer);
            },
            'show':function(){
                document.querySelector('.video-container video').currentTime = 0;
                document.querySelector('.video-container video').play();
                document.querySelector('.intro-page').classList.remove("gone");
                document.querySelector('.intro-page').classList.add("show");
                document.querySelector('.wrapper').classList.add("intro-animating");
                document.querySelector('.wrapper').classList.add("hide");
                setTimeout(function(){
                    document.querySelector('.intro-page').classList.remove("show");
                    document.querySelector('.wrapper').classList.remove("hide");
                    document.querySelector('.wrapper').classList.remove("popin");
                },710);
            }

        },
        "news":{
            'currentTopic':null,
            'currentKey':0,
            'animating':false,
            "topics":null,
            'topics_length':0,
            'autoplay':{
                'duration': 8000,
                'timer':null,
                'pause':function(){
                    document.querySelector('.news-timer').classList.remove('animate');
                    clearTimeout(App.news.autoplay.timer);
                  },
                'play':function(){
                    App.news.autoplay.timer = setTimeout(function(){
                        if(App.news.currentKey >= (App.news.topics_length - 1)){
                            App.news.currentKey = 0;
                            App.news.show(App.news.topics[0]);
                        } else {
                            App.news.show(App.news.topics[++App.news.currentKey]);
                        }
                        App.news.autoplay.play();
                    },App.news.autoplay.duration);
                  }
            },
            'init':function(){
                if(document.querySelector('.news')) {
                    App.news.bindEventListeners();
                    App.news.topics = document.querySelectorAll('.news-container .news-topic');
                    App.news.topics_length = App.news.topics.length;
                    App.news.currentKey = 0;
                    App.news.show(App.news.topics[0]);
                    if(App.news.topics.length > 1){
                        App.news.autoplay.play();
                        document.querySelector('.news-timer').classList.add('animate');
                    } else {
                        document.querySelector('.news-timer').classList.add('hidden');
                    }
                }
            },
            'bindEventListeners':function(){
                var newsOpener = document.querySelector('.news-toggle'),
                    newsCloser = document.querySelector('.news-closer'),
                    newsBox = document.querySelector('.news-container'),
                    newsUberBox = document.querySelector('.intro-container');

                newsOpener.addEventListener("click", function () {
                    newsBox.classList.add('active');
                    newsUberBox.classList.add('news-active');
                    if(App.news.topics.length > 1) {
                        App.news.autoplay.play();
                        document.querySelector('.news-timer').classList.add('animate');
                    }
                });
                newsCloser.addEventListener("click", function () {
                    newsBox.classList.remove('active');
                    newsUberBox.classList.remove('news-active');
                    App.news.autoplay.pause();
                });
            },
            'show':function(topic){
                if(!App.news.animating) {
                    App.news.animating = true;
                    if(App.news.currentTopic !== null){
                        App.news.currentTopic.classList.add('animate-out');
                    }
                    //console.log('topic',App.news.topics);
                    document.querySelector('.news-container .news-content-bg').classList.add('animate');
                    topic.classList.add('animate-in');
                    setTimeout(function () {
                        document.querySelector('.news-container .news-content-bg').classList.remove('animate');
                        if(App.news.currentTopic !== null) {
                            App.news.currentTopic.classList.remove('active');
                            App.news.currentTopic.classList.remove('animate-out');
                        }
                        setTimeout(function () {
                            topic.classList.add('active');
                            if(App.news.currentTopic !== null) {
                                App.news.currentTopic.classList.remove('animate-in');
                            }
                            App.news.currentTopic = topic;
                            App.news.animating = false;
                        }, 200);
                    }, 400);
                }
            }

        },
        "background":{
            'init':function(){
                if(document.querySelector('.home')) {
                    document.querySelector('.bg').classList.add('animate');
                }

            },
            "animateShapes":function(e){

                var movementStrength = 20;
                var height = movementStrength / $(window).height();
                var width = movementStrength / $(window).width();

                var pageX = e.pageX - ($(window).width() / 4);
                var pageY = e.pageY - ($(window).height() / 4);
                var newvalueX = width * pageX * -1 + movementStrength;
                var newvalueY = height * pageY * -1 + movementStrength;
                var newvalue2X = width * pageX * 1 - movementStrength;
                var newvalue2Y = height * pageY * 1 - movementStrength;
                $('.sh1').css("background-position", newvalueX+"px     "+newvalueY+"px");
                $('.sh2').css("background-position", newvalue2X+"px     "+newvalue2Y+"px");

            },
        }
    };

    App.init();

});