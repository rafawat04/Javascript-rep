'use strict'; // 厳格モード　（げんかくモード)
window.addEventListener('load',()=>{
    //Constructor 
    class Card{
       constructor(suit,num){
        //Parameter
        this.suit = suit; 
        this.num = num;  
        //this.front =`${suit}`;
        //this.front = suit +(num <10 ? "0":"0") + num + ".gif"; <-上の方がやりやすい
        this.front=`${this.suit}${this.num<10?'0':''}${this.num}.gif`;
     }
    }
    //カードArray作成
    const cards=[];
    //カードsuits Array 作成
    const suits=['s','d','h','c'];
    //2重forで52枚のカードを作成
    for(let i=0;i<suits.length;i++){
        for(let j=1;j<=13;j++){
            let card = new Card(suits[i],j);
            //pushでArrayに追加（末尾に追加していく)
            cards.push(card);
        }
    }
    //Shuffle the cards
    const shuffle = ()=>{
        let i = cards.length;
        while(i){
            let index = Math.floor(Math.random()* i --);// -- は回る回数を減らしていくため、５２から始めて、次５１、次５０etc
            let temp = cards[index];
            cards[index] = cards[i];
            cards[i] = temp;
        }
    };
    //実行shuffle function
    shuffle();

    //Clickした際の関数の定義
    let firstCard = null; //引いてない場合は null、1枚めのカードを保持する
    let flipTimerId = NaN;
    const flip = (event)=>{  //function とはいえ変数としての使い方も可能です
        let td=event.target;
        //class にbackがある場合外し、なかったら付け加える（toggle);
       // td.classList.toggle('back');
       if(!td.classList.contains('back') || flipTimerId){
            return;//表面のカードをクリックしても何も起こらない。(既にflipされたカードの話)
       }
       //tdのclassListからbackを外す->表になる
       td.classList.remove('back');

       if(firstCard === null){ // === javaと同じ比較になる 0 == 0 -> true になてしま (2 equals記号 == の場合)
        firstCard = td;
       }else{
         if(firstCard.num === td.num){
            //正解だった場合1枚目をからにする
            firstCard = null;
         }else{
            flipTimerId=setTimeout(()=>{
                firstCard.classList.add('back');
                td.classList.add('back');
                flipTimerId=NaN;
                firstCard=null;
            },1200);
         }
       }

    };
    //DOM取得
    const table = document.getElementById('table');
    
    for(let i=0;i<suits.length;i++){
        //tr タグ作成
        let tr = document.createElement('tr');
        for(let j=0;j<13;j++){
            //td タグ作成
            let td = document.createElement('td');
            //配列からカードを取り出す
            let card =cards[i*13+j];
            //textContent を作成
            //td.textContent = card.suit+':'+card.num;
            //td要素の背景設定
            td.style.backgroundImage = `url(images/${card.front})`;
            //Classを追加
            td.classList.add('card', 'back');
            //onclick属性にflip関数を登録
            td.onclick=flip;
            //td要素にnumを登録
            td.num = card.num;
            //tr要素に追加
            tr.append(td);//tdはtrにappendしないといけない
        }
        //table要素に追加
        table.append(tr);//trはtableにappendしないといけない
    }
    

    
});
    

