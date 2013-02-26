/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var pageIndex = null;
var stackIndex = null;
var stack = null;
var stackLenght = null;
var stacksLenght = null;




var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // do we need to check if jquery is ready ?
        $(document).ready(function(){
            // $('#test').html('app ready')

            // swipe widget
            $(window).swipe_widget();
            $(window).bind('swipe_widget_swipe', 0, function(e, direction){
                clickHandler(direction);
            })

            // listeners
            $('.page a').click(function(e){
                e.preventDefault();
                clickHandler( $(this).attr('href') );
            });

            function clickHandler(dir)
            {
                dir = dir.replace('#', '');
                
                stack = $('.page.active').closest('.stack');
                stackLength = stack.find('.page').length;
                stacksLength = $('.stack').length;
                
                pageIndex =  $('.page.active').index();
                stackIndex = stack.index(); 
                 
                switch(dir)
                {
                    case 'up':
                    if(pageIndex === 0){ console.log('first page'); return;}
                    selectPage(pageIndex +1-1, 'up');// length starts at 0, nth-child at 1, so to get to the prev page: -2
                    break;
                    
                    case 'down':
                    if(pageIndex + 1 === stackLength){ /*console.log('last page');*/ return;}
                    selectPage(pageIndex +1+1, 'down'); // length starts at 0, nth-child at 1, so to get to the next page: +2
                    break;
                    
                    case 'left':
                    if(stackIndex === 0){ console.log('first stack'); return;}
                    selectStack(stackIndex +1-1, 'left');// length starts at 0, nth-child at 1, so to get to the prev page: -2
                    break;
                    
                    case 'right':
                    if(stackIndex + 1 === stacksLength){ /*console.log('last stack');*/ return;}
                    selectStack(stackIndex +1+1, 'right'); // length starts at 0, nth-child at 1, so to get to the next page: +2
                    break;
                }
            }
            function selectPage(i, dir)
            {   
                // move old page
                switch(dir)
                {
                    case 'up':
                    $('.page.active').addClass('outDown');
                    break;
                    case 'down':
                    $('.page.active').addClass('outUp');
                    break;
                    case 'left':
                    $('.page.active').addClass('outRight');
                    break;
                    case 'right':
                    $('.page.active').addClass('outLeft');
                    break;
                }
                $('.page').removeClass('active'); //fade out
                                
                
                // set it back to the center animated               
                stack.find('.page:nth-child('+i+')').addClass('active').removeClass('outUp outDown outLeft outRight');          
            }
            
            function selectStack(s, dir)
            {                               
                stack = $('.stack:nth-child('+s+')');               
                $('.page').removeClass('outUp outDown outLeft outRight'); // move all pages back to normal
                stack.find('.page').addClass('outDown'); // move all pages in this stack down       
                selectPage(1, dir); 
            }

        });
    }
};
