$('Button[class="kitchenButton"]').click(function(){
	$("div[id=" + this.name +"]").remove();
	$.get("/resolveOrder", {id:this.name})
});
