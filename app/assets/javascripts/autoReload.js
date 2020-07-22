$(function() {
  function buildHTML(message){
    if (message.image) {
      let html = 
        `<div class="Content" data-message-id=${message.id}>
          <div class="Content-top">
            <div class="Content-top__user-name">
              ${message.user_name}
            </div>
            <div class="Content-top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Content-bottom">
            <p class="Content-bottom__text">
              ${message.content}
            </p>
            <img class="Content-bottom__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
      `<div class="Content" data-message-id=${message.id}>
        <div class="Content-top">
          <div class="Content-top__user-name">
            ${message.user_name}
          </div>
          <div class="Content-top__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Content-bottom">
          <p class="Content-bottom__text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $(".Content:last").data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i,message) {
          insertHTML += buildHTML(message)
        });
        $(".Contents").append(insertHTML);
        $(".Message-list").animate({scrollTop: $(".Message-list")[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("error");
    });
  }; 
  setInterval(reloadMessages,7000);
});