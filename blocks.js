//wysokość i szerokość 
const BLOCK_HEIGHT = 35;
const BLOCK_WIDTH = 74;
let points = 0;

class Block {
    constructor(x, y, color, durability) {
        this.x = x;
        this.y = y;

        this.width = BLOCK_WIDTH;
        this.height = BLOCK_HEIGHT;

        this.color = color;

        this.durability = durability;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    destroy(ctx){
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

//Generowanie siatki bloku mapy oraz wytrzymałości bloków
let blockMap = [
    [1, 0, 0, 1, 1, 2]
];


//tworzenie tablicy która będzie przechowywała daną ilość kolumn z blokami
const blockGrid = [];
//w pętli dodajemy kolejno rząd -> do niego bloki i do Tablicy rząd
for(let row=0;row<blockMap.length;row++){
    const blockRow = [];
    for(let col=0;col<blockMap[0].length;col++){
        let blockX = col * (BLOCK_WIDTH + 7)+ 7;
        let blockY = row * (BLOCK_HEIGHT + 7);
        if(blockMap[row][col]!==0){              //sprawdzam czy blok istnieje na siatce
            blockRow.push(new Block(blockX, blockY, "hsl(332, 100%,"+(50-((blockMap[row][col]-1)*10))+"%)", blockMap[row][col]));
        }
    }
    blockGrid.push(blockRow);
}

let drawBlocks = () => {
    for(const blockRow of blockGrid){
        for(const block of blockRow){
            if(block.durability > 0){
                block.draw(ctx);
            }
        }
    }
}