
var accelerator : Vector3 = Vector3(0,0,0);
//var gameObjectsinbad1 : GameObject;
var gameObjectsinbad2 : GameObject;
var came : GameObject;
var gyroscoper : Vector3 = Vector3(0,0,0);
var gyroscopet : Vector3 = Vector3(0,0,0);
var mySkin : GUISkin;

function Update () {
 
/*	if ( transform.rotation.x*360/Mathf.PI < 30.0 && transform.rotation.x*360/Mathf.PI > -30.0){
			transform.Rotate ( -accelerator.x*2 , 0 , 0);;
		}else{
			if(transform.rotation.x*360/Mathf.PI > 30.0){
				transform.rotation.x = 30/360*Mathf.PI;
			}
			if(transform.rotation.x*360/Mathf.PI < -30.0){
				transform.rotation.x = -30/360*Mathf.PI;
			}
		}
		
	if ( transform.rotation.z*360/Mathf.PI < 30.0 && transform.rotation.z*360/Mathf.PI > -30.0){
			transform.Rotate ( 0 , 0 , -accelerator.y*2);
	}else{
			if(transform.rotation.z*360/Mathf.PI > 30.0){
				transform.rotation.z = 30/360*Mathf.PI;
			}
			if(transform.rotation.z*360/Mathf.PI < -30.0){
				transform.rotation.z = -30/360*Mathf.PI;
			}
		}*/
	
		
		
	var gyros : Gyroscope = Input.gyro;
//	accelerator = Input.acceleration;
	if(!gyros.enabled){
		gyros.enabled = true;
	}
//	if(accelerator.x > 0.2 || accelerator.y > 0.2  || accelerator.x < -0.2 || accelerator.y < -0.2 ){
//		gameObjectsinbad1.transform.Rotate ( accelerator.x , accelerator.y , accelerator.z);
//	}
	gyroscoper = gyros.rotationRate;
	gameObjectsinbad2.transform.Rotate ( gyroscoper.z , -gyroscoper.x , gyroscoper.y);
	came.transform.Rotate ( gyroscoper.y , -gyroscoper.x , gyroscoper.z);	
	
	gyroscopet = gyros.gravity;
	came.transform.Translate ( 0 ,  0.1*gyroscopet.x , 0 );
	
	
	if(Input.GetKeyDown("menu")){
		Application.LoadLevel(0);
	}
	
	if(Input.GetKeyDown("escape")){
		Application.Quit();
	}
}

function OnGUI () {
	if(mySkin){GUI.skin = mySkin;}
	GUI.color=Color.black;
	GUI.Label(new Rect( Screen.width / 4 , 0, Screen.width ,100), "Camera : Rotate.x 對應 gyroscope.y | Rotate.y 對應 -gyroscope.x");
	GUI.Label(new Rect( Screen.width / 8 , Screen.height*1/20, Screen.width ,100), "sinbad-R : Rotate.x 對應 gyroscope.z | Rotate.y 對應 -gyroscope.x | Rotate.z 對應 gyroscope.y");
	
	GUI.Label(new Rect(Screen.width / 5 , Screen.height *2/20, 400,100), "accelerator.x = " + accelerator.x.ToString() );
	GUI.Label(new Rect(Screen.width *2/5 , Screen.height*3/20, 400,100), "accelerator.y = " + accelerator.y.ToString() );
	GUI.Label(new Rect(Screen.width *3/5 , Screen.height*4/20, 400,100), "accelerator.z = " + accelerator.z.ToString() );
	
	GUI.Label(new Rect(Screen.width / 5 , Screen.height *17/20, 400,100), "gyroscope.x = " + gyroscoper.x.ToString() + "   gyroscopet.x = " + gyroscopet.x);
	GUI.Label(new Rect(Screen.width *2/5 , Screen.height*18/20, 400,100), "gyroscope.y = " + gyroscoper.y.ToString() );
	GUI.Label(new Rect(Screen.width *3/5 , Screen.height*19/20, 400,100), "gyroscope.z = " + gyroscoper.z.ToString() );
}