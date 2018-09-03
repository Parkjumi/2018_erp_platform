<template>
<div>
    <v-card-title style="padding:0;">
          <span class="headline" style="padding:0; margin:0;">{{title}}</span>

          <v-spacer></v-spacer>

          <v-menu bottom left >
            <v-btn
              slot="activator"
              dark
              icon
              v-bind:style="{'opacity':(!options)? 0 : 1}"
            >
              <v-icon style="color:#333;">more_vert</v-icon>
            </v-btn>

            <v-list v-if="options">
              <v-list-tile
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <hr style="opacity:.35;">
</div>
</template>



<script>
export default {
    name : 'Modal',


    props: {

        'title': {
            type: String, 
            default(){ return 'Page header' }
        },

        'options': {
            type: Boolean,
            default(){ return false }
        }

    },

    data(){
        return {

            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' }
            ]


        }
    }
}
</script>