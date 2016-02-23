$('Button[class="kitchenButton"]').click(function(){ //$(".kitchenButton")
	$("div[id=" + this.name +"]").remove(); //use $("#"+this.name)
	$.get("/resolveOrder", {id:this.name})
});
