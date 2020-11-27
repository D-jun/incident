(function () {
  var form = layui.form;
  var layer = layui.layer;
  userName();
  function userName() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        form.val("userForm", res.data);
      },
    });
  }

  $("#resetBtn").click(function (e) {
    e.preventDefault();
    userName();
  });

  form.verify({
    nickname: function (value, item) {
      console.log(value);
      if (value.length > 6) {
        return "昵称1~6位";
      }
    },
  });
  // 提交
  $("#userForm").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data,
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        window.parent.handAndName();
        // console.log(window.parent.handAndName)
      },
    });
  });
})();
