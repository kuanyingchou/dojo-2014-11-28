#pragma strict

var mySkin : GUISkin;
var rawVectorX : int;
var rawVectorY : int;
var rawVectorZ : int;
var sinbadX : GameObject;
var sinbadY : GameObject;
var sinbadZ : GameObject;
var CoordinateX : GameObject;
var CoordinateY : GameObject;
var CoordinateZ : GameObject;
var sce : float;

function Start () {
	Input.compass.enabled = true;
	Input.location.Start ();
	sce = 0;
}

function Update () {
	sce += Time.deltaTime;
	if(sce > 0.3){
		sinbadX.renderer.material.mainTextureOffset.x += 0.25;
		sinbadY.renderer.material.mainTextureOffset.x += 0.25;
		sinbadZ.renderer.material.mainTextureOffset.x += 0.25;
		sce = 0;
	}
	
	rawVectorX = Input.compass.rawVector.x;
	rawVectorY = Input.compass.rawVector.y;
	rawVectorZ = Input.compass.rawVector.z;
	
	
	
	if(rawVectorX > 0){
		CoordinateX.transform.rotation.x += 0.1;
	}else{CoordinateX.transform.rotation.x -= 0.1;}
	
	if(rawVectorY > 0){
		CoordinateY.transform.rotation.y += 0.1;
	}else{CoordinateY.transform.rotation.y -= 0.1;}
	
	if(rawVectorZ > 0){
		CoordinateZ.transform.rotation.z += 0.1;
	}else{CoordinateZ.transform.rotation.z -= 0.1;}
	
	
	
	if(rawVectorX > 10){
		sinbadX.renderer.material.mainTextureOffset.y = 0.6;
	}
	if(rawVectorX <-10){
		sinbadX.renderer.material.mainTextureOffset.y = 0.4;
	}
	if(rawVectorX < 10 && rawVectorX >-10){
		sinbadX.renderer.material.mainTextureOffset.y = 0.2;
	}


	if(rawVectorY > 10){
		sinbadY.renderer.material.mainTextureOffset.y = 0.6;
	}
	if(rawVectorY <-10){
		sinbadY.renderer.material.mainTextureOffset.y = 0.4;
	}
	if(rawVectorY < 10 && rawVectorY >-10){
		sinbadY.renderer.material.mainTextureOffset.y = 0.2;
	}
	
		
	if(rawVectorZ > 10){
		sinbadZ.renderer.material.mainTextureOffset.y = 0.6;
	}
	if(rawVectorZ <-10){
		sinbadZ.renderer.material.mainTextureOffset.y = 0.4;
	}
	if(rawVectorZ < 10 && rawVectorZ >-10){
		sinbadZ.renderer.material.mainTextureOffset.y = 0.2;
	}			
				
	if(Input.GetKeyDown("menu")){
		Application.LoadLevel(1);
	}
	
	
	if(Input.GetKeyDown("escape")){
		Application.Quit();
	}
}	

function OnGUI () {
	if(mySkin){GUI.skin = mySkin;}

	GUI.Label(new Rect(Screen.width / 3 , Screen.height /10, 400,100), "Compass xyz某一軸朝向正南正北數值都會是0");
	
	GUI.Label(new Rect(Screen.width / 5 , Screen.height /5, 400,100), "compass.x = " + rawVectorX.ToString() );
	GUI.Label(new Rect(Screen.width *2/5 , Screen.height /5, 400,100), "compass.y = " + rawVectorY.ToString() );
	GUI.Label(new Rect(Screen.width *3/5 , Screen.height /5, 400,100), "compass.z = " + rawVectorZ.ToString() );
	
	GUI.Label(new Rect(Screen.width / 5 , Screen.height *4/5, 400,100), "rotation.x = 紅"  );
	GUI.Label(new Rect(Screen.width *2/5 , Screen.height *4/5, 400,100), "rotation.y = 綠" );
	GUI.Label(new Rect(Screen.width *3/5 , Screen.height *4/5, 400,100), "rotation.z = 藍" );
}