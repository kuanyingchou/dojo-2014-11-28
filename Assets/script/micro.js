#pragma strict
var mic : GameObject;
var year : GameObject;
var now : boolean;
var playing : boolean;
var up : String;
var down : String;
var ID : String;
var mySkin : GUISkin;
//var impact : AudioClip;
//private var samples: float[]; // audio samples
//private var spectrum: float[]; // audio spectrum
var sampleRate : int = 0;
var position: int = 0;
var samples : float[];
function Start () {
//	samples = audio.GetOutputData(audio.clip.samples,0);
//	spectrum = audio.GetSpectrumData(audio.clip.frequency,0, FFTWindow.BlackmanHarris);
//	Debug.Log( samples.Length +"   "+spectrum.Length  );
//	audio.clip = null;
	yield WaitForSeconds(2);
	samples = new float[audio.clip.samples * audio.clip.channels];
//	Debug.Log( samples.Length );
	audio.clip.GetData(samples, 0);
//	for (var i = 0; i < samples.Length; ++i){
//		samples[i] = samples[i] * 0.5f;
//	}
//	audio.clip.SetData(samples, 0);
//	var myClip = AudioClip.Create("MySinoid", 44100, 1, 44100, false, true, OnAudioRead, OnAudioSetPosition);
//	var myClip = AudioClip.Create("MySinoid", audio.clip.length * audio.clip.samples , audio.clip.channels , audio.clip.frequency , false , true , OnAudioRead , OnAudioSetPosition);
//	var myClip = AudioClip.Create("MySinoid", audio.clip.length * audio.clip.samples , audio.clip.channels , audio.clip.frequency , false , true);
	sampleRate = AudioSettings.outputSampleRate;
	audio.clip = null;
	yield WaitForSeconds(1);
//    audio.clip = myClip;

	
	yield WaitForSeconds(2);
    for (var device in Microphone.devices)
  		{
//      	Debug.Log("Name: " + device);
        	ID = device;
//        	Debug.Log("IDName: " + ID);
    	}
	now = false;
	playing = false;
	up = "";
	down = "";
}
    function OnAudioRead(data:float[])
    {
//    	data = samples;
        for (var count = 0; count < data.Length; count++)
        {
        	data[count] = Mathf.Sign(Mathf.Sin(2 * Mathf.PI * 440 * position / sampleRate));
//            data[count] = Mathf.Sign(Mathf.Sin(2 * Mathf.PI * audio.clip.frequency * position / sampleRate));
//            data[count] = 2 * Mathf.PI * audio.clip.frequency * position / audio.clip.samples;
//            data[count] = samples[count];
            position++;
        }
    }
  function OnAudioSetPosition(newPosition:int)
    {
        position = newPosition;
    }


function OnGUI () {
	if(mySkin){GUI.skin = mySkin;}
	
	if(GUI.Button(new Rect(Screen.width / 3 , Screen.height *2/10, 400,100), up )){
		if(!playing){
			if(!Microphone.IsRecording(ID)){
				now =true;
				mic.audio.clip = Microphone.Start(ID , false , 10 , 44100); 	
				year.audio.Play();
//				audio.PlayOneShot(impact,1.0);
//				Application.LoadLevelAdditiveAsync (1);
			}else{
				now = false;
				Microphone.End(ID);
				year.audio.Stop();		
			}
		}
	}
	if(GUI.Button(new Rect(Screen.width / 3 , Screen.height *7/10, 400,100), down )){
		if(!now){
			if(!playing ){
				playing = true;
//				mic.audio.Play();
				audio.Play();
//				year.audio.Play();
//				AssetDatabase.CreateAsset(mic.audio.clip, "Assets/Resources/clip.asset");
			}else{
				playing = false;
				mic.audio.Stop();
//				year.audio.Stop();
			//	var cclip = new AudioClip(audio.clip);
			}			
		}
	}
	
	if(GUI.Button(new Rect(Screen.width*0.1 , Screen.height*0.2, 100,100), "" )){
//		test.audio.clip = Resources.Load("clip.asset");
		audio.Play();
	}
	
	
	if(Microphone.IsRecording(ID)){	
		GUI.Label(Rect(Screen.width / 5 , Screen.height *5/10,50,50),"mic : yes");}
	if(mic.audio.isPlaying){
		GUI.Label(Rect(Screen.width / 5 , Screen.height *6/10,50,50),"micaudio : yes");}
	if(year.audio.isPlaying){
		GUI.Label(Rect(Screen.width / 5 , Screen.height *7/10,50,50),"audio : yes");}
		
		
	mic.audio.pitch = GUI.VerticalScrollbar(Rect (Screen.width*0.05, Screen.height*0.35 , Screen.width*0.1, Screen.height*0.3), mic.audio.pitch, 1, 0, 3);
	GUI.Label(Rect (Screen.width*0.1, Screen.height*0.48, Screen.width*0.2, Screen.height*0.05),"pitch:"+mic.audio.pitch);
/*	if(GUI.Button(Rect(Screen.width / 3 , Screen.height *2/10, 400,100), up )){
		now =true;
		audio.clip = Microphone.Start( ID , false , 10 , 44100);
		audio.Play();}
	GUI.Label(new Rect(Screen.width / 3 , Screen.height /2, 400,100), Microphone.devices.ToString() );*/
}

//var position: int = 0;
//var sampleRate : int = 0;
//var frequency : float = 440;
//function OnAudioRead(data:float[]){
//	for (var count = 0; count < data.Length; count++){
//		data[count] = Mathf.Sign(Mathf.Sin(2 * Mathf.PI * frequency * position / sampleRate));
//		position++;
//	}
//}
//
//function OnAudioSetPosition(newPosition:int){
//		position = newPosition;
//}


function Update () {
	if (Input.GetKeyDown("p")){
//		audio.clip.samples = samples ; 
//		audio.clip.frequency = spectrum ;
//		var myClip = AudioClip.Create("MySinoid", 44100, 1, 44100, false, true, OnAudioRead(samples) , OnAudioSetPosition);
//        sampleRate = AudioSettings.outputSampleRate;
//		audio.clip = myClip;

		
//		audio.Play();
		
		
	}

	
	if(now){
		up = "錄音中";
	}else{
		up = "錄音";
	}
	
	
	if(playing){
		down = "播放中";
	}else{
		down = "播放";
	}
	
	if(!Microphone.IsRecording(ID)){
		now = false;
		Microphone.End(ID);
//		year.audio.Stop();
	}
	
	if(!mic.audio.isPlaying){
		playing = false;
		mic.audio.Stop();
//		year.audio.Stop();
	}
	
/*	if(Microphone.IsRecording(ID)){	Debug.Log("mic : yes");}
	if(year.audio.isPlaying){Debug.Log("audio : yes");}*/
	
	
	if(Input.GetKeyDown("escape")){
		Application.Quit();
	}
}