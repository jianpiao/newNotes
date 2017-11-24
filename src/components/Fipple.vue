<template>
  <div class="fipple">
      <div class="true" @mousedown="ripple" ref="t">
        <!-- 确认啦! -->
        <slot></slot>
         <span ref="span"></span>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
        return{
          
        }
    }, 
    methods:{
        ripple(){
            this.$refs.span.className = ''
            let this_ = this.$refs.t
            let height = this_.clientHeight
            let x = event.pageX
            let y = event.pageY
            console.log(x+"\\\\"+y)
            let movex = this_.offsetLeft
            let movey = this_.offsetTop
            console.log(movex+"|||"+movey+"|||"+(x - movex)+"|||"+(y - movey))
            this.$refs.span.style.display = 'block'
            this.$refs.span.style.width = (height*3) + 'px'
            this.$refs.span.style.height = (height*3) + 'px'
            this.$refs.span.style.left = parseInt(x - movex) + 'px'
            this.$refs.span.style.top = parseInt(y - movey) + 'px'
            this.$refs.span.style.marginTop = -(height*3/2) + 'px'
            this.$refs.span.style.marginLeft = -(height*3/2) + 'px'
            this.$refs.span.className = 'ripple'
            setTimeout(()=>{
                this.$refs.span.style.display = 'none'
            },300)
            
        }
    }
  }
</script>

<style scoped>
 .true{
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: white;
    outline: none;
    border: none;
    position: relative;
}

.not_ripple{
    display: none;
}

.ripple{  
        display: block;
        position: absolute;
        animation: f .3s linear;
        background-color: rgba(0, 0, 0, .2);
        opacity: 0;
        border-radius: 50%;
    }

@keyframes f {
    0%{
        opacity: .4;
        transform: scale(0);
    }
    50%{
        opacity: .25;
        transform: scale(1);
    }
    100%{
        opacity: 0;
        transform: scale(1.3);
    }
} 
</style>

