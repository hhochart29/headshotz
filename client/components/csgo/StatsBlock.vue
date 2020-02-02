<template>
  <div class="flex flex-col items-center w-128">
    <div class="absolute pt-18">
      <i :class="`lni-${icon} text-3xl`" />
    </div>
    <ApexCharts
      type="radialBar"
      height="350"
      width="350"
      :options="chartOptions"
      :series="series"
    />
    <div class="absolute pt-40 text-3xl">
      {{ playerStats[1] }}
    </div>
  </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts'
export default {
  components: {
    ApexCharts
  },
  props: {
    playerStats: {
      type: Array,
      require: true,
      default: null
    },
    icon: {
      type: String,
      require: true,
      default: null
    }
  },
  data: function() {
    return {
      series: [this.playerStats[2]],
      chartOptions: {
        colors: ['#2d0a5e'],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent'
            },
            dataLabels: {
              name: {
                show: true,
                color: '#ffffff',
                fontSize: '30px'
              },
              value: {
                show: false
              }
            },
            track: {
              background: '#4b344c'
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            gradientToColors: ['#c97ae3'],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [this.playerStats[0]]
      }
    }
  }
}
</script>
