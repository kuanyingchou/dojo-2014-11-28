#pragma strict

var aniPlayers : Animation[];
var delay : float = 0.2;

function Start () {
	if( delay <= 0 ) delay = 0.2;
	AniPlay();
}

function Update () {
	if( delay <= 0 ) delay = 0.2;
}


function AniPlay(){
	for( var i=0 ; i<aniPlayers.Length ; i++ ){
		aniPlayers[ i ].Play();
		Debug.Log( "撥放 : " + aniPlayers[ i ].clip.name );
		yield WaitForSeconds( delay );
	}
}