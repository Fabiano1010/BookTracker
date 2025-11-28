

export default{
    
    data() {
        return {
            canvas: querySelector("#canvas"),
            ctx: this.canvas.getContext(),
            
        }
    
    },
    methods: {
        degToRad(){

        },
        render(){
            this.ctx.strokeStyle = '#00ffff';
            this.ctx.lineWidth = 17;
            this.ctx.shadowBlur= 15;
            this.ctx.shadowColor = '#00ffff'
        }
    },


}