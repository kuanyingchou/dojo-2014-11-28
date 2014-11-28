using UnityEngine;
using System.Collections;

public class KiziFile  {

    public static string CreateNewName(string oriPath)
    {
       /* string[] strs = str.Split(' ');

      
        int strNo = 0;
        if (strs.Length > 1)
        {
            strNo = System.Convert.ToInt32(strs[strs.Length - 1]);
            if (strNo != int.MaxValue)
            {
                strNo = System.Convert.ToInt32(strs[strs.Length - 1]) ;
                if (strNo == 0) {
                    if(strs)
                    
                    strNo += 1;
                }
                else
                {
                    strNo -= 1;
                }
                return (strs[0] + " " + strNo.ToString());
            }
        }             
        return str + " 1";*/
        int endIndex  = 1;
	int checkIndex ;
	string fileExtension ;
	while ( oriPath[ oriPath.Length - endIndex ].ToString() != "." ){ 										//??????
		fileExtension = oriPath[ oriPath.Length - endIndex ].ToString() + fileExtension;
		endIndex++;
		if( oriPath[ oriPath.Length - endIndex ].ToString() == "/" ){										//?冽????圈?瑼???撠銝惜鞈?憭曇歲??
			endIndex = 0;
			fileExtension = "";
			break;
		}
	}
	if( fileExtension != "" ) fileExtension = "." + fileExtension;											//憒??瑼? ?舀????孵?"."
	oriPath = oriPath.Substring( 0 , oriPath.Length - endIndex ); 											//????????楝敺?
	endIndex = 1;
	string newPath ;
   
	if( !int.TryParse( oriPath[ oriPath.Length - endIndex ].ToString() , checkIndex) )
    {
		newPath = oriPath + " 1";
	}else{																									//敺摮??舀??nt
		while ( int.TryParse( oriPath[ oriPath.Length - endIndex ].ToString() , checkIndex ) ){ 			//??敺?航???int????? 
			endIndex++;
		}
		int.TryParse( oriPath.Substring( oriPath.Length - (endIndex-1) , (endIndex-1) ) , checkIndex );		//checkIndex??撖阡?int??
		if( endIndex < 9 ){
			checkIndex += 1;
			endIndex += -1;
			string supplementZero ;
			if( endIndex > checkIndex.ToString().Length ){														//?斗?迺ndex摮??詨??澆??砍??鋆?0"
				for( int i=0; i<(endIndex-checkIndex.ToString().Length) ; i++ ){
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
}
