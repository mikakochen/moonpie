<template>
    <div class="product-content">
        <test-slot>
            <template v-slot:left>新的左左左</template>
        </test-slot>

        <test-slot>
            <template v-slot:right>新的右右右</template>
        </test-slot>
    </div>
</template>

<script>
import TestSlot from './TestSlot';

    export default {
        name: 'SlotExample',
        components: {
            TestSlot
        },
        props: {
            transferData: {
                type: Object,
                default: {}
            }
        },
        mounted() {
        }

    }
</script>

<style scoped>
.product-content{
    margin-top: 10px;
    border-radius: 4px;
    min-height: 40px;
}
</style>
