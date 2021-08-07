Moralis.initialize("RrKpMiHThO0v1tXiKcxJuBacU35i7UidwNwQq0as"); // Application id from moralis.io
Moralis.serverURL = "https://58zywcsvxppw.usemoralis.com:2053/server"; //Server url from moralis.io

$(document).ready(function () {

    document.getElementById("toggle-signup").onclick = function (event){
        $("#continue").hide();

    }
});
async function login() {
    
    try {
        // user = await Moralis.Web3.authenticate();
        // console.log(user);
        Moralis.Web3.authenticate().then(function (user) {
            const address = user.get('ethAddress');
            $('#walletId').val(""+address);
            $('#connect').html('Connected : '+address.substring(0, 5)+"..."+address.substring(address.length-4,address.length));
            $('#connect').addClass("btn-default");
            $('#connect').addClass("disabled");
            $('#connect').removeClass("btn-primary");
            $("#continue").show(100);
        })
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

document.getElementById("connect").onclick = login;

async function signup() {
    
    try {


        // user = await Moralis.Web3.authenticate();
        // console.log(user);
        Moralis.Web3.authenticate().then(function (user) {
            const address = user.get('ethAddress');
            $('#connect').html('Connected : '+address.substring(0, 5)+"..."+address.substring(address.length-4,address.length));
        })
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

document.getElementById("continue").onclick = signup;


var tooltipTriggerList = [].slice.call(document.querySelectorAll('.btn-secondary'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

const customTooltipEl = document.querySelector('.btn-custom');
const customTooltip = new bootstrap.Tooltip(customTooltipEl, {
  customClass: 'tooltip-custom'
});

const customTooltipAltEl = document.querySelector('.btn-custom-alt');
const customTooltipAlt = new bootstrap.Tooltip(customTooltipAltEl, {
  customClass: 'tooltip-custom-alt'
});
