'use strict'; // エラーとかをもっと見せてくれる
document.addEventListener("DOMContentLoaded",()=>{
    const size=4;
    const difficulty =500;
    const shuffleCount = size * difficulty;
    const table = document.getElementById("table");
    const msgBox = document.getElementById("msgBox");
    const startBt = document.getElementById("startBt");
    let panels;
    let emptyIdx;

    const init=()=>{
        panels=[];
        table.textContent=null;
        msgBox.textContent=null;
        createStage();
    }

    const createStage = ()=>{
        for(let i=0;i<size;i++){
            const tr = document.createElement('tr');
            for(let j=0;j<size; j++){
                const td=document.createElement('td');
                td.posId = i*size + j; // Original Property (posId) = td要素いっぱいプロパティー持っています(table -> tr -> td <<<-- このtdです)
                td.textContent = td.posId+1;
                if(td.posId === size*size-1){
                    td.textContent="";
                    td.classList.add("empty");
                    emptyIdx=td.posId;
                }
                td.onclick=click;
                panels.push(td);
                tr.append(td);
            }
            table.append(tr);
        }
    };

    startBt.addEventListener('click',()=>{
        init();
        for(let i=0;i<shuffleCount;i++){
            const dir = Math.floor(Math.random()*4);//0上,1右,2下,3左 を選んでいる
            switch(dir){
                case 0:
                    if(emptyIdx < size) continue; //size は16 (columnに4コマがあります)
                    swap(emptyIdx -size,emptyIdx);
                    emptyIdx-=size;
                    break;
                case 1:
                    if((emptyIdx + 1)% size === 0) continue;
                    swap(emptyIdx+1,emptyIdx);
                    emptyIdx++;
                    break;
                case 2:
                    if(emptyIdx >= size*(size-1)) continue;
                    swap(emptyIdx+size,emptyIdx);
                    emptyIdx+=size;
                    break;
                case 3:
                    if(emptyIdx %size ===0) continue;
                    swap(emptyIdx-1,emptyIdx);
                    emptyIdx--;
                    break;
            }
        }
    });

    const swap = (numPos,empPos)=>{
        panels[empPos].textContent=panels[numPos].textContent;
        panels[empPos].classList.remove('empty');
        panels[numPos].textContent='';
        panels[numPos].classList.add('empty');
    };
   
    const click=(e)=>{
        const pos = e.target.posId;
        if(pos >= size && panels[pos-size].textContent === ''){
            swap(pos, pos-size); // 上と自分の場所をswapしている
        }else if((pos+1)% size !== 0 && panels[pos + 1].textContent===''){
            swap(pos,pos+1);
        }else if(pos < size *(size -1)&& panels[pos+size].textContent===''){
            swap(pos, pos +size);
        }else if(pos % size !== 0 && panels[pos-1].textContent===''){
            swap(pos,pos-1);
        }
    }
    init();
});
