(function () {
  $("#gotoRegi").click(function () {
    $(".loginBox").hide();
    $(".regiBox").show();
  });
  $("#gotoLogin").click(function () {
    $(".loginBox").show();
    $(".regiBox").hide();
  });

  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    repassword: function (value, item) {
      //   console.log(value);
      let pwd = $(".regiBox input[name='password']").val();
      // console.log(pwd);
      if (pwd !== value) {
        return "两次密码输入不一致";
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  $("#regiForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $("#gotoLogin").click();
      },
    });
  });
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        localStorage.setItem("token", res.token);
        layer.msg(
           "登录成功，即将去后台主页",
          {
            time: 2000, //2秒关闭（如果不配置，默认是3秒）
          },
          function () {
            location.href = "index.html";
          }
        );
      },
    });
  });
})();
