// Instance Processor is used to work with sets of configurations presented as XML

function InstanceProcessor (sourceJSON) {
    this.source = sourceJSON;
}

// returns the number of instances in the set
InstanceProcessor.method("getInstanceCount", function() 
{
	return this.source.length;
});

// returns the base abstract clafer of all instances (they should have the same base abstract clafer)

InstanceProcessor.method("getInstanceSuperClafer", function() 
{
	return this.source[0].elements[0].super;
});


// returns feature value of featureName feature of an instance number instanceIndex
// forceNumeric forces to return an integer

InstanceProcessor.method("getFeatureValue", function(instanceIndex, featureName, forceNumeric) 
{
	try
	{
        var found = this.findFeature(this.source[instanceIndex - 1], featureName);

		if (found == 1)
		{	
			var result;
			if (forceNumeric)
				result = 1;
			else
				result = "yes";			
			return result;
		}
		else
        {
			if (forceNumeric)
				return 0;
			else
				return "-";			
        }
	}
	catch(e)
	{
		alert("Error while checking the feature specified by: '" + instanceIndex + " " + featureName + "'");
		return "";
	}
		
});

InstanceProcessor.method("findFeature", function(root, name){
 	for(var i=0; i<root.elements.length; i++){
 		if (root.elements[i].ident == name)
 			return 1;
 		else {
 			var found = this.findFeature(root.elements[i], name);
 			if (found == 1)
 				return 1;
 		}
 	}
 	return 0;
});

//returns the index of the first identical point that is a circle.
InstanceProcessor.method("getIdenticalID", function(id, goals, originalPoints){
   	if (id>originalPoints){
    	var values={};
   		for (var i=0; i<goals.length; i++){
   		   	values[goals[i].arg] = this.getFeatureValue(id, goals[i].arg, true);
   		}
	   	for (i=1; i<=originalPoints; i++){
   		    var isOptimal = true;
   	    	for (j=0; j<goals.length; j++){
   	        	var check =  this.getFeatureValue(i, goals[j].arg, true);
   	        	if (check != values[goals[j].arg]){
   	        	   	isOptimal = false;
   	        	    break;
   	        	}
       		}
       		if (isOptimal)
       		    return i;
   		}
   		return 0;
   	}
});

InstanceProcessor.method("getInstanceName", function(){
	try {
		return this.source[0].elements[0].ident;
	} catch(e) {
		alert("Could not get a clafer id of the instance root");
		return "";
	}
});