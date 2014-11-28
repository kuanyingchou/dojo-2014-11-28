#pragma strict

var ww : int;
var hh : int;
private var aaa : int[];
var t2d : Texture2D;

function Start () {

	ww = t2d.width;
	hh = t2d.height;
//	var t2d : Texture2D = renderer.material.mainTexture;
	var newT2d : Texture2D = new Texture2D( hh , ww );
//	t2d.format = TextureFormat.RGB24;
	Debug.Log( t2d.format );
	newT2d.SetPixels( ChangeColor( t2d.GetPixels() ) );
	newT2d.Apply();
	renderer.material.mainTexture = newT2d;
	
	aaa = new int[ww * hh];
	for(var i=0 ; i<aaa.Length ; i++){
		aaa[i] = i;
	}
	
	var newAAA : int[] = new int[ aaa.Length ];
	var transverse : Transverse = new Transverse( ww , hh );
	var straight : Straight = new Straight( ww , hh );
	
	for( var j = 0 ; j < newAAA.Length ; j++){
//		newAAA[j] = aaa[ transverse.Right( j ) + straight.Up( j ) ];
//		yield ;
		newAAA[j] = aaa[ transverse.Left( j ) + straight.Down( j ) ];
		if( newAAA[j] == aaa[j] ) Debug.Log(  "newAAA[]:" +  newAAA[j] + "  j:" + j );
//		Debug.Log(  "newAAA[]:" +  newAAA[j] + "    aaa[]:" + aaa[j] );
	}
	
	
//	Debug.Log( aaa[] );
//	Debug.Log( newAAA[] );
}

function Update () {

}


function ChangeColor( colors : Color[] ) : Color[]{
	var transverse : Transverse = new Transverse( ww , hh );
	var straight : Straight = new Straight( ww , hh );
	var newColors : Color[] = new Color[colors.Length];
	for( var i=0; i<newColors.Length ; i++ ){
//		newColors[ i ] = colors[ transverse.Right( i ) + straight.Down( i ) ]; //左轉 橫向鏡像
		newColors[ i ] = colors[ transverse.Right( i ) + straight.Up( i ) ];  //左轉
//		newColors[ i ] = colors[ transverse.Left( i ) + straight.Down( i ) ]; //右轉
//		newColors[ i ] = colors[ transverse.Left( i ) + straight.Up( i ) ]; //右轉 橫向鏡像
	}
	return newColors;
}


class Transverse{
	var w : int;
	var h : int;
	function Transverse( tempw : int , temph : int ){
		w = tempw;
		h = temph;
	}
	
	function Right ( i : int ) : int {
		return i/h;
	}
	
	function Left( i : int ) : int{
		return (w-1)-(i/h);
	}
}


class Straight{
	var w : int;
	var h : int;
	function Straight( tempw : int , temph : int ){
		w = tempw;
		h = temph;
	}
	
	function Up ( i : int ) : int {
		return ((h-1)-(i%h)) * w;
	}
	
	function Down( i : int ) : int{
		return (i%h) * w;
	}
}
