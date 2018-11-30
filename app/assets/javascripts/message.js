
$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var insertText = ``
    if(message.body){
      var insertText = `<p>
                    ${message.body}
                    </p>`
    }

    var img = ``
    if (message.image){
      var img = `<img class="chat-main_message-body-image" src="${message.image}" alt="" />`
    }

    var html = `<div class='chat-main_body-messages-list' id="target">
                  <div class='chat-main_message' data-message-id='${message.id}'>
                    <div class='chat-main_message-name'>
                      ${message.user_name}
                    </div>
                    <div class='chat-main_message-time'>
                      ${message.created_at}
                    </div>
                    <div class='chat-main_message-body'>
                      ${insertText}
                      ${img}
                    </div>
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData:false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main_body').append(html);
      document.getElementById('new_message').reset();
      var newPostPosi = $('#target').offset().top;
      $('html,body').animate({scrollTop:newPostPosi},'fast');
    })
    .fail(function(){
      alert('error');
    });
  });

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){

      message_id = $('.chat-main_message:last').data('messageId');

      $.ajax({
      url: location.href,
      dataType: 'json',
      data: {
        message: {id: message_id}
      }
    })
    .done(function(messages){

      var insertHTML = ``;

      if (messages.length !== 0){
        messages.forEach(function(message){

          insertHTML += buildHTML(message);

        });

        $('.chat-main_body').append(insertHTML);
      }


    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
    }
    else {
      clearInterval(interval);
    }
  },5000);
});
