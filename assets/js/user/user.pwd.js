(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    newpwd: function (value, item) {
      //value：表单的值、item：表单的DOM对象

      let oldPwd = $("[name = oldPwd]").val();
      if (value === oldPwd) {
        return "新密码不能和原密码相同";
      }
    },
    repwd: function (value, item) {
      let newPwd = $("[name=newPwd]").val();
      if (newPwd !== value) {
        return "两次密码输入不正确";
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });

  $("#pwdForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: "/my/updatepwd",
      type: "POST",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg(res.message);
        $("#pwdForm").get(0).reset();
      },
    });
    
  });
})();
