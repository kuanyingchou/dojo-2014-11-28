#pragma strict
import System.IO;

//var fileName : String[];

private var path : String;

var test : Test;


function Start () {
	if( test ){
		if( test.ansFileName.Length != test.fileName.Length ) test.ansFileName = new String[test.fileName.Length];
		for( var i=0 ; i<test.fileName.Length ; i++){
			path = Application.dataPath + "/" + test.fileName[i] ; 
			if( test.ansFileName[i] == UniqueAssetPath( path ) ){
				Debug.Log( "第" +i+ "項  O" );
			}else{
				Debug.Log( "第" +i+ "項  X" );
			}
//			test.ansFileName[i] = UniqueAssetPath( path );
		}
	}
}

function Update () {

}



function UniqueAssetPath( oriPath : String ) : String {
	while( File.Exists( oriPath ) ){
//		Debug.Log( "oriPath 路徑"+ oriPath  + "有檔案" );
		oriPath = NewPath( oriPath );
//		Debug.Log( "新路徑\""+ oriPath  +  "\"" );
	}
//	Debug.Log( File.Exists( oriPath ) );
	return oriPath;
}

function NewPath( oriPath : String ) : String {
	var endIndex : int = 1;
	var checkIndex : int;
	var fileExtension : String;
	while ( oriPath[ oriPath.Length - endIndex ].ToString() != "." ){ 										//取得附檔名
		fileExtension = oriPath[ oriPath.Length - endIndex ].ToString() + fileExtension;
		endIndex++;
		if( oriPath[ oriPath.Length - endIndex ].ToString() == "/" ){										//在沒取得到附檔名時搜尋到上層資料夾跳出
			endIndex = 0;
			fileExtension = "";
			break;
		}
	}
	if( fileExtension != "" ) fileExtension = "." + fileExtension;											//如果有副檔名 副檔名前方加"."
	oriPath = oriPath.Substring( 0 , oriPath.Length - endIndex ); 											//取得剃除附檔名後的路徑
	endIndex = 1;
	var newPath : String;
	if( !int.TryParse( oriPath[ oriPath.Length - endIndex ].ToString() , checkIndex) ){						//後方字元不可轉換成int的情況
		newPath = oriPath + " 1";
	}else{																									//後方字元可換成int
		while ( int.TryParse( oriPath[ oriPath.Length - endIndex ].ToString() , checkIndex ) ){ 			//取得後方可轉換成int的字元數量  
			endIndex++;
		}
		int.TryParse( oriPath.Substring( oriPath.Length - (endIndex-1) , (endIndex-1) ) , checkIndex );		//checkIndex取得實際int値
		if( endIndex < 9 ){
			checkIndex += 1;
			endIndex += -1;
			var supplementZero : String;
			if( endIndex > checkIndex.ToString().Length ){														//判斷新index字元數小於原本字元數補"0"
				for( var i=0; i<(endIndex-checkIndex.ToString().Length) ; i++ ){
					supplementZero += "0";
				}
			}
			newPath = oriPath.Substring( 0 , oriPath.Length - endIndex ) + supplementZero + checkIndex;	
		}else{
			newPath = oriPath + " 1";
		}
	}
	return newPath + fileExtension;
}