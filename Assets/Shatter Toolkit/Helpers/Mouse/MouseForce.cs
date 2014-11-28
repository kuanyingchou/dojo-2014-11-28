// Shatter Toolkit
// Copyright 2011 Gustav Olsson
using System.Collections.Generic;
using UnityEngine;

public class MouseForce : MonoBehaviour
{
	public float impulseScale = 25.0f;
	
	private Rigidbody grabBody;
	private Vector3 grabPoint;
	private float grabDistance;
	
	public void Update()
	{
		GrabBody();
		
		ReleaseBody();
				
		if(Input.GetKeyDown("escape")){
			Application.Quit();
		}
	}
	
	public void FixedUpdate()
	{
		MoveBody();
	}
	
	private void GrabBody()
	{
		if (grabBody == null)
		{
			// Let the player grab a rigidbody
			if (Input.GetMouseButtonDown(0))
			{
				RaycastHit hit;
				
				if (Physics.Raycast(Camera.mainCamera.ScreenPointToRay(Input.mousePosition), out hit))
				{
					if (hit.rigidbody != null)
					{
						grabBody = hit.rigidbody;
						grabPoint = grabBody.transform.InverseTransformPoint(hit.point);
						grabDistance = hit.distance;
					}
				}
			}
		}
	}
	
	private void ReleaseBody()
	{
		if (grabBody != null)
		{
			// Let the player release the rigidbody
			if (Input.GetMouseButtonUp(0))
			{
				grabBody = null;
			}
		}
	}
	
	private void MoveBody()
	{
		if (grabBody != null)
		{
			// Move the grabbed rigidbody
			Vector3 screenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, grabDistance);
			
			Vector3 targetPoint = Camera.mainCamera.ScreenToWorldPoint(screenPoint);
			Vector3 anchorPoint = grabBody.transform.TransformPoint(grabPoint);
			
			Debug.DrawLine(targetPoint, anchorPoint, Color.red);
			
			Vector3 impulse = (targetPoint - anchorPoint) * (impulseScale * Time.fixedDeltaTime);
			
			grabBody.AddForceAtPosition(impulse, anchorPoint, ForceMode.Impulse);
		}
	}
	
	
}