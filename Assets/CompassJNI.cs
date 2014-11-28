using UnityEngine;
using System.Collections;
using System;

public class CompassJNI : MonoBehaviour {
	static float 	xValue;
	static float	yValue;
	static float	zValue;

	// Use this for initialization
	void Start () {
		AndroidJNI.AttachCurrentThread();
	}

	void Update() {
		using (AndroidJavaClass cls_UnityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer")) {
			using (AndroidJavaObject obj_Activity = cls_UnityPlayer.GetStatic<AndroidJavaObject>("currentActivity")) {
				AndroidJavaClass cls_CompassActivity = new AndroidJavaClass("com.kizipad.sinbad.CompassActivity");

				cls_CompassActivity.CallStatic("Init", obj_Activity);

				xValue = cls_CompassActivity.CallStatic<float>("getX");
				yValue = cls_CompassActivity.CallStatic<float>("getY");
				zValue = cls_CompassActivity.CallStatic<float>("getZ");

			}
		}
		Debug.Log("Compass values are " + xValue.ToString() + "," + yValue.ToString() + "," + zValue.ToString());
	}

	void OnGUI() {
		GUI.Label(new Rect(Screen.width / 2 -200, Screen.height / 2, 400,100), "xmag = " + xValue.ToString() + " ymag = " + yValue.ToString() + " zmag = " + zValue.ToString());
	}
}