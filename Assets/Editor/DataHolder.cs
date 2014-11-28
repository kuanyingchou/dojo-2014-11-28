using UnityEngine;
using System.Collections;
using UnityEditor;
using System.IO;


public class CreateData{
    //[AddComponentMenu("Custom Editor/Create Data Asset")]
	[MenuItem("Assets/GameData")]
    static void CreateGameDataAsset(){
	
	    //資料 Asset 路徑
	    string holderAssetPath = "Assets/GameData/";
	
	    if(!Directory.Exists(holderAssetPath)) Directory.CreateDirectory(holderAssetPath);
	
		GameData holder = ScriptableObject.CreateInstance<GameData> ();
//		Config holder = ScriptableObject.CreateInstance<Config> ();
//		建立實體
//		MonoScript aaaaa = MonoScript.FromScriptableObject( holder );
//		Debug.Log( aaaaa );

		string newPath = AssetDatabase.GenerateUniqueAssetPath( holderAssetPath + "GameData.asset" );

		AssetDatabase.CreateAsset( holder , newPath );
    }



	[MenuItem("Assets/QustionItem")]
	static void CreateQustionItemAsset(){
		
		//資料 Asset 路徑
		string holderAssetPath = "Assets/GameData/";
		
		if(!Directory.Exists(holderAssetPath)) Directory.CreateDirectory(holderAssetPath);
		
		
		QustionItem holder = ScriptableObject.CreateInstance<QustionItem> ();
		//建立實體
		string newPath = AssetDatabase.GenerateUniqueAssetPath( holderAssetPath + "QustionItem.asset" );
        AssetDatabase.CreateAsset( holder , newPath );

//		Object aaa =  AssetDatabase.LoadAssetAtPath( newPath , typeof(Object)) ;
//		Debug.Log( aaa + "----------" + aaa.GetType() );
//		(aaa as AssetDatabase ).Refresh();
//		MonoScript aaaaa = MonoScript.FromScriptableObject( holder );
//		Debug.Log( aaaaa );
//		AssetDatabase.AddObjectToAsset( aaa , aaaaa );
//		(AssetDatabase.LoadAssetAtPath( newPath , AssetDatabase ) as AssetDatabase).Refresh(  );
	}


	//[AddComponentMenu("Custom Editor/Create Data Asset")]
	[MenuItem("Assets/Test")]
	static void CreateTestAsset(){
		
		//資料 Asset 路徑
		string holderAssetPath = "Assets/GameData/";
		
		if(!Directory.Exists(holderAssetPath)) Directory.CreateDirectory(holderAssetPath);
		
		Test holder = ScriptableObject.CreateInstance<Test> ();
		//		Config holder = ScriptableObject.CreateInstance<Config> ();
		//		建立實體
		//		MonoScript aaaaa = MonoScript.FromScriptableObject( holder );
		//		Debug.Log( aaaaa );
		
		string newPath = AssetDatabase.GenerateUniqueAssetPath( holderAssetPath + "Test.asset" );
		
		AssetDatabase.CreateAsset( holder , newPath );
	}

}