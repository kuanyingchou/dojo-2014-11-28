#pragma strict

var mySkin : GUISkin;
var rawVectorX : int;
var rawVectorY : int;
var rawVectorZ : int;


function Start () {
	Input.compass.enabled = true;
	Input.location.Start ();
}

function Update () {
	rawVectorX = Input.compass.rawVector.x;
	rawVectorY = Input.compass.rawVector.y;
	rawVectorZ = Input.compass.rawVector.z;
	
//	Input.compass.trueHeading.location.Start ();
//	Debug.Log (Input.compass.trueHeading.ToString());
	
	if(rawVectorX > 0){
		transform.rotation.x += 0.1;
	}else{transform.rotation.x -= 0.1;}
	
	
/*	if(rawVectorY > 0){
		transform.rotation.y += 0.1;
	}else{transform.rotation.y -= 0.1;}
	
	
	if(rawVectorZ > 0){
		transform.rotation.z += 0.1;
	}else{transform.rotation.z -= 0.1;}
*/	
	
/*	transform.rotation.x = Input.compass.rawVector.x;
	transform.rotation.y = Input.compass.rawVector.y;
	transform.rotation.z = Input.compass.rawVector.z;	*/
	
	
	if(Input.GetKeyDown("menu")){
		Application.LoadLevel(1);
	}
	
	
	if(Input.GetKeyDown("escape")){
		Application.Quit();
	}
}	

function OnGUI () {
	if(mySkin){GUI.skin = mySkin;}

	GUI.Label(new Rect(Screen.width / 3 , Screen.height /10, 400,100), "Compass xyz某一軸朝向正北軸向會亂跳動");
	
	GUI.Label(new Rect(Screen.width / 5 , Screen.height /5, 400,100), "compass.x = " + rawVectorX.ToString() );
	GUI.Label(new Rect(Screen.width *2/5 , Screen.height /5, 400,100), "compass.y = " + rawVectorY.ToString() );
	GUI.Label(new Rect(Screen.width *3/5 , Screen.height /5, 400,100), "compass.z = " + rawVectorZ.ToString() );
	
	GUI.Label(new Rect(Screen.width / 5 , Screen.height *4/5, 400,100), "rotation.x = 紅"  );
	GUI.Label(new Rect(Screen.width *2/5 , Screen.height *4/5, 400,100), "rotation.y = 綠" );
	GUI.Label(new Rect(Screen.width *3/5 , Screen.height *4/5, 400,100), "rotation.z = 藍" );
}