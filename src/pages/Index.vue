<template>
  <q-page class=" column flex q-pa-md q-gutter-sm">
    <q-input v-model="form.Age" type="number" label="Age" :min="0" />
    <q-select v-model="form.Sex" :options="['MALE', 'FEMALE']" label="Sex" />
    <q-input v-model="form.SickDays" type="number" label="Sick Days" :min="0" hint="From the day confirmation" />
    <q-input v-model="form.RegionRes" label="Region" />
    <q-input v-model="form.ProvRes" label="Province" />
    <q-input v-model="form.CityMunRes" label="Municipality/City" />
    <q-select v-model="form.Quarantined" :options="['YES', 'NO']" label="Quarantined" />
    <q-select v-model="form.Pregnanttab" :options="['YES', 'NO']" label="Pregnant" />
    <q-select v-model="form.Admitted" :options="['YES', 'NO']" label="Admitted" />
    <q-btn @click="predict" :loading="loading" icon="psychology" label="predict" color="primary" size="xl" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      loading: false,
      form:{
        Age: 0,
        Sex: '',
        SickDays: 0,
        RegionRes: '',
        ProvRes: '',
        CityMunRes: '',
        Quarantined: '',
        Pregnanttab: '',
        Admitted: '',
      }
    }
  },
  methods: {
    async predict () {
      this.loading = true

      const dd = {
        Inputs: {
          input1: {
            ColumnNames: [
              'Age',
              'Sex',
              'Sickdays',
              'RegionRes',
              'ProvRes',
              'CityMunRes',
              'HealthStatus',
              'Quarantined',
              'Pregnanttab',
              'Admitted'
            ],
            Values: [
              [
                this.form.Age,
                this.form.Sex,
                this.form.SickDays,
                this.form.RegionRes,
                this.form.ProvRes,
                this.form.CityMunRes,
                this.form.HealthStatus,
                this.form.Quarantined,
                this.form.Pregnanttab,
                this.form.Admitted
              ]
            ]
          }
        },
        'GlobalParameters': {}
      }

      try {
        console.log(dd)
        const { data } = await this.$axios.post('http://localhost:3000/predict', dd)
        console.log(data)
        this.$q.dialog({
          title: 'Predicted Recovery Rate',
          message: `Predicted recovery rate is ${data.Results.output1.value.Values[0][10]}%`
        }).onOk(() => {
          // console.log('OK')
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      } catch (error) {
        // console.log()
        this.$q.notify({
          message: error.message,
          color: 'negative'
        })
      }
      this.loading = false
    }
  }
})
</script>
