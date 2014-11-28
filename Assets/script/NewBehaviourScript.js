#pragma strict

var a : GameObject;

function Start () {

}

function Update () {
	if(Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began){
		Instantiate( a , transform.position , a.transform.rotation );
	}
}