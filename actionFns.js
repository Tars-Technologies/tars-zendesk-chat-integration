const module = {};
module.pre = {};

module.pre.live_chat_human_handover_zendeskchat = function(actionArg, functionArgs, callback) {
  console.log('[ZendeskChat] inside live_chat_human_handover_zendeskchat pre function', functionArgs);

  // Initialize the Zendesk Chat web SDK
  require(['https://dev.zopim.com/web-sdk/latest/web-sdk.js'], function(zChat) {
    console.log('[ZendeskChat] zChat object inside', zChat);
    zChat.init({
      // account_key: 'n6Jxr5n3jMlahfsaCzx4deOmfFvYdYFf',
      // account_key: 'YD8HAxgkPfr8e3wTfNCaFVG5lrqU0rav',
      account_key: functionArgs.account_key,
    });

    actionArg.history.vars.pre[actionArg.currGambit.varid] = {
      zChat: zChat,
    };

    const getBotMessageBubbleHTML = function(content, timestamp) {
      return `<li class="message col-xs-9 pull-left" style="display: list-item;">
        <div class="messageBody ui-chatbox-msg alert chat-bubble user-chat-bubble padding-no-margin pull-left text-bubble ">
          <span class="">
            <span class="text-span">${content}</span>
          </span>
        <span class="pull-right chat-timestamp">${timestamp}</span>
        </div>
      </li>`;
    }

    const getSystemLogHTML = function(content, timestamp) {
      // #TODO return the System Log HTML element to add in the chat area.
      // These messages are sent by the Chatbot System, i.e. Tars (us)
      // That means, in the conversation between the end-user and the business, there is one more character in play
      // Tars (us). We have been very quite in terms of words, but mostly been communicating as the medium which facilitates this conversation. mostly in the visual UI/UX sense only. And that has been our existence, until now. Now we speak in very clears words.

      if (!content) return null;
      return `<li class="system-log col-xs-12" style="display: list-item;">
        <span class="text-span">${content}</span>
        ${timestamp ? '<span class="text-span">('+moment(timestamp).format('h:mm A')+')</span>' : ''}
      </li>`;
    }

    const getTypingBubbltHTML = function() {
      return `<li class="message col-xs-9 pull-left typing" style="display: list-item;">
          <div class="messageBody ui-chatbox-msg alert chat-bubble user-chat-bubble padding-no-margin pull-left">
              <span class="">
                <div id="wave">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </span>
          </div>
      </li>`
    }

    const getUserMessageBubbleHTML = function(user_input_text, timestamp) {
      if (!user_input_text) return null;
      return `<li class="message col-xs-9 pull-right" style="display: list-item;">
        <div class="messageBody sent-message ui-chatbox-msg alert chat-bubble my-chat-bubble padding-no-margin pull-right">
          <span class="">
            ${user_input_text}
          </span>
          <span class="pull-right chat-timestamp">${timestamp || new Date().toString()}</span>
        </div>
      </li>`;
    }



    // #TODO Pseudo Code
    // Reference: https://api.zopim.com/web-sdk/#chat-2


    // Zendesk API Methods / Functions to call/use as part of this feature
    // =========================================================================
    // zChat.init(options)
    // zChat.getAccountStatus()
    // zChat.getConnectionStatus()
    // -- zChat.getVisitorInfo()
    // zChat.setVisitorInfo(options, callback)
    // -- zChat.sendVisitorPath(options, callback)
    // zChat.getQueuePosition()
    // zChat.sendChatMsg(msg, callback)
    // -- zChat.sendFile(file, callback)
    // -- zChat.sendOfflineMsg(options, callback)
    // zChat.sendTyping(is_typing)
    // -- zChat.getChatInfo()
    // --zChat.sendChatRating(rating, callback)
    // --zChat.sendChatComment(comment, callback)
    // zChat.isChatting()
    // zChat.getChatLog()
    // zChat.getServingAgentsInfo()
    // -- zChat.getOperatingHours()
    // -- zChat.sendEmailTranscript(email, callback)
    // -- zChat.fetchChatHistory(callback)
    // -- zChat.markAsRead()
    // zChat.reconnect()
    // zChat.endChat(options, callback)
    // -- zChat.logout()


    // console.log('[ZendeskChat] zChat.sendChatMsg', zChat.sendChatMsg);
    // let user_message = actionArg.currResponse.join ? actionArg.currResponse.join(', ') : actionArg.currResponse;
    // let user_message = actionArg.currResponse;
    // zChat.sendChatMsg(user_message, function(err, res) {
    //   console.log('[ZendeskChat] zChat.sendChatMsg', err, res);
    // });

    const addInChatArea = function(bubbleHTML) {
      $('.messages').append(bubbleHTML);
      $('.messages')[0].scrollTop = $('.messages')[0].scrollHeight * 1000;
    }

    const updateTypingIndicator = function(typing) {
      if (typing) {
        $(".messages .typing").remove();
        addInChatArea(getTypingBubbltHTML());
      } else {
        $(".messages .typing").remove();
      }
    }

    const moveUserMessageToChatArea = function(user_input_text) {
      if (!user_input_text) return;
      addInChatArea(getUserMessageBubbleHTML(user_input_text));
      $('.inputMessage').val('');
      return user_input_text;
    }

    // zChat.init({
    //   account_key            : 'YOUR_ZENDESK_CHAT_ACCOUNT_KEY',
    //   suppress_console_error : true,
    //   authentication         : {
    //       jwt_fn : function(callback) {
    //           fetch('JWT_TOKEN_ENDPOINT').then(function(res) {
    //               res.text().then(function(jwt) {
    //                   callback(jwt);
    //               });
    //           });
    //       }
    //   }
    // });
  
    // zChat.logout()
    // Logs out an authenticated visitor.
        
    // zChat.getAccountStatus()
    // zChat.getConnectionStatus()
    // zChat.setVisitorInfo(options, callback)
    // zChat.sendVisitorPath(options, callback)

    // zChat.getQueuePosition()
    // zChat.sendFile(file, callback)
    // zChat.sendOfflineMsg(options, callback)
    // zChat.isChatting()
    
    // zChat.getChatLog()
    // zChat.getServingAgentsInfo()

    // zChat.fetchChatHistory(callback)
    // Needs JWT based authentication. JWT might be a good way to connect users/convesations in Zendesk Chat and conversation on Tars

    // zChat.sendChatMsg(msg, callback)
    // zChat.sendTyping(is_typing)
    // zChat.endChat(options, callback)
    // zChat.sendEmailTranscript(email, callback)

    const processUserLiveChatInput = function () {
      console.log('inside processUserLiveChatInput');
      let user_input = $('.inputMessage').val();
      if (user_input && user_input.toLowerCase() === 'end livechat') {
        destroyLiveChatkMessaging();

        // #TODO this is the place to update the user response entry on the Zendesk Chat Gambit
        // Add some uval value to link it to the chat in zendesk or put the whole chat log in it
        // once this is updated, the next line with trigger on the send-button will take care of
        // saving that in the backend.
        
        // need to call the post function on this gambit to move on to the next gambit
        // currently, user has to end something again and send for that to happen
        $("#send-button").trigger( "click" );
        return;
      }

      moveUserMessageToChatArea(user_input);
      zChat.sendChatMsg(user_input, function(err, res) {
        console.log('[ZendeskChat] zChat.sendChatMsg', err, res);
      });
    }

    const destroyLiveChatkMessaging = function() {
      $("#send-button").removeClass('mute-chatbot'); // This tells webClient.js to start processing the events on the sendbutton for the chatbot
      // $('.inputMessage').attr('placeholder', getLocaleStr("input_enabled_pl"));
      // $('.inputMessage').removeAttr('disabled');
      // $('.inputMessage').focus();

      zChat.un('chat', function(err, res) {
        console.log('[ZendeskChat] zChat.un("chat")', err, res);
      });
      zChat.un('connection_update', function(chat_event) {
        console.log('[ZendeskChat] zChat.un("connection_update")', err, res);
      });
      zChat.endChat({}, function(err, res){
        console.log('[ZendeskChat] zChat.endChat', err, res);
      });
      zChat.liveChatEnded = true;
      // zChat = null;

      setTimeout(function(){
        addInChatArea(getSystemLogHTML('Live chat session has ended. Back to the <b>Chatbot</b>'));
      }, 500);
    }

    const initLiveChatkMessaging = function() {
      // addInChatArea(getSystemLogHTML('Live Chat session started. Powered by <b>ZenDesk Chat</b>'));

      $("#send-button").addClass('mute-chatbot'); // This tells webClient.js to ignore any events on the sendbutton for chatbot to process
      $('.inputMessage').attr('placeholder', getLocaleStr("input_enabled_pl"));
      $('.inputMessage').removeAttr('disabled');
      $('.inputMessage').focus();

      $(window).keydown(function (event) { // #TODO optimize this event trigger to not fire at all when 'mute-chatbot' class is present
        if ($("#send-button").hasClass('mute-chatbot') && event.which === 13) {
          processUserLiveChatInput();
        }
      })
  
      $("#send-button.mute-chatbot").click(function (event) {
        processUserLiveChatInput();
      })

      // Zendesk Live Chat events to listen to and updating the UI accordingly
      // =========================================================================
      // 'account_status' This event will be fired when the account's status changes
      // 'connection_update' This event will be fired when the connection to a Zendesk Chat server changes
      // 'visitor_update' This event will be fired when visitor's information changes, for instance when the visitor joins the chat.
      // 'agent_update' This event will be fired when an agent's information changes, for instance when an agent joins the chat.
      // --------------------------------------------------------------------------
      // 'chat.msg'	When chat message arrives
      // 'chat.file'	When a file attachment arrives
      // 'chat.queue_position'	When the visitor's queue position is changed
      // 'chat.memberjoin'	When visitor/agent joining the chat
      // 'chat.memberleave'	When visitor/agent leaving the chat
      // 'typing'	When agent starts/stops typing


      // // ### EVENTS ###
      // zChat.on(event_name, handler)
      // zChat.un(event_name, handler)

      // 'typing'	When agent starts/stops typing
      // 'chat.msg'	When chat message arrives
      // 'chat.file'	When a file attachment arrives
      // 'chat.queue_position'	When the visitor's queue position is changed
      // 'chat.memberjoin'	When visitor/agent joining the chat
      // 'chat.memberleave'	When visitor/agent leaving the chat
      // // 'chat.request.rating'	When agent requests for rating
      // // 'chat.rating'	When visitor updates chat rating
      // // 'chat.comment'	When visitor updates chat comment
      // // 'last_read'	When visitor's last read timestamp is updated


      // Listen to the typing event
      zChat.on('chat', function(chat_event) {
        console.log('[ZendeskChat] zChat.on("chat")', chat_event);
        if (zChat.liveChatEnded) return zChat.endChat();
        let content = '';

        switch(chat_event.type) {
          case "typing":
            updateTypingIndicator(chat_event.typing);
            break;
          case "chat.msg":
            if (chat_event.nick === 'agent:trigger'){
              addInChatArea(getSystemLogHTML(chat_event.msg, chat_event.timestamp));
            } else if (chat_event.nick === 'visitor') {
              addInChatArea(getUserMessageBubbleHTML(chat_event.msg, chat_event.timestamp));
            } else {
              addInChatArea(getBotMessageBubbleHTML(chat_event.msg, chat_event.timestamp));              
            }
            break;
          case "chat.file":
            addInChatArea(getBotMessageBubbleHTML(chat_event.msg, chat_event.timestamp));
            break;
          case "chat.queue_position":
            content = 'Queue Position: ' + chat_event.queue_position + '. Please wait for someone to join the chat.';
            if (chat_event.queue_position === 0) break;
            addInChatArea(getSystemLogHTML(content, chat_event.timestamp));
            break;
          case "chat.memberjoin":
            if (chat_event.nick != 'visitor'){
              content = chat_event.display_name + ' Joined';
            }
            addInChatArea(getSystemLogHTML(content, chat_event.timestamp));
            break;
          case "chat.memberleave":
            if (chat_event.nick != 'visitor') {
              content = chat_event.display_name + ' Left';
            }
            addInChatArea(getSystemLogHTML(content, chat_event.timestamp));
            // #TODO if the agent left and there are no more agents left in the chat
            // then end the live chat session automatically
            // by calling destroyLiveChatkMessaging()
            // if (zChat.getServingAgentsInfo() && zChat.getServingAgentsInfo().length === 0) {
            //   addInChatArea(getSystemLogHTML('Live chat session has ended. Back to the Chatbot'));
            //   destroyLiveChatkMessaging();
            // }
            break;
          default:
            break;
        }
      });

      // Listen to the typing event
      zChat.on('connection_update', function(chat_event) {
        console.log('[ZendeskChat] zChat.on("connection_update")', chat_event);
        if (zChat.liveChatEnded) return zChat.endChat();
        switch(chat_event) {
          case "connecting":
            // addInChatArea(getSystemLogHTML('Connecting'));
            break;
          case "connected":
            // addInChatArea(getSystemLogHTML('Connected'));;

            var visitorInfo = {
              display_name : module.helper.templateEngine(functionArgs.user_fullname || 'Tars Visitor: {{usys.tempDocid}}'),
              email        : module.helper.templateEngine(functionArgs.user_email || ''),
              phone        : module.helper.templateEngine(functionArgs.user_phone || ''),
            };
            console.log('[ZendeskChat] zChat.setVisitorInfo', zChat.setVisitorInfo);
            zChat.setVisitorInfo(visitorInfo, function(err, res) {
              console.log('[ZendeskChat] zChat.setVisitorInfo', err, res);
            });

            // #TODO
            // zChat.sendVisitorPath(options, callback)

            // console.log('[ZendeskChat] zChat.sendChatMsg', zChat.sendChatMsg);
            let start_message = module.helper.templateEngine(functionArgs.start_message || 'Live chat started from Tars Chatbot');
            zChat.sendChatMsg(start_message, function(err, res) {
              console.log('[ZendeskChat] zChat.sendChatMsg', err, res);
            });
            break;
          case "closed":
            addInChatArea(getSystemLogHTML('Live Chat Connection Closed'));
            destroyLiveChatkMessaging();
            break;
          default:
            break;
        }
      });
    }

    initLiveChatkMessaging();

    callback(null, {});

    addInChatArea(getSystemLogHTML('Live Chat session started. Powered by <b>ZenDesk Chat</b>'));
    addInChatArea(getSystemLogHTML('Type <b>End LiveChat</b> to end live chat session'));
  });
}