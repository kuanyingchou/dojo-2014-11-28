using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public enum RopeType
{
	Null,
	Line,
	Prefab
}

public enum BuildAxis
{
	PosX,
	NegX,
	PosY,
	NegY,
	PosZ,
	NegZ
}

public enum LongAxis
{
	X,
	Y,
	Z
}

public enum ConstraintPlane
{
	None,
	X_Y,
	Y_Z,
	Z_X
}

public class Rope : MonoBehaviour 
{
	public RopeType type = RopeType.Prefab;
	public GameObject ropeEnd = null;
	public bool FreezeBeg = true;
	public bool FreezeEnd = true;
	public ConstraintPlane constraintPlane = ConstraintPlane.None;
	public int linkCount = 10;
	public float ropeRadius = 0.25f;
	public int MinMaxTwist = 30;
	public float jointMass = 0.1f;
	public GameObject prefab = null;
	public float altRotation = 90;
	public float scale = 1.0f;
	
	private float jointGap = 0;
	private Vector3 jointHeading = Vector3.zero;
	private GameObject jointParent = null;
	private List<GameObject> jointConnections = new List<GameObject>();

	void OnDrawGizmos()
	{
		Gizmos.color = new Color(0.3f,0.7f,0.5f,0.5f);
		try{
			Gizmos.DrawLine(transform.position, ropeEnd.transform.position);
			
			foreach(GameObject jc in jointConnections)
				Gizmos.DrawWireSphere(jc.transform.position, ropeRadius);
		
			for(int i = 1; i < jointConnections.Count; i++)
				Gizmos.DrawLine(jointConnections[i-1].transform.position, jointConnections[i].transform.position);
		}catch{ }
	}
	
	void OnDrawGizmosSelected()
	{
		if(!Application.isPlaying && ropeEnd != null)
			MakeDemo();
	}
	
	void MakeDemo()
	{
		DestroyDemoRope();
		jointGap = Vector3.Distance(transform.position, ropeEnd.transform.position)/linkCount;
		jointHeading = (transform.position - ropeEnd.transform.position).normalized;
		PlaceJointConnections();
		PlacePrefabs();
	}
	
	GameObject demo;
	void DestroyDemoRope()
	{
		demo = GameObject.Find("TempRope");
		
		if(demo != null)
		{
			for(int i = 0; i < demo.transform.childCount; i++)
			{
				DestroyImmediate(demo.transform.GetChild(i).gameObject);
			}
			
			DestroyImmediate(demo);
		}
		jointConnections.Clear();
	}
	
	void Start()
	{
		DestroyDemoRope();
		
		jointGap = Vector3.Distance(transform.position, ropeEnd.transform.position)/linkCount;
		jointHeading = (transform.position - ropeEnd.transform.position).normalized;
		
		try{ gameObject.AddComponent<Rigidbody>(); gameObject.rigidbody.isKinematic = FreezeBeg; } catch { }
		try{ ropeEnd.AddComponent<Rigidbody>(); ropeEnd.rigidbody.isKinematic = FreezeEnd; } catch { }
		
		switch(constraintPlane)
		{
			case ConstraintPlane.X_Y:
				ropeEnd.rigidbody.constraints = RigidbodyConstraints.FreezePositionZ;
				rigidbody.constraints = RigidbodyConstraints.FreezePositionZ;	
				break;
			case ConstraintPlane.Y_Z:
				ropeEnd.rigidbody.constraints = RigidbodyConstraints.FreezePositionX;
				rigidbody.constraints = RigidbodyConstraints.FreezePositionX;
				break;
			case ConstraintPlane.Z_X:
				ropeEnd.rigidbody.constraints = RigidbodyConstraints.FreezePositionY;
				rigidbody.constraints = RigidbodyConstraints.FreezePositionY;	
				break;
			default:
				break;
		}
		
		PlaceJointConnections();
		PlacePrefabs();
	}
	
	void Update()
	{
		if(Input.GetKeyDown(KeyCode.Space))
			DestroyRope();
	}
	
	void DestroyRope()
	{
		foreach(GameObject go in jointConnections)
			DestroyImmediate(go);
		
		DestroyImmediate(jointParent);
		
		jointConnections.Clear();
	}
	
