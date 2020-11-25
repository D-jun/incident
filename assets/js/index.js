var layer = layui.layer;
$.ajax({
  url: "/my/userinfo",
  // headers: {
  //   Authorization: localStorage.getItem("token"),
  // },
  success: function (res) {
    if (res.status !== 0) {
      return layer.msg(res.message);
    }
    console.log(res);
    let name = res.data.nickname || res.data.nickname;
    $("#welcome").text("欢迎 " + name);
    console.log(name[0]);

    //   头像
    if (res.data.user_pic) {
      $(".layui-nav-img").show().attr("src", res.data.user_pic);
      $(".text-avatar").text(name[0]).hide();
    } else {
      $(".layui-nav-img").hide().attr("src", res.data.user_pic);
      $(".text-avatar").text(name[0]).show();
    }
  },
  complete: function (xhr) {
    console.log(xhr);
    if (
      xhr.responseJSON.status === 1 &&
      xhr.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "login.html";
    }
  },
});

var layer = layui.layer;
$("#logoutBtn").click(function () {
  layer.confirm("是否确退出？", { icon: 3, title: "提示" }, function (index) {
    localStorage.removeItem("token");
    location.href = "login.html";

    layer.close(index);
  });
});
