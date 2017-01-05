$(function(){
	
	$("#formatBtn").click(function(){
		var jsonStr = $('#jsonStr').val();
		if(jsonStr==''){
			return;
		}
		var obj = JSON.parse(jsonStr);
		var output = '{'+printAll(obj,1)+'\n}';
		$('#jsonStr').val(output);
	})
	$("#resetBtn").click(function(){
		$('#jsonStr').val('');
	})
	
	function printAll(obj,level){
		var output = '';
		var tab = getTab(level);
		for(var k in obj){
			var v=obj[k];
			var type = typeof(v);
			output += '\n'+tab+'"' + k + '":'
			if(type!="object"){
				if(type == "string"){
					output += '"' + v +'",';
				}else{
					output +=  v + ',';
				}
				//document.writeln(k+"是"+v+"<br/>");
			}else{
				if(v instanceof Array){//json Array
					output += "["+printArray(v, level+1)+"\n"+tab+"],"
				}else{ //json Object
					output += '{'+ printAll(v, level+1)+'\n'+tab+'},';
				}
			}
		}
		return output.endsWith(",")?output.substring(0,output.length-1):output;
	}
	
	function printArray(array,level){
		var output = '';
		var tab = getTab(level);
		for(var i=0; i<array.length; i++) {  
			console.log(array[i] instanceof Object);
			if (array[i] instanceof Object) {
				output += tab+'{\n'+printAll(array[i],level+1)+'\n'+tab+'},'
			}else{
				output += '\n'+tab+'"'+array[i]+'",';
			}
		}
		return output.endsWith(",") ? output.substring(0,output.length-1) : output;
	}
	
	function getTab(level){
		var tab = "";
		for (var i = 0; i < level*2; i++) {
			tab += " ";
		}
		return tab;
	}
	
})