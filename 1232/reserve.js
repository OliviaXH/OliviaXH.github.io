var reserv = {
    init: function () {
        //初始化省份城市经销商
        loadProvinceCityDealerExpress($("#optProvince"), $("#provinceName"), $("#optCity"), $("#cityName"), $("#optDealer"), $("#dealerName"), $("#dealerAddress"));
        reserv.initEvent();
        //$("img.lazy").lazyload();//懒加载
    },
    initEvent: function () {
        //点击提交按钮
        $("#btnSubmit").click(function () {
            if (!reserv.validInput()) return false;
            reserv.submit();
        });
    },
    //验证界面功能是否可以提交
    validInput: function () {
        //验证姓名
        if (!validateDataOfInputTxt($("#txtName"), null)) {
        	ga('send', 'event', '201609-accordsporthybrid', 'TestDrive', 'Failure');
            alert("请填写真实姓名");
            return false;
        }

        //验证手机号码和电话号码
        if (!validateDataOfPhoneMobileNumber(null, null, null, $("#errorTip"),
            $("#txtMobile"), $("#txtArea"), $("#txtPhone"), $("#txtSubPhone"))) {
            var msg = $("#errorTip").text();
            if (msg == '') msg = "请填写正确的联系方式";
            ga('send', 'event', '201609-accordsporthybrid', 'TestDrive', 'Failure');
            alert(msg);
            return false;
        }

        //验证特约店是否正确
        if ($("#provinceName").text() == "选择省份" || $("#provinceName").text() == "请选择省份") {
        	ga('send', 'event', '201609-accordsporthybrid', 'TestDrive', 'Failure');
            alert("请选择省份");
            return false;
        }
        if ($("#cityName").text() == "选择城市" || $("#cityName").text() == "请选择城市") {
        	ga('send', 'event', '201609-accordsporthybrid', 'TestDrive', 'Failure');
            alert("请选择城市");
            return false;
        }
        if ($("#dealerName").text() == "选择特约店" || $("#dealerName").text() == "请选择特约店") {
        	ga('send', 'event', '201609-accordsporthybrid', 'TestDrive', 'Failure');
            alert("请选择特约店");
            return false;
        }
        return true;
    },
    /* 提交预约报名 */
    submit: function () {
        //验证成功保存数据
        var userName = $("#txtName").val();
        var mobilePhone = getMobilePhoneNumber($("#txtMobile"));
        var telPhone = getLinePhoneNumber($("#txtArea"), $("#txtPhone"), $("#txtSubPhone"));;
        var provinceValue = $("#optProvince option:selected").attr("data-code");
        var cityValue = $("#optCity option:selected").attr("data-code");
        var dealerValue = $("#optDealer option:selected").attr("data-code");
        var ismobile = "";
        if (isMobile.Status() != "desktop") {
            ismobile = "true";
        }
        //增加微平台的参数
        var weChat = getQueryString("platform");
        var areaCode = $("#optProvince option:selected").attr("data-areacode");

        var carTypeName = $("#hdSeriesID").val();//车型编号
        var activityCode = $("#hdActivityCode").val();//营销活动编码
        $.ajax({
            type: "POST",
            async: false,
            url: "/Ajax/CustomInfo.ashx",
            data: "userName=" + encodeURIComponent(userName) + "&mobilePhone=" + mobilePhone + "&telPhone=" + telPhone
                + "&cartType=" + carTypeName + "&provinceValue=" + provinceValue + "&cityValue=" + cityValue
                + "&dealerValue=" + dealerValue + "&ismobile=" + ismobile + "&areaCode=" + areaCode + "&activityCode=" + activityCode + "&class=0",
            success: function (msg) {
                if (msg.trim() == "true") {
                	ga('send', 'event', '201609-accordsporthybrid', 'TestDrive', 'Success');
                	ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page8', 'title': '试驾提交',      'dimension3': 'accord-sporthybrid', 'metric9': 1});
					ga('require', 'ecommerce');
					ga('ecommerce:addTransaction', {
					  'id': 交易ID});
					ga('ecommerce:addItem', {
					  'id': 交易ID, 'name': '雅阁', 'quantity': 1});
					ga('ecommerce:send');

                    alert("预约报名成功！");
                    $("#divReserv").hide();
                    $("#txtName").val("");
                } else {
                    alert(msg);
                    ga('send', 'event', '201609-accordsporthybrid', 'TestDrive', 'Failure');
                }
            }
        });
    }
};
$(reserv.init);
