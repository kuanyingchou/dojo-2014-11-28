// Shatter Toolkit
// Copyright 2011 Gustav Olsson
using System.Collections.Generic;
using UnityEngine;

public class MouseShatter : MonoBehaviour
{
	public void Update()
	{
		if (Input.GetMouseButtonDown(0))
		{
			RaycastHit hit;
			
			if (Physics.Raycast(Camera.mainCamera.ScreenPointToRay(Input.mousePosition), out hit))
			{
				hit.collider.SendMessage("Shatter", hit.point, SendMessageOptions.DontRequireReceiver);
			}
		}
				
		if(Input.GetKeyDown("escape")){
			Application.Quit();
		}
	}
}