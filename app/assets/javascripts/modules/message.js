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

  $(".message-form").on('submit', function(e) {
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data)
      $(".Contents").append(html);
      $(".Message-list").animate({ scrollTop: $('.Message-list')[0].scrollHeight})
      $("form")[0].reset();
      $(".submit-btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    });
  });
});