	void PlacePrefabs()
	{
		if(prefab != null)
		{
			for(int i = 0; i < linkCount; i++)
			{
				GameObject tPrefab = (GameObject)Instantiate((Object)prefab);
				
				tPrefab.transform.position = jointConnections[i].transform.position + (jointHeading/2 * jointGap);
				tPrefab.transform.LookAt(transform.position);
				tPrefab.transform.parent = jointConnections[i].transform;
				tPrefab.transform.Rotate(0,0,altRotation * i);
				tPrefab.transform.localScale *= scale;
			}
		}
	}
	
	void PlaceJointConnections()
	{	
		if(Application.isPlaying)
			jointParent = new GameObject("Rope");
		else
			jointParent = new GameObject("TempRope");
		
		jointParent.transform.position = ropeEnd.transform.position;
		jointParent.transform.LookAt(transform.position);
		
		GameObject tJC;
		ConfigurableJoint tCJ;
		SoftJointLimit sjl;
		JointDrive jd;
		CapsuleCollider cc;
		
		for(int i = 0; i <= linkCount; i++)
		{
			tJC = new GameObject("Connection_"+i.ToString());
			tJC.transform.position = ropeEnd.transform.position + (jointHeading * jointGap * i);
			tJC.transform.LookAt(transform.position);
			
			tJC.transform.parent = jointParent.transform;
			tJC.AddComponent<Rigidbody>();
			
			switch(constraintPlane)
			{
				case ConstraintPlane.X_Y:
					tJC.rigidbody.constraints = RigidbodyConstraints.FreezePositionZ;
					break;
				case ConstraintPlane.Y_Z:
					tJC.rigidbody.constraints = RigidbodyConstraints.FreezePositionX;
					break;
				case ConstraintPlane.Z_X:
					tJC.rigidbody.constraints = RigidbodyConstraints.FreezePositionY;
					break;
				default:
					break;
			}
			
			if(i<linkCount)
			{
				cc = tJC.AddComponent<CapsuleCollider>();
				cc.center = new Vector3(0,0,jointGap/2);
				cc.height = jointGap * 1.33f;
				cc.direction = 2;
				cc.radius = ropeRadius;
			}
			
			tCJ = tJC.AddComponent<ConfigurableJoint>();
			try{tCJ.connectedBody = jointConnections[i-1].rigidbody; }catch{ tCJ.connectedBody = ropeEnd.rigidbody; }
			
			//tCJ.swingAxis = new Vector3(1,1,1);
			tCJ.xMotion = ConfigurableJointMotion.Locked;
			tCJ.yMotion = ConfigurableJointMotion.Locked;
			tCJ.zMotion = ConfigurableJointMotion.Locked;
			
			tCJ.angularZMotion = ConfigurableJointMotion.Limited;
			sjl = new SoftJointLimit(){ limit = MinMaxTwist };
			tCJ.angularZLimit = sjl;
		
			
			jd = new JointDrive() { mode = JointDriveMode.Position };
			tCJ.xDrive = jd;
			tCJ.yDrive = jd;
			tCJ.zDrive = jd; 
			
			tCJ.projectionMode = JointProjectionMode.PositionOnly;
			tCJ.projectionDistance = 0.1f;
			
			
			if(i == linkCount)
			{
				tCJ = tJC.AddComponent<ConfigurableJoint>();
					
				tCJ.connectedBody = rigidbody;
				tCJ.xMotion = ConfigurableJointMotion.Locked;
				tCJ.yMotion = ConfigurableJointMotion.Locked;
				tCJ.zMotion = ConfigurableJointMotion.Locked;
				
				tCJ.angularZMotion = ConfigurableJointMotion.Limited;
				sjl = new SoftJointLimit(){ limit = MinMaxTwist };
				tCJ.angularZLimit = sjl;
				
				jd = new JointDrive() { mode = JointDriveMode.Position };
				tCJ.xDrive = jd;
				tCJ.yDrive = jd;
				tCJ.zDrive = jd; 
				
				tCJ.projectionMode = JointProjectionMode.PositionOnly;
				tCJ.projectionDistance = 0.1f;	
			}
			
			jointConnections.Add(tJC);
		}
	}
}
