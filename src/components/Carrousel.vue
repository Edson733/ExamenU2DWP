<template>
    <b-container fluid>
        <b-row class="d-flex justify-content-center">
            <b-col cols="12" sm="12" md="8" lg="12">
                <div>
                    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                        <div>
                            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>
                        </div>
                        <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse eros felis, tincidunt a tincidunt eget,
                                convallis vel est. Ut pellentesque ut lacus vel interdum.
                            </p>
                        </b-carousel-slide>
                    </b-carousel>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                slide: 0,
                sliding: null,
            }
        },
        methods: {
            onSlideStart(slide) {
                this.sliding = true;
            },
            onSlideEnd(slide) {
                this.sliding = false;
            },
        }
    });
</script>

<style></style>