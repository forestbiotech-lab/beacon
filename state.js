
let stateSnap=[]
let interval=300  //300-> 5min
let limit=0.7*interval
var e={}



e.start=function(callback){
	stateSnap=[null,null,null,null,null]
	stateSnap.forEach(function(index){
		let state=makeState()
		pushState(state)
	})

	setInterval(function(){ 
		validateState();
	}, interval*1000);


}


e.getSnap=function(){
 return stateSnap
}


e.pushState=function(type){
	let state={type:type,timestamp:new Date()}
	if (type==="OK"){
		let now=new Date()
		let lastState=getLastState()
		console.log(now-lastState.timestamp)
		console.log(limit*1000)
		if ( (now-lastState.timestamp)>(limit*1000) || lastState.type != "OK" ) pushState(state)
	}else{
		pushState(state)
	}
}


function makeState(){
	return Object.assign({},{type:null,timestamp:null})
}
function newState(type){
	let state=makeState()
	state.type=type
	state.timestamp=new Date()
	return state
}
function timeoutState(){
	return newState("timedout")
}
function validateState(){
	return newState("OK")
}

function pushState(state){
	stateSnap=stateSnap.slice(1)
	stateSnap.push(state)
} 
function getLastState(){
	return stateSnap.slice(-1)[0]
}
function verifyState(){
	let now = new Date()
	let lastState=getLastState()
	return (now - lastState.timestamp) < (limit * 1000) && lastState.type === "OK" 
}

function validateState(){
	verifyState() ? null : pushState(timeoutState())
}


e.calculateState=function(){
	let okCount=0
	let lastTimeStamp=getLastState().timestamp
	stateSnap.forEach(function(state){
		state.type==="OK" ? okCount++ : null
	})	
	let result=Math.round(okCount*100/5)
	return {lastSignal:lastTimeStamp,state:result}
}
e.setLimit=function(int){
	limit=int*interval
}
e.getLimit=function(){
	return limit/interval
}
e.setInterval=function(int){
	interval=int
}
e.getInterval=function(){
	return interval
}

module.exports=e
