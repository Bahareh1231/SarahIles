
    let counter = 0;  

    let scrolling = false;

    let previousScroll = 0;

    let self = $('html');

    // let loadjs = require('../../node_modules/loadjs');

    //smooth scrolling

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('noScroll');
            $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top
            }, 1500, 'swing');
    });
   

    const app = {}

    // preload hero images and jquery

    app.preload = () => {
        loadjs(['../assets/Sarah-5931.jpg', '../styles/styles.css'], function() {
            // loaded
            console.log('load');
            
        })
    }

    // scroll event 
    app.scrollingEvent = () => {
        $(window).scroll(function(){
            scrolling = true;
            
        })
    }

    // appear on scroll effects 

    app.appearOnScroll = () => {
        $.each(self.find('.floatBefore'), function (index, item) {
            let elementTop = $(item).offset().top;
            let elementBottom = $(item).offset().top + $(item).outerHeight();
            let screenBottom = $(window).scrollTop() + window.innerHeight;
            let screenTop = $(window).scrollTop();

            if ((screenBottom > elementTop) && (screenTop < elementBottom)) {
                $(item).addClass('floatAfter');
            } // end of if statement    
        }) // end of loop
    }


    // make sure it doesn't scroll when an overlay is open
    app.stopScrollOverlay = () => {
        let navOverlayVisible = $('.navOverlay').hasClass('showNavOverlay');
        let galleryOverlayClosed = $('.galleryOverlay').hasClass('hideGallery');
        let mediaOverlayClosed = $('.mediaOverlay').hasClass('hideElement');

        if (navOverlayVisible || !galleryOverlayClosed || !mediaOverlayClosed) {
            $('body').addClass('noScroll');

        }
    }


    app.scrollUpNav = function () {

        let headerTop = $("header").offset().top;
        let headerBottom = $("header").offset().top + $("header").outerHeight();
        let screenBottom = $(window).scrollTop() + window.innerHeight;
        let screenTop = $(window).scrollTop();
        let navOverlayVisible = $('.navOverlay').hasClass('showNavOverlay');
        let galleryOverlayClosed = $('.galleryOverlay').hasClass('hideGallery');
        let mediaOverlayClosed = $('.mediaOverlay').hasClass('hideElement');

        let currentScroll = $(window).scrollTop();

        //scrolling up and no overlays are open
        if (currentScroll < previousScroll && !navOverlayVisible && galleryOverlayClosed && mediaOverlayClosed) {
            //no overlays are open and header is in view
            if (screenBottom > headerTop && screenTop < headerBottom) {
                $('.overlayButton').removeClass('hideButton navButtonScrollUp')
                } 

                // header is not in view
                else {
                $('.overlayButton')
                    .addClass('navButtonScrollUp')
                    .removeClass('hideButton');             
            }
        }
        
    
        //scrolling down and no overlays are open
        if (currentScroll > previousScroll && !navOverlayVisible && galleryOverlayClosed && mediaOverlayClosed ) {
            // header is in view
            if ((screenBottom > headerTop) && (screenTop < headerBottom)) {
                $('.overlayButton')
                    .removeClass('navButtonScrollUp hideButton')
            }
                    
            // header is not in view
            else {
            $('.overlayButton')
                .removeClass('navButtonScrollUp')
                .addClass('hideButton');
            }// end of else header is not in view
        } // end of scrolling down
            
        previousScroll = currentScroll;
        
    }

    // lazy load the thumbnails when approaching the gallery
    app.lazyLoadThumbs = function() {
        let galleryTop = $('.gallerySection').offset().top;
        let galleryBottom = $('.gallerySection').offset().top + $('.gallerySection').outerHeight();
        let screenBottom = $(window).scrollTop() + window.innerHeight;
        let screenTop = $(window).scrollTop();

        let imageArray = $('.galleryGrid img');

        if ((screenBottom > galleryTop) && (screenTop < galleryBottom)) {
            // console.log(imageArray);
            lazyLoadImages(imageArray);
            
        } // end of if statement    

    }


    app.scrollEffects = function() {
        setInterval(function(){
            if (scrolling = true) {
                scrolling = false;
                app.appearOnScroll();
                app.scrollUpNav();
                app.lazyLoadThumbs();
            } // end of if scrolling
        }, 250) // end of interval
    };


    app.navListItemsDroppingDown = () => {
        setTimeout(() => {
            $('.navListItem1').addClass('putNavListItemInPlace');            
        },150)

        setTimeout(() => {
            $('.navListItem2').addClass('putNavListItemInPlace'); 
        },300)

        setTimeout(() => {
            $('.navListItem3').addClass('putNavListItemInPlace'); 
        },450)

        setTimeout(() => {
            $('.navListItem4').addClass('putNavListItemInPlace'); 
        },600)

        setTimeout(() => {
            $('.navListItem5').addClass('putNavListItemInPlace'); 
        },750)
    }

    // button to view 2015/16 calendar events
    app.viewOldCalendar = () => {
        $('.view1516').on('click', (e) => {
            e.preventDefault();

            $('.events1718').addClass('fadeOut');
            setTimeout(() => {
                $('.events1718')
                    .removeClass('fadeOut')
                    .addClass('hideElement');
            }, 250),
            setTimeout(()=> {
                $('.events1516').removeClass('hideElement');
            },250)

            $('.secondHalfCalendar').addClass('hideCal');

            $('.readMoreCal').removeClass('hideElement');

            $('.view1516')
                .addClass('goldUnderLine noClick');
            $('.view1718')
                .removeClass('goldUnderLine noClick');

            $('.view1718para')
                .addClass('shrink');
            $('.view1516para')
                .removeClass('shrink');
        })
    }

    // button to view 2017/2018 calendar events
    app.viewNewCalendar = () => {
        $('.view1718').on('click', (e) => {
            e.preventDefault();

            $('.events1516').addClass('fadeOut');
            setTimeout(() => {
                $('.events1516')
                    .removeClass('fadeOut')
                    .addClass('hideElement');
            },200);
            setTimeout(() => {
                $('.events1718').removeClass('hideElement');
            },200);

            $('.secondHalfCalendar').addClass('hideCal');

            $('.readMoreCal').removeClass('hideElement');

            $('.view1718')
                .addClass('goldUnderLine noClick')
            $('.view1718para')
                .removeClass('shrink');
            $('.view1516')
                .removeClass('goldUnderLine noClick');
            $('.view1516para')
                .addClass('shrink')
        })
    }

    // ******** MEDIA SECTION CONTROLS *********

    app.showMedia1 = () => {
        $('.showMedia1').on('click', (e) => {
            e.preventDefault();
            $('.showMedia1').addClass('noClick --bold --gold').removeClass('--black');
            $('.showMedia2').removeClass('noClick --bold --gold').addClass('--black');
            $('.mediaSecond').fadeOut('200')
            setTimeout(() => {
                $('.mediaFirst').fadeIn('200');
            },400)
        })
    }

    app.showMedia2 = () => {
        $('.showMedia2').on('click', (e) => {
            e.preventDefault();
            $('.showMedia2').addClass('noClick --bold --gold').removeClass('--black');
            $('.showMedia1').removeClass('noClick --bold --gold').addClass('--black');
            $('.mediaFirst').fadeOut('200');
            setTimeout(() => {
                $('.mediaSecond').fadeIn('200');
            },400)
        })
    }

    // open selected video in overlay

    app.openVideo = function() {
        $('.mediaBox').on('click', function(e) {
            e.preventDefault();
            $('.mediaOverlay').removeClass('hideElement');
            $('body').addClass('noScroll');
            let videoURL = $(this).attr('data-src');
            $('.mediaOverlay iframe').attr('src', videoURL);
 
        })
    }

    // close media overlay

    app.closeMediaOverlay = () => {
        $('.closeMediaOverlay').on('click', (e) => {
            e.preventDefault();
            $('body').removeClass('noScroll');
            $('.mediaOverlay').addClass('fadeOut');
   
            setTimeout(() => {
                $('.mediaOverlay')
                    .removeClass('fadeOut')
                    .addClass('hideElement'); 
            }, 200)
            let blank = '';
            $('.mediaOverlay iframe').attr('src', blank);
        })
    }

    app.escapeMediaOverlay = () => {
        $("body").keydown(function (e) {
            let mediaOverlayVisible = $('.mediaOverlay').hasClass('hideElement');
            if (!mediaOverlayVisible && e.keyCode == 27) {
                $('.closeMediaOverlay').trigger('click');       
            } 
        }); 
    }

    // *********** GALLERY CONTROLS ***********

    // changes the number of total gallery items depending on which gallery is being viewed
    app.addTotalNumber = () => {
        // find how many items are in the chosen gallery
        let totalSlideNumbers = $('.galleryOverlay .showGallery').children().length;
        $('.totalPictures').empty().append(totalSlideNumbers);
    }

    // navigates back and forth between gallery items
    app.navigateGallery = (direction) => {
        

        let totalSlideNumbers = $('.galleryOverlay .showGallery').children().length;

        // array of pictures
        let carouselItems = $('.galleryOverlay .showGallery').children();

        $('.currentPicture').empty();
        $('.galleryOverlay .showGallery').find('.currentSlide').removeClass('currentSlide');
        counter = counter + direction;

        // go back to the last item of the carousel if clicking left while on the first picture
        if (direction === -1 && counter < 0) {
            counter = totalSlideNumbers - 1;
        }

        // go to the start of the carousel when you reach the end
        if (direction === 1 && !carouselItems[counter]) {
            counter = 0
        }

        if (direction === 'reset') {
            counter = 0
        }

        let displayedPicture = carouselItems[counter];
        
 
        $(displayedPicture).addClass('currentSlide');

        let pictureNumber = counter + 1;
        
        $('.currentPicture').empty().append(pictureNumber);
        app.addTotalNumber();
 
    }

    // EVENTS THAT MOVE FORWARD THROUGH THE CAROUSEL

    // event on pushing the right arrow
    app.navigateRight = () => {
        $('.galleryButtonRight').on('click', (e) => {
            e.preventDefault();
            app.navigateGallery(1);
            
        })
    }

    // event on swiping left aka moving forward on the gallery
    app.swipeLeft = () => {    

        $(window).on('swipeleft', function(event) {
            let galleryOverlayVisible = $('.galleryOverlay').hasClass('hideGallery');
            if (!galleryOverlayVisible) {
                app.navigateGallery(1);

            }      
        });
    }

    // EVENTS THAT MOVE BACKWARDS THROUGH THE CAROUSEL

    // event on pushing the left arrow
    app.navigateLeft = () => {
        $('.galleryButtonLeft').on('click', (e) => {
            e.preventDefault();
            app.navigateGallery(-1);
        })
    }

    // event on swiping right aka moving backwards in gallery

    app.swipeRight = () => {

        $(window).on('swiperight', function (event) {
            let galleryOverlayVisible = $('.galleryOverlay').hasClass('hideGallery');
            if (!galleryOverlayVisible) {
                app.navigateGallery(-1);

            }
        });
    }

    // left and right click navigation through carousel

    app.leftRightArrows = () => {
        $("body").keydown(function (e) {
            let galleryOverlayVisible = $('.galleryOverlay').hasClass('hideGallery');
            if (!galleryOverlayVisible && e.keyCode == 37) { // left
                $('.galleryButtonLeft').trigger('click');
            }
            else if (!galleryOverlayVisible && e.keyCode == 39) { // right
                $('.galleryButtonRight').trigger('click');
            }
        });
    }

    // OPEN GALLERY OVERLAY 
    app.openGalleryOverlay = function() {
        $('.openCarouselLink').on('click', function(e){
            e.preventDefault();
            let image = $(this).find('img').attr('data-image');
        })
    };


 

    // CHANGE BETWEEN GALLERIES

    // view portrait gallery
    app.viewPortrait = () => {
        $('.viewPortrait').on('click', (e) => {
            e.preventDefault();
            $('.galleryGrid .onstageGallery').fadeOut('200');
            setTimeout(() => {
                $('.galleryGrid .portraitGallery').fadeIn('200');
            },400);
            // buttons
            $('.viewPortrait').addClass('goldUnderLine');
            $('.viewOnstage').removeClass('goldUnderLine');
            $('.viewPortrait').addClass('noClick').removeClass('shrink');
            $('.viewOnstage').removeClass('noClick').addClass('shrink');

            $('.addHide').addClass('mediaHiddenImage');
            $('.viewMore').removeClass('hideElement');

            app.addTotalNumber(); // reset denominator 
            app.pictureNumber();
            //resets counter
            app.navigateGallery('reset');

        })
    }

    //view onstage gallery
    app.viewOnstage = () => {
        $('.viewOnstage').on('click', (e) => {
            e.preventDefault();

            // fade the gallries in and out when switching between them
            $('.galleryGrid .portraitGallery').fadeOut('200');
            setTimeout(() => {
                $('.galleryGrid .onstageGallery').fadeIn('200');
            }, 400);
            // buttons
            $('.viewOnstage').addClass('noClick goldUnderLine');
            $('.viewPortrait').removeClass('goldUnderLine');

            $('.viewOnstage').addClass('noClick').removeClass('shrink');
            $('.viewPortrait').removeClass('noClick').addClass('shrink');

            $('.addHide').addClass('mediaHiddenImage');
            $('.viewMore').removeClass('hideElement');

            app.addTotalNumber();// reset denominator
            app.pictureNumber();
            //resets counter
            app.navigateGallery('reset');
            
        })
    }

     // match the numerator with the place the picture has in the carousel
    app.pictureNumber = () => {
       
        let pictureValue = $('.galleryOverlay .showGallery').find('.currentSlide').val();

        $('.currentPicture').empty().append(pictureValue);

        
    }

    // Set the image src as its data attr
    let setImageSrcFromDataAttribute = (imageElement) => {
        let imageUrl = imageElement.data('src');
        imageElement.attr('src', imageUrl);
    }

    // loop through each of the images
    let lazyLoadImages = (imageElements) => {
        imageElements.each(function () {
            setImageSrcFromDataAttribute($(this));
        });
    }

    app.lazyLoadHeader = () => {
        lazyLoadImages($('.heroImage'))
    }


    // LAZY LOAD ON THE OVERLAY -> also opens the overlay
    app.LoadOverlay = function() {
        $('.openCarouselLink').on('click touch',function(e) {
            e.preventDefault();
            $('body').addClass('noScroll');
            let chosenGallery = $(this).parent().parent().parent();
            let galleryType = $(chosenGallery[0]).attr('class');
            
            if (galleryType === 'portraitGallery gallery showGallery'){
                let galleryToOpen = $('.galleryOverlay .portraitGallery')
                openOverlay(galleryToOpen, this);
                
            } else {
                let galleryToOpen = $('.galleryOverlay .onstageGallery')
                openOverlay(galleryToOpen, this);
                
            }

            
            lazyLoadImages($('.lazyOverlay'));

        })// end of event handler
    } //end of gallery open and lazy load



    let openOverlay = (galleryToOpen, chosen) => {
        $(galleryToOpen).addClass('showGallery')
        $('.galleryOverlay').removeClass('hideGallery');

        $('.galleryOverlay .currentSlide').removeClass('currentSlide');

        let clickedImage = $(chosen).find('img').attr('data-image');

        let images = [];
        images = galleryToOpen.find('img');

        $.each(images, function (index, value) {
       
            let picture = ($(value).attr('data-src'));
            
            if (clickedImage === picture) {
                $(value).parent().addClass('currentSlide')       
            }// end of ternary operator 
        })// end of loop
        let direction = $('.galleryOverlay .currentSlide').val();
        counter = 0;
        app.navigateGallery(direction - 1)
    }// end of overOverlay

    // close the gallery overlay

    app.closeGalleryOverlay = () => {
        $('.closeGalleryOverlay').on('click', (e) => {
            e.preventDefault();
            $('body').removeClass('noScroll');
            // make sure none of the galleries have a showGallery on them by default
            $('.galleryOverlay').addClass('fadeOut');
            setTimeout(() => {
                $('.galleryOverlay')
                    .find('.showGallery')
                    .removeClass('showGallery')
                $('.galleryOverlay')
                    .addClass('hideGallery')
                    .removeClass('fadeOut'); 
            },200)
        })
    }

    app.escapeGalleryOverlay = () => {
        $("body").keydown(function (e) {
            let galleryOverlayVisible = $('.galleryOverlay').hasClass('hideGallery');
            if (!galleryOverlayVisible && e.keyCode == 27) { // left
                $('.closeGalleryOverlay').trigger('click');
            }
        });
    }

    //scroll to the top 
    app.scrollTop = () => {
        $('.scrollTop').on('click', (e) => {
            e.preventDefault();
                $('html, body').animate({
                    scrollTop: $('html').offset().top
                }, 2000, 'swing');
        })
    }



    // *********** MOBILE CONTROLS ****************************************************

    // when pressing 'read more' in the bio section
    app.readMoreBio = () => {
        $('.readMoreBio').on('click', (e) => {
            e.preventDefault();
            $('.bioBlock').addClass('showBioElement');
            $('.bio2').removeClass('floatAfter');
            setTimeout(() => {
                $('.bio2').addClass('floatAfter');
            },100)
            $('.readMoreBio').addClass('hideBioElement');
            // $('.readLessBio').addClass('showBioElement');
        })
    }

    

    // when pressing 'read more' in the rep section
    app.readMoreRep = () => {
        $('.readMoreRep').on('click', (e) => {
            e.preventDefault();
            $('.repertoireList2').addClass('showBioElement');
            $('.repertoireList2').removeClass('floatAfter');
            setTimeout(() => {
                $('.repertoireList2').addClass('floatAfter');
            },100)
            $('.readMoreRep').addClass('hideBioElement');
            // $('.readLessRep').addClass('showBioElement');
        })
    }



    //when pressing 'view more' on the gallery 
    app.viewMore = () => {
        $('.viewMore').on('click', (e) => {
            e.preventDefault(); 
            $('.mediaHiddenImage')
                .removeClass('mediaHiddenImage')
                .addClass('noOpac');
            setTimeout(() => {
                $('.noOpac').removeClass('noOpac');  
            },200);

            $('.viewMore').addClass('hideElement');
            // $('.viewLess').removeClass('hideElement')
        })// end of event
    }


    // when pressing 'read more' in the studio section
    app.readMoreStudio = () => {
        $('.readMoreStudio').on('click', (e) => {
            e.preventDefault();
            $('.studio').addClass('showStudioElement');
            $('.studio').addClass('noOpacStudio');
            setTimeout(() => {
                $('.studio').removeClass('noOpacStudio');
            },100)
            $('.readMoreStudio').addClass('hideStudioElement');
            // $('.readLessStudio').addClass('showStudioElement');
        })
    }

    

    // when pressing 'read more' in the studio section
    app.readMoreSchool = () => {
        $('.readMoreSchool').on('click', (e) => {
            e.preventDefault();
            $('.school').addClass('showElementInline');

            $('.school').addClass('noOpacStudio');
            setTimeout(() => {
                $('.school').removeClass('noOpacStudio');
            }, 100)

            $('.schoolLink').addClass('showStudioElement');
            $('.readMoreSchool').addClass('hideStudioElement');
            // $('.readLessSchool').addClass('showStudioElement');
            $('.ellipsis').addClass('hideStudioElement');
        })
    }


    // pressing 'read more' on the calendar

    app.readMoreCal = () => {
        $('.readMoreCal').on('click', (e) => {
            e.preventDefault();
            $('.readMoreCal').addClass('hideElement');
            $('.hideCal').removeClass('hideCal');
            $('.secondHalfCalendar').addClass('noOpacCal');
            setTimeout(() => {
                $('.secondHalfCalendar').removeClass('noOpacCal');
            },100);
        })
    }

    // what happens when you press the button in mobile to bring up the nav
    app.navOverlayButton = () => {
        $('.overlayButton, .overlayNavListItem').on('click', (e) => {
            e.preventDefault();
            $('body').addClass('noScroll');
            let overlayShowing = $('.navOverlay').hasClass('showNavOverlay');
            if (!overlayShowing) {
               
                $('.overlayButton')
                    .addClass('navOverlayOpened')
                    .removeClass('navButtonScrollUp');
                $('.navOverlay').addClass('showNavOverlay navNoOpac');
                setTimeout(() => {
                    $('.navOverlay').removeClass('navNoOpac');
                },100);
    
                setTimeout(() => {
                    $('.overlayNavListItem1').fadeIn()
                },400);
    
                setTimeout(() => {
                    $('.overlayNavListItem2').fadeIn()
                },500);
    
                setTimeout(() => {
                    $('.overlayNavListItem3').fadeIn()
                }, 600);
    
                setTimeout(() => {
                    $('.overlayNavListItem4').fadeIn()
                }, 700);
                
                setTimeout(() => {
                    $('.overlayNavListItem5').fadeIn()
                }, 800);
                
            } else if (overlayShowing) {
                $('.navOverlay').addClass('navNoOpac');
                setTimeout(() => {
                    $('.navOverlay')
                        .removeClass('navNoOpac showNavOverlay');
                },300);
                $('.overlayNavListItem').fadeOut(500);
                $('.overlayButton').removeClass('navOverlayOpened');
                $('body').removeClass('noScroll');

            }
        })
    }

    // makes sure the item takes off the overflow hidden
    app.clickNavItem = () => {
        $('.overlayNavLink').on('click', (e) => {
            e.preventDefault();
            setTimeout(() => {
                $('body').removeClass('noScroll');
            },1600);
        })
    }


    app.init = () => {
        // app.preload();
        app.scrollingEvent();
        app.scrollEffects();
        // app.scrollUpNav();
        app.viewOldCalendar();
        app.viewNewCalendar();
        app.navListItemsDroppingDown();
        app.addTotalNumber();
        app.navigateLeft();
        app.navigateRight();
        app.viewPortrait();
        app.viewOnstage();
        app.pictureNumber();
        app.swipeLeft();
        app.swipeRight();
        app.leftRightArrows();
        app.scrollTop();
        app.lazyLoadHeader();
        app.readMoreBio();
        app.readMoreRep();
        app.readMoreCal();
        app.viewMore();
        app.readMoreStudio();
        app.readMoreSchool();
        app.openGalleryOverlay();
        app.LoadOverlay();
        app.closeGalleryOverlay();
        app.escapeGalleryOverlay();
        app.showMedia1();
        app.showMedia2();
        app.closeMediaOverlay();
        app.escapeMediaOverlay();
        app.openVideo();
        app.navOverlayButton();
        app.clickNavItem();
    }

    $(function() {
        app.init();
    });

    // COMMENTED OUT FUNCTIONS

    // when pressing 'read less' in the studio section
    // app.readLessSchool = () => {
    //     $('.readLessSchool').on('click', (e) => {
    //         e.preventDefault();
    //         $('.school').removeClass('showElementInline');
    //         $('.schoolLink').removeClass('showStudioElement');
    //         $('.readMoreSchool').removeClass('hideStudioElement');
    //         $('.readLessSchool').removeClass('showStudioElement');
    //     })
    // }

    // when pressing 'read less' in the studio section
    // app.readLessStudio = () => {
    //     $('.readLessStudio').on('click', (e) => {
    //         e.preventDefault();
    //         $('.studio').removeClass('showStudioElement');
    //         $('.readMoreStudio').removeClass('hideStudioElement');
    //         $('.readLessStudio').removeClass('showStudioElement');
    //     })
    // }

    //when pressing 'view less' on the gallery
    // app.viewLess = () => {
    //     $('.viewLess').on('click', (e) => {
    //         e.preventDefault();
    //     })

    // }

    // when pressing 'read less' in the bio section
    // app.readLessBio = () => {
    //     $('.readLessBio').on('click', (e) => {
    //         e.preventDefault();
    //         $('.bioBlock').removeClass('showBioElement');
    //         $('.readMoreBio').removeClass('hideBioElement');
    //         $('.readLessBio').removeClass('showBioElement');
    //     })
    // }

    // when pressing 'read less' in the rep section
    // app.readLessRep = () => {
    //     $('.readLessRep').on('click', (e) => {
    //         e.preventDefault();
    //         $('.repertoireList2').removeClass('showBioElement');
    //         $('.readMoreRep').removeClass('hideBioElement');
    //         $('.readLessRep').removeClass('showBioElement');
    //     })
    // }


    // app.lazyLoad = () => {
    //     let galleryTop = $(".gallerySection").offset().top;
    //     let galleryBottom = $(".gallerySection").offset().top + $(".gallerySection").outerHeight();
    //     let screenBottom = $(window).scrollTop() + window.innerHeight;
    //     let screenTop = $(window).scrollTop();

    //     if ((screenBottom > galleryTop) && (screenTop < galleryBottom)) {
    //         lazyLoadImages($('.lazy'))
    //


    //     } else {
    //         $(window).scroll(function () {
    //             let galleryTop = $(".gallerySection").offset().top;
    //             let galleryBottom = $(".gallerySection").offset().top + $(".gallerySection").outerHeight();
    //             let screenBottom = $(window).scrollTop() + window.innerHeight;
    //             let screenTop = $(window).scrollTop();

    //             if ((screenBottom > galleryTop) && (screenTop < galleryBottom)) {
    //                 lazyLoadImages($('.lazy'));
    //                 console.log('hey');


    //             }
    //         })
    //     }
    // };