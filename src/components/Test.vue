
<template>
    <div class="card">
        <DataTable :value="products" :rowClass="rowClass" :rowStyle="rowStyle" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.quantity }}
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (this.products = data));
});

const products = ref();

const rowClass = (data) => {
    return [{ 'bg-primary': data.category === 'Fitness' }];
};
const rowStyle = (data) => {
    if (data.quantity === 0) {
        return { fontWeight: 'bold', fontStyle: 'italic' };
    }
};
const stockClass = (data) => {
    return [
        'border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm',
        {
            'bg-red-100 text-red-900': data.quantity === 0,
            'bg-blue-100 text-blue-900': data.quantity > 0 && data.quantity < 10,
            'bg-teal-100 text-teal-900': data.quantity > 10
        }
    ];
};

</script>
