const modal = document.querySelector('.bg-modal');

document.getElementById('btnLogin').addEventListener("click", function() {
	modal.style.display = "flex";
});

document.getElementById('close').addEventListener("click", function() {
	modal.style.display = "none";
});

document.getElementById('botaoRegistrar').addEventListener("click", function(){
    modal.style.display = "none";
})

$(".txtb input").on("focus",function(){
    $(this).addClass("focus");
  });

  $(".txtb input").on("blur",function(){
    if($(this).val() == "")
    $(this).removeClass("focus");
  });