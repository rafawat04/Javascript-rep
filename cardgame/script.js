'use strict';
window.onload=function(){
  //コンストラクタ作成
    class Card{
    constructor(suit,num){
        this.suit=suit;
        this.num=num;
        this.setFront();
    }
    setFront(){
        this.front=`${this.suit}${this.num<10?'0':''}${this.num}.gif`;
    }
    }
    //カード配列作成
    // const bgm = new Audio(); to put a BGM on the website
    // bgm.loop = true;
    // bgm.volume = 0.3;
   
    const cards=[];
    const suits=['s','d','h','c'];
    for(let i=0;i<suits.length;i++){
        for(let j=1;j<=13;j++){
        let card=new Card(suits[i],j);
        //card.setFront(); // inside the constructor have this.setFront so i dont need to call here, BUT I can
        cards.push(card);
        }
    }

    //ーーーーーJavaのようにShuffle Algorithm を作るならーーーーーー

    // function shuffle(){
    //     let i = cards.length;
    //     while(i){
    //         let idx = Math.floor(Math.random()*(cards.length-i))+i;
    //         let temp = cards[idx];
    //         cards[idx] = cards[i];
    //         cards[i] = temp;
    //     }
    // }

    function shuffle(){
        let i=cards.length;
        while(i){
          let index=Math.floor(Math.random()*i--);
          let temp=cards[index];
          cards[index]=cards[i];
          cards[i]=temp;
        }
      }
    shuffle(); 
    //テーブル作成
    const table=document.getElementById('table');//DOM取得
    for(let i=0;i<suits.length;i++){
        let tr=document.createElement('tr');
        for(let j=0;j<13;j++){
        let td=document.createElement('td');
        let tempCard=cards[i*13+j];
        td.classList.add('card','back');
        td.onclick=flip;
        td.num =tempCard.num;
        td.style.backgroundImage=`url(images/${tempCard.front})`; //backgroundの中に書く部分を文字列として扱う -> url(images/ <-
        tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let firstCard = null;
    let flipTimerId =NaN;
    function flip(e){
        let td=e.target;
        //td.classList.toggle('back');
        if(!td.classList.contains('back')|| flipTimerId){
            return;
        }
        td.classList.remove('back');
        if(firstCard===null){
            firstCard=td;
        }else{
            if(firstCard.num === td.num){
                firstCard.classList.add("fadeout");
                td.classList.add("fadeout")
                firstCard=null;
                
            }else{
                flipTimerId=setTimeout(function(){
                  firstCard.classList.add('back');
                  td.classList.add('back');
                  flipTimerId=NaN; //NaN だったらclickできる
                  firstCard=null;
                },1200);
              }
        }
    }
}
